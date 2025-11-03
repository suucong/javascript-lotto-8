import LottoService from "../service/LottoService.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import InputHandler from "../utils/InputHandler.js";
import Validator from "../utils/Validator.js";
import PurchaseAmountValidator from "../utils/PurchaseAmountValidator.js";
import WinningNumbersValidator from "../utils/WinningNumbersValidator.js";

class LottoController {
  async run() {
    let purchaseAmount = await this.#readPurchaseAmountWithRetry();
    this.#generateAndPrintLottos(purchaseAmount);
    let winningNumbers = await this.#readWinningNumbersWithRetry();
    let bonusNumber = await this.#readBonusNumberWithRetry(winningNumbers);
  }

  async #readPurchaseAmountWithRetry() {
    return InputHandler.readWithRetry(
      InputView.readPurchaseAmount,
      PurchaseAmountValidator.validate
    );
  }

  async #readWinningNumbersWithRetry() {
    return InputHandler.readWithRetry(
      InputView.readWinningNumbers,
      WinningNumbersValidator.validate
    );
  }

  async #readBonusNumberWithRetry(winningNumbers) {
    const validateJob = (inputString) => {
      return Validator.validateBonusNumber(inputString, winningNumbers);
    };

    return InputHandler.readWithRetry(InputView.readBonusNumber, validateJob);
  }

  #generateAndPrintLottos(purchaseAmount) {
    const lottos = LottoService.generateLottos(purchaseAmount);

    OutputView.printLottos(lottos);
  }
}

export default LottoController;
