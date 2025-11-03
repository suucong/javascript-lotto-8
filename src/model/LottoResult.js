import { WINNING_AMOUNTS } from "../constants/LottoConstants.js";
import { RANK_ORDER } from "../constants/Messages.js";

class LottoResult {
  #lottos;
  #winningLotto;
  #stats = { FIRST: 0, SECOND: 0, THIRD: 0, FOURTH: 0, FIFTH: 0, NONE: 0 };

  constructor(lottos, winningLotto) {
    this.#lottos = lottos;
    this.#winningLotto = winningLotto;
  }

  #determineRank({ matchCount, hasBonus }) {
    const rank = RANK_ORDER.find(
      (r) => r.match === matchCount && r.hasBonus === hasBonus
    );

    if (rank) return rank.key;

    return "NONE";
  }

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
