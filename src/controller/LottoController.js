import LottoService from "../service/LottoService.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";
import InputHandler from "../utils/InputHandler.js";
import Validator from "../utils/Validator.js";

class LottoController {
  async run() {
    let purchaseAmount = await this.#readPurchaseAmountWithRetry();
    this.#generateAndPrintLottos(purchaseAmount);
    let winningNumbers = await this.#readWinningNumbersWithRetry();
  }

  async #readPurchaseAmountWithRetry() {
    return InputHandler.readWithRetry(
      InputView.readPurchaseAmount,
      Validator.validatePurchaseAmount
    );
  }

  async #readWinningNumbersWithRetry() {
    return InputHandler.readWithRetry(
      InputView.readWinningNumbers,
      Validator.validateWinningNumbers
    );
  }

  #generateAndPrintLottos(purchaseAmount) {
    const lottos = LottoService.generateLottos(purchaseAmount);

    OutputView.printLottos(lottos);
  }
}

export default LottoController;
