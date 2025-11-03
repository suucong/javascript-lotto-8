import { Console } from "@woowacourse/mission-utils";
import { PROMPT } from "../constants/Messages.js";

class InputView {
  static async readPurchaseAmount() {
    const input = await Console.readLineAsync(PROMPT.PURCHASE_AMOUNT);
    return input;
  }

  static async readWinningNumbers() {
    const input = await Console.readLineAsync(PROMPT.WINNING_NUMBERS);
    return input;
  }

  static async readBonusNumber() {
    const input = await Console.readLineAsync(PROMPT.BONUS_NUMBER);
    return input;
  }
}

export default InputView;
