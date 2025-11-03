import { isNotNumber, isNotLottoRange } from "../utils/ValidatorHelper.js";
import { ERROR } from "../constants/Messages.js";

class BonusNumberValidator {
  static validate(bonusNumber, winningNumbers) {
    if (isNotNumber(bonusNumber)) {
      throw new Error(ERROR.BONUS_NOT_NUMBER);
    }

    if (isNotLottoRange(bonusNumber)) {
      throw new Error(ERROR.BONUS_RANGE);
    }

    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR.BONUS_DUPLICATE_WINNING);
    }
  }
}

export default BonusNumberValidator;
