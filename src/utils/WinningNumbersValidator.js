import { ERROR } from "../constants/Messages.js";
import { LOTTO } from "../constants/LottoConstants.js";
import { parseWinningNumbers } from "./Parser.js";

class WinningNumbersValidator {
  static validate(inputString) {
    const numbers = parseWinningNumbers(inputString);

    if (numbers.length !== LOTTO.COUNT) {
      throw new Error(ERROR.WINNING_INVALID_COUNT);
    }

    const isOutOfRange = numbers.some(
      (number) => number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER
    );
    if (isOutOfRange) {
      throw new Error(ERROR.WINNING_INVALID_RANGE);
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR.WINNING_DUPLICATE_NUMBERS);
    }

    return numbers;
  }
}

export default WinningNumbersValidator;
