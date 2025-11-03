import LottoService from "../service/LottoService.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import InputHandler from "../utils/InputHandler.js";
import PurchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import WinningNumbersValidator from "../validator/WinningNumbersValidator.js";
import BonusNumberValidator from "../validator/BonusNumberValidator.js";
import { parseWinningNumbers } from "../utils/Parser.js";
import WinningLotto from "../model/WinningLotto.js";
import LottoResult from "../model/LottoResult.js";

class LottoController {
  async run() {
    let purchaseAmount = await this.#readPurchaseAmountWithRetry();
    let lottos = this.#generateAndPrintLottos(purchaseAmount);
    let winningNumbers = await this.#readWinningNumbersWithRetry();
    let bonusNumber = await this.#readBonusNumberWithRetry(winningNumbers);

    this.#calculateAndPrintResults(
      lottos,
      winningNumbers,
      bonusNumber,
      purchaseAmount
    );
  }

  // 구매 금액 입력 받기
  async #readPurchaseAmountWithRetry() {
    return InputHandler.readWithRetry(
      InputView.readPurchaseAmount,
      (inputString) => this.#getPurchaseAmount(inputString)
    );
  }

  #getPurchaseAmount(inputString) {
    const purchaseAmount = Number(inputString.trim());
    PurchaseAmountValidator.validate(purchaseAmount);

    return purchaseAmount;
  }

  // 입력 받은 구매 금액만큼 로또 발행
  #generateAndPrintLottos(purchaseAmount) {
    const lottos = LottoService.generateLottos(purchaseAmount);

    OutputView.printLottos(lottos);
    return lottos;
  }

  // 당첨 번호 입력 받기
  async #readWinningNumbersWithRetry() {
    return InputHandler.readWithRetry(
      InputView.readWinningNumbers,
      (inputString) => this.#getWinningNumbers(inputString)
    );
  }

  #getWinningNumbers(inputString) {
    const winningNumbers = parseWinningNumbers(inputString);
    WinningNumbersValidator.validate(winningNumbers);

    return winningNumbers;
  }

  // 보너스 번호 입력 받기
  async #readBonusNumberWithRetry(winningNumbers) {
    return InputHandler.readWithRetry(
      InputView.readBonusNumber,
      (inputString) => this.#getBonusNumber(inputString, winningNumbers)
    );
  }

  #getBonusNumber(inputString, winningNumbers) {
    const bonusNumber = Number(inputString.trim());
    BonusNumberValidator.validate(bonusNumber, winningNumbers);

    return bonusNumber;
  }

  #calculateAndPrintResults(
    lottos,
    winningNumbers,
    bonusNumber,
    purchaseAmount
  ) {
    // 1. WinningLotto 객체 생성 (당첨 기준)
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

    // 2. LottoResult 객체 생성 및 통계 계산
    const lottoResult = new LottoResult(lottos, winningLotto);
    const stats = lottoResult.calculateStats(); // 등수별 개수 집계

    // 3. OutputView를 통해 최종 결과 출력
    const profitRate = lottoResult.calculateProfitRate(purchaseAmount); // 수익률 계산
    OutputView.printResults(stats, profitRate);
  }
}

export default LottoController;
