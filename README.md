# 🍀 로또 (Lotto) - 클린 아키텍처 리팩토링 (오픈 미션)

### 🏷️ 프로젝트 목표 (Open Mission Goal)

3주차 로또 미션의 요구사항을 **외부 동작의 변경 없이** 객체지향 설계 원칙에 따라 최고 수준으로 리팩토링하고, **테스트 용이성(Testability)** 을 확보하여 유지보수가 쉬운 코드를 만드는 것을 목표로 했습니다.

---

## 💡 주요 개발 집중 영역 및 리팩토링 성과

### 1. 객체지향 책임 분리 및 캡슐화 강화

| 원칙                | AS-IS (리팩토링 전)                                   | TO-BE (최종 구조)                                                                                                                         |
| :------------------ | :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **핵심 책임 (SRP)** | Controller 또는 WinningLotto가 모든 비교 로직을 담당. | **`Lotto.js`** 가 `countMatch()`, `includes()` 메서드를 통해 **스스로** 당첨 번호와의 일치 개수를 보고하도록 책임 위임. (Tell, Don't Ask) |
| **도메인 무결성**   | 보너스 번호 중복 검증을 외부(`Validator`)에서 수행.   | **`WinningLotto.js` 생성자** 내부에서 중복을 직접 검증하여 **객체의 무결성**을 보장.                                                      |

### 2. 테스트 용이성을 위한 의존성 주입 (DI) 구조 도입

MissionUtils의 `Random`과 `Console` API를 사용하는 코드의 의존성을 제거하여 테스트 시 Mocking이 용이한 구조를 구축했습니다.

- **Static 제거:** `LottoService`, `OutputView`, `InputHandler` 클래스의 모든 `static` 메서드를 인스턴스 메서드로 전환.
- **DI 적용:** `LottoController`의 `constructor`에서 필요한 의존성 객체(Service, View, Handler)를 생성하고 관리하도록 변경.
- **결과:** 테스트 환경에서 난수 생성 및 입출력(Console) 로직을 Mock 객체로 쉽게 대체 가능.

### 3. Controller의 응집도 및 가독성 극대화

Controller의 `run()` 메서드를 기능 단위로 묶어, 코드가 **"애플리케이션의 동작 순서"** 를 보여주는 **목차** 역할을 수행하도록 개선했습니다.

```javascript
async run() {
    // 1. 로또 구매 및 발행
    const { lottos, purchaseAmount } = await this.#handleLottoPurchaseAndGeneration();

    // 2. 당첨 로또 입력
    const winningLotto = await this.#handleWinningLottoInput();

    // 3. 결과 확인 및 출력
    this.#handleResultCalculationAndOutput(lottos, purchaseAmount, winningLotto);
}
```

### 4. 파일 구조 및 클린 코드 원칙 준수

#### 🌳 최종 소스 코드 구조 (src)

```
src/
├── controller/             # (C) 흐름 제어 및 Model/View 연결
│   └── LottoController.js
├── model/                  # (M) 핵심 도메인 객체 및 비즈니스 로직
│   ├── Lotto.js            # [책임: 번호 저장 및 매칭 횟수 계산]
│   ├── WinningLotto.js     # [책임: 당첨 번호 저장 및 중복 검증]
│   └── LottoResult.js      # [책임: 통계 및 수익률 계산]
├── service/
│   └── LottoService.js     # [책임: 로또 발행 (난수 생성)]
├── views/                  # (V) 입/출력 전용 (Console API 사용)
│   ├── InputView.js
│   └── OutputView.js
├── validator/              # 입력 유효성 검사 (형식, 범위, 개수 등)
│   └── BonusNumberValidator.js
│   └── PurchaseAmountValidator.js
│   └── WinningNumbersValidator.js
├── utils/                  # 재시도 로직 및 파싱
│   ├── InputHandler.js     # [책임: 에러 발생 시 재시도 루프 처리]
│   └── Parser.js
│   └── ValidatorHelper.js  # 검증 공통 메서드
└── constants/              # 매직 넘버 및 메시지 관리
```

#### 🧪 테스트 코드 구조 (tests)

```
__tests__/
├── model/                  # Lotto, WinningLotto, LottoResult 단위 테스트
├── validator/              # 각종 Validator 단위 테스트
├── service/                # LottoService 단위 테스트
└── ApplicationTest.js      # 통합 테스트 (입출력 및 재시도 흐름 검증)
```

#### 📋 클린 코드 원칙 준수

- 함수 길이 제한: 모든 함수 및 메서드의 길이가 15라인을 넘지 않도록 구현하여 가독성을 위해 노력하였습니다.

- else 지양: 모든 로직에서 if (조건) return/throw 패턴을 사용하여 else 구문을 제거하고 코드의 의도를 명확히 했습니다.

## 실행 방법

```bash
# 의존성 설치
npm install

# 프로그램 실행
npm run start
```
