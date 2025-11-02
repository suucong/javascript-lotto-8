import { Console } from "@woowacourse/mission-utils";
import { PROMPT } from "../constants/Messages.js";

class InputView {
  static async readPurchaseAmount() {
    const input = await Console.readLineAsync(PROMPT.PURCHASE_AMOUNT);
    return input;
  }
}

export default InputView;
