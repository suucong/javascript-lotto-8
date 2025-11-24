import { Console } from "@woowacourse/mission-utils";
import { WINNING_AMOUNTS } from "../constants/LottoConstants.js";
import { OUTPUT, RANK_ORDER } from "../constants/Messages.js";
import LottoResult from "../model/LottoResult.js";

class OutputView {
  printError(message) {
    Console.print(message);
  }

  printLottos(lottos) {
    const count = lottos.length;
    Console.print(`\n${count}${OUTPUT.PURCHASE_COUNT_SUFFIX}`);

    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(", ")}]`);
    });
  }

  printResults(stats, profitRate) {
    Console.print(OUTPUT.STATS_HEADER);

    RANK_ORDER.forEach((rankInfo) => {
      const matchCount = rankInfo.match;

      const rankKey = rankInfo.key;
      const prize = WINNING_AMOUNTS[rankKey];
      const count = stats[rankKey];
      const hasBonus = rankInfo.hasBonus;

      Console.print(OUTPUT.RANK_FORMAT(matchCount, prize, count, hasBonus));
    });

    Console.print(OUTPUT.PROFIT_RATE(profitRate));
  }
}

export default OutputView;
