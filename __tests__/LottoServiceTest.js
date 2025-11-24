import LottoService from "../src/service/LottoService.js";
import { LOTTO } from "../src/constants/LottoConstants.js";
import Lotto from "../src/model/Lotto.js";

describe("LottoService 로또 발행 기능 테스트", () => {
  let lottoService;

  beforeEach(() => {
    lottoService = new LottoService();
    jest.restoreAllMocks();
  });

  test("구매 금액에 따라 올바른 개수의 로또가 생성된다.", () => {
    // given
    const purchaseAmount = 8000;
    const expectedCount = purchaseAmount / LOTTO.PRICE;

    // when
    const lottos = lottoService.generateLottos(purchaseAmount);

    // then
    expect(lottos).toHaveLength(expectedCount);
    expect(lottos[0]).toBeInstanceOf(Lotto);
  });
});
