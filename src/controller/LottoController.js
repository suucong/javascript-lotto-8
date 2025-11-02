import Validator from "../util/Validator.js";
import InputView from "../views/InputView.js";
import OutputView from "../views/OutputView.js";

class LottoController {
  async run() {
    let purchaseAmount = await this.#readPurchaseAmountWithRetry();
  }

  async #readPurchaseAmountWithRetry() {
    while (true) {
      try {
        const inputString = await InputView.readPurchaseAmount();
        Validator.validatePurchaseAmount(inputString);

        return Number(inputString);
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }
}

export default LottoController;
