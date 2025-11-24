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
    let lottos = this.#generateLottos(purchaseAmount);
    this.#printLottos(lottos);
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
  #generateLottos(purchaseAmount) {
    return LottoService.generateLottos(purchaseAmount);
  }

  #printLottos(lottos) {
    OutputView.printLottos(lottos);
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

  // 당첨 결과 확인 및 출력
  #calculateAndPrintResults(
    lottos,
    winningNumbers,
    bonusNumber,
    purchaseAmount
  ) {
    const winningLotto = new WinningLotto(winningNumbers, bonusNumber);

    const lottoResult = new LottoResult(lottos, winningLotto);
    const stats = lottoResult.calculateStats();

    const profitRate = lottoResult.calculateProfitRate(purchaseAmount);
    OutputView.printResults(stats, profitRate);
  }
}

export default LottoController;
