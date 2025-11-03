import { LOTTO } from "../constants/LottoConstants.js";
import { ERROR } from "../constants/Messages.js";
import { parseWinningNumbers } from "./Parser.js";

class Validator {
  static validateBonusNumber(input, winningNumbers) {
    const bonusNumber = Number(input);

    if (Validator.isNotNumberFormat(input)) {
      throw new Error(ERROR.BONUS_NOT_NUMBER);
    }

    if (bonusNumber < LOTTO.MIN_NUMBER || bonusNumber > LOTTO.MAX_NUMBER) {
      throw new Error(ERROR.BONUS_RANGE);
    }

    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR.BONUS_DUPLICATE_WINNING);
    }

    return bonusNumber;
  }

  static isNotNumberFormat(inputString) {
    return Number.isNaN(inputString.trim());
  }

  static isNotLottoRange(inputString) {
    return bonusNumber < LOTTO.MIN_NUMBER || bonusNumber > LOTTO.MAX_NUMBER;
  }
}

export default Validator;
