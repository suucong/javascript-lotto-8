import { ERROR } from "../constants/Messages";

class WinningLotto {
  #numbers;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    this.#validate(numbers, bonusNumber);
    this.#numbers = numbers;
    this.#bonusNumber = bonusNumber;
  }

  #validate(numbers, bonusNumber) {
    if (numbers.includes(bonusNumber)) {
      throw new Error(ERROR.BONUS_DUPLICATE_WINNING);
    }
  }

  getNumbers() {
    return this.#numbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinningLotto;
