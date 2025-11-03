import { isNotNumber } from "../utils/ValidatorHelper.js";
import { ERROR } from "../constants/Messages.js";
import { LOTTO } from "../constants/LottoConstants.js";

class PurchaseAmountValidator {
  static validate(purchaseAmount) {
    if (isNotNumber(purchaseAmount)) {
      throw new Error(ERROR.INVALID_AMOUNT_NOT_NUMBER);
    }

    if (purchaseAmount < LOTTO.PRICE) {
      throw new Error(ERROR.INVALID_AMOUNT_BELOW_MIN);
    }

    if (purchaseAmount % LOTTO.PRICE !== 0) {
      throw new Error(ERROR.INVALID_AMOUNT_UNIT);
    }
  }
}

export default PurchaseAmountValidator;
