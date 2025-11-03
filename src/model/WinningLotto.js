class WinningLotto {
  #numbers;
  #bonusNumber;

  constructor(numbers, bonusNumber) {
    this.#numbers = numbers;
    this.#bonusNumber = bonusNumber;
  }

  compare(lotto) {
    const purchasedNumbers = lotto.getNumbers();
    let matchCount = 0;

    purchasedNumbers.forEach((number) => {
      if (this.#numbers.includes(number)) {
        matchCount += 1;
      }
    });

    const hasBonus = purchasedNumbers.includes(this.#bonusNumber);

    return { matchCount, hasBonus };
  }
}

export default WinningLotto;
