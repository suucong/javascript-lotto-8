import { Random } from "@woowacourse/mission-utils";
import Lotto from "../model/Lotto.js";
import { LOTTO } from "../constants/LottoConstants.js";

class LottoService {
  constructor() {}

  generateLottos(purchaseAmount) {
    const count = this.#calculateLottoCount(purchaseAmount);
    const lottos = [];

    for (let i = 0; i < count; i++) {
      const numbers = this.#generateRandomLottoNumbers();
      lottos.push(new Lotto(numbers));
    }

    return lottos;
  }

  #calculateLottoCount(purchaseAmount) {
    return purchaseAmount / LOTTO.PRICE;
  }

  #generateRandomLottoNumbers() {
    const numbers = Random.pickUniqueNumbersInRange(
      LOTTO.MIN_NUMBER,
      LOTTO.MAX_NUMBER,
      LOTTO.COUNT
    );

    return numbers.sort((a, b) => a - b);
  }
}

export default LottoService;
