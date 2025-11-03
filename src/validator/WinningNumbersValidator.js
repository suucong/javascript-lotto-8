import { ERROR } from "../constants/Messages.js";
import { LOTTO } from "../constants/LottoConstants.js";
import { isDuplicateArray, isNotLottoRange } from "../utils/ValidatorHelper.js";

class WinningNumbersValidator {
  static validate(winningNumbers) {
    if (winningNumbers.length !== LOTTO.COUNT) {
      throw new Error(ERROR.WINNING_INVALID_COUNT);
    }

    if (winningNumbers.some((number) => isNotLottoRange(number))) {
      throw new Error(ERROR.WINNING_INVALID_RANGE);
    }

    if (isDuplicateArray(winningNumbers)) {
      throw new Error(ERROR.WINNING_DUPLICATE_NUMBERS);
    }
  }
}

export default WinningNumbersValidator;
