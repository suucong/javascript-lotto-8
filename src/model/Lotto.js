import { LOTTO } from "../constants/LottoConstants.js";
import { ERROR } from "../constants/Messages.js";
import { isDuplicateArray, isNotLottoRange } from "../utils/ValidatorHelper.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== LOTTO.COUNT) {
      throw new Error(ERROR.INVALID_COUNT);
    }

    if (isDuplicateArray(numbers)) {
      throw new Error(ERROR.DUPLICATE_NUMBERS);
    }

    if (numbers.some((number) => isNotLottoRange(number))) {
      throw new Error(ERROR.INVALID_RANGE);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
