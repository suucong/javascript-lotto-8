import Lotto from "../../src/model/Lotto.js";
import { ERROR } from "../../src/constants/Messages.js";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow(ERROR.INVALID_COUNT);
  });

  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(ERROR.DUPLICATE_NUMBERS);
  });

  test("로또 번호의 범위가 1~45가 아닌 경우 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 78, 7, 8, 9, 10]);
    }).toThrow(ERROR.INVALID_RANGE);
  });

  describe("로또 번호 일치 개수 확인 테스트 (countMatch)", () => {
    const winningLottoNumbers = [1, 2, 3, 4, 5, 6];
    const winningLotto = new Lotto(winningLottoNumbers);

    test("로또 번호 6개 모두 일치 시, 6을 반환한다.", () => {
      const purchasedLotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(purchasedLotto.countMatch(winningLotto)).toBe(6);
    });

    test("로또 번호 3개만 일치 시, 3을 반환한다.", () => {
      const purchasedLotto = new Lotto([1, 2, 3, 10, 11, 12]);
      expect(purchasedLotto.countMatch(winningLotto)).toBe(3);
    });

    test("로또 번호가 0개 일치 시, 0을 반환한다.", () => {
      const purchasedLotto = new Lotto([40, 41, 42, 43, 44, 45]);
      expect(purchasedLotto.countMatch(winningLotto)).toBe(0);
    });
  });

  describe("로또 번호 포함 여부 확인 테스트 (includes)", () => {
    const lotto = new Lotto([10, 20, 30, 40, 41, 42]);

    test("로또 번호에 해당 숫자가 포함되어 있으면 true를 반환한다. (보너스 번호 확인)", () => {
      expect(lotto.includes(20)).toBe(true);
    });

    test("로또 번호에 해당 숫자가 포함되어 있지 않으면 false를 반환한다.", () => {
      expect(lotto.includes(5)).toBe(false);
    });
  });
});
