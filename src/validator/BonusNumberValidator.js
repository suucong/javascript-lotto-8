import { isNotNumber, isNotLottoRange } from "../utils/ValidatorHelper.js";
import { ERROR } from "../constants/Messages.js";

class BonusNumberValidator {
  static validate(bonusNumber) {
    if (isNotNumber(bonusNumber)) {
      throw new Error(ERROR.BONUS_NOT_NUMBER);
    }

    if (isNotLottoRange(bonusNumber)) {
      throw new Error(ERROR.BONUS_RANGE);
    }
  }
}

export default BonusNumberValidator;
