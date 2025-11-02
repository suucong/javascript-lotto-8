import { LOTTO } from "../constants/LottoConstants.js";
import { ERROR } from "../constants/Messages.js";

class Validator {
  static validatePurchaseAmount(input) {
    const amount = Number(input);

    if (Number.isNaN(amount)) {
      throw new Error(ERROR.INVALID_AMOUNT_NOT_NUMBER);
    }

    if (amount < LOTTO.PRICE) {
      throw new Error(ERROR.INVALID_AMOUNT_BELOW_MIN);
    }

    if (amount % LOTTO.PRICE !== 0) {
      throw new Error(ERROR.INVALID_AMOUNT_UNIT);
    }
  }
}

export default Validator;
