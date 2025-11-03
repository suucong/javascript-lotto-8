import LottoService from "../service/LottoService.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import InputHandler from "../utils/InputHandler.js";
import PurchaseAmountValidator from "../validator/PurchaseAmountValidator.js";
import WinningNumbersValidator from "../validator/WinningNumbersValidator.js";
import BonusNumberValidator from "../validator/BonusNumberValidator.js";
import { parseWinningNumbers } from "../utils/Parser.js";

class LottoController {
  async run() {
    let purchaseAmount = await this.#readPurchaseAmountWithRetry();
    this.#generateAndPrintLottos(purchaseAmount);

    let winningNumbers = await this.#readWinningNumbersWithRetry();

    let bonusNumber = await this.#readBonusNumberWithRetry(winningNumbers);
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
}

export default LottoController;
