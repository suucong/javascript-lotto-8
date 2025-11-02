import { ERROR } from "../constants/Messages.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR.INVALID_COUNT);
    }

    if (new Set(numbers).size !== 6) {
      throw new Error(ERROR.DUPLICATE_NUMBERS);
    }

    const isValidRange = numbers.every((number) => number >= 1 && number <= 45);
    if (!isValidRange) {
      throw new Error(ERROR.INVALID_RANGE);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
