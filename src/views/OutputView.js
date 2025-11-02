import { Console } from "@woowacourse/mission-utils";
import { OUTPUT } from "../constants/Messages.js";

class OutputView {
  static printError(message) {
    Console.print(message);
  }

  static printLottos(lottos) {
    const count = lottos.length;
    Console.print(`\n${count}${OUTPUT.PURCHASE_COUNT_SUFFIX}`);

    lottos.forEach((lotto) => {
      Console.print(`[${lotto.getNumbers().join(", ")}]`);
    });
  }
}

export default OutputView;
