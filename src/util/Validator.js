import { LOTTO_PRICE } from "../constants/LottoConstants.js";
import { ERROR } from "../constants/Messages.js";

class Validator {
  static validatePurchaseAmount(input) {
    const amount = Number(input);

    if (Number.isNaN(amount)) {
      throw new Error(ERROR.INVALID_AMOUNT_NOT_NUMBER);
    }

    if (amount < LOTTO_PRICE) {
      throw new Error(ERROR.INVALID_AMOUNT_BELOW_MIN);
    }

    if (amount % LOTTO_PRICE !== 0) {
      throw new Error(ERROR.INVALID_AMOUNT_UNIT);
    }
  }
}

export default Validator;
