import { WINNING_AMOUNTS } from "../constants/LottoConstants.js";

class LottoResult {
  #lottos;
  #winningLotto;
  #stats = { FIRST: 0, SECOND: 0, THIRD: 0, FOURTH: 0, FIFTH: 0, NONE: 0 };

  constructor(lottos, winningLotto) {
    this.#lottos = lottos;
    this.#winningLotto = winningLotto;
  }

  // 일치 결과에 따른 등수 키를 결정
  #determineRank({ matchCount, hasBonus }) {
    if (matchCount === 6) return "FIRST";
    if (matchCount === 5) {
      if (hasBonus) return "SECOND";
      return "THIRD";
    }
    if (matchCount === 4) return "FOURTH";
    if (matchCount === 3) return "FIFTH";
    return "NONE";
  }

  // 전체 로또 순회하며 결과 집계
  calculateStats() {
    this.#lottos.forEach((lotto) => {
      const result = this.#winningLotto.compare(lotto);
      const rankKey = this.#determineRank(result);
      this.#stats[rankKey] += 1;
    });

    return this.#stats;
  }

  calculateProfitRate(purchaseAmount) {
    let totalWinnings = 0;

    for (const rankKey in this.#stats) {
      const count = this.#stats[rankKey];
      const prize = WINNING_AMOUNTS[rankKey];

      if (prize && count > 0) {
        totalWinnings += prize * count;
      }
    }

    const rate = (totalWinnings / purchaseAmount) * 100;

    return (Math.round(rate * 10) / 10).toFixed(1);
  }
}

export default LottoResult;
