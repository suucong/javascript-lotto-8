import { LOTTO } from "../constants/LottoConstants.js";

class Validator {
  static isNotNumberFormat(inputString) {
    return Number.isNaN(inputString.trim());
  }

  static isNotLottoRange(bonusNumber) {
    return bonusNumber < LOTTO.MIN_NUMBER || bonusNumber > LOTTO.MAX_NUMBER;
  }
}

export default Validator;
