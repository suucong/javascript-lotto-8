import { ERROR } from "../constants/Messages.js";
import { LOTTO } from "../constants/LottoConstants.js";
import { parseWinningNumbers } from "../utils/Parser.js";
import { isDuplicateArray, isNotLottoRange } from "../utils/ValidatorHelper.js";

class WinningNumbersValidator {
  static validate(inputString) {
    const numbers = parseWinningNumbers(inputString);

    if (numbers.length !== LOTTO.COUNT) {
      throw new Error(ERROR.WINNING_INVALID_COUNT);
    }

    if (numbers.some((number) => isNotLottoRange(number))) {
      throw new Error(ERROR.WINNING_INVALID_RANGE);
    }

    if (isDuplicateArray(numbers)) {
      throw new Error(ERROR.WINNING_DUPLICATE_NUMBERS);
    }

    return numbers;
  }
}

export default WinningNumbersValidator;
