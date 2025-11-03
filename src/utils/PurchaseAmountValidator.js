import Validator from "./Validator.js";
import { LOTTO } from "../constants/LottoConstants.js";

class PurchaseAmountValidator {
  static validate(inputString) {
    const amount = Number(inputString);

    if (Validator.isNotNumberFormat(inputString)) {
      throw new Error(ERROR.INVALID_AMOUNT_NOT_NUMBER);
    }

    if (amount < LOTTO.PRICE) {
      throw new Error(ERROR.INVALID_AMOUNT_BELOW_MIN);
    }

    if (amount % LOTTO.PRICE !== 0) {
      throw new Error(ERROR.INVALID_AMOUNT_UNIT);
    }

    return amount;
  }
}

export default PurchaseAmountValidator;
