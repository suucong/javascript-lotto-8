class WinningLotto {
  #numbers;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    this.#numbers = numbers;
    this.#bonusNumber = bonusNumber;
  }

  getNumbers() {
    return this.#numbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinningLotto;
