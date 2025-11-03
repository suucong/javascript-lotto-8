import Validator from "./Validator.js";
import { ERROR } from "../constants/Messages.js";

class BonusNumberValidator {
  static validate(inputString, winningNumbers) {
    const bonusNumber = Number(inputString);

    if (Validator.isNotNumberFormat(inputString)) {
      throw new Error(ERROR.BONUS_NOT_NUMBER);
    }

    if (Validator.isNotLottoRange(bonusNumber)) {
      throw new Error(ERROR.BONUS_RANGE);
    }

    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR.BONUS_DUPLICATE_WINNING);
    }

    return bonusNumber;
  }
}

export default BonusNumberValidator;
