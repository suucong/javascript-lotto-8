import {
  isNotNumberFormat,
  isNotLottoRange,
} from "../utils/ValidatorHelper.js";
import { ERROR } from "../constants/Messages.js";

class BonusNumberValidator {
  static validate(inputString, winningNumbers) {
    const bonusNumber = Number(inputString);

    if (isNotNumberFormat(inputString)) {
      throw new Error(ERROR.BONUS_NOT_NUMBER);
    }

    if (isNotLottoRange(bonusNumber)) {
      throw new Error(ERROR.BONUS_RANGE);
    }

    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR.BONUS_DUPLICATE_WINNING);
    }

    return bonusNumber;
  }
}

export default BonusNumberValidator;
