import LottoResult from "../../src/model/LottoResult.js";

const mockLottoTicket = (matchCount, hasBonus) => ({
  countMatch: jest.fn().mockReturnValue(matchCount),
  includes: jest.fn().mockReturnValue(hasBonus),
});

describe("LottoResult 클래스 테스트 (통계 및 수익률 계산)", () => {
  const purchaseAmount = 8000;
  const mockWinningLotto = { getBonusNumber: jest.fn().mockReturnValue(7) };

  const purchasedLottos = [
    mockLottoTicket(6, false),
    mockLottoTicket(5, true),
    mockLottoTicket(5, false),
    mockLottoTicket(4, false),
    mockLottoTicket(3, false),
    mockLottoTicket(0, false),
    mockLottoTicket(4, false),
    mockLottoTicket(3, false),
  ];

  const expectedStats = {
    FIRST: 1,
    SECOND: 1,
    THIRD: 1,
    FOURTH: 2,
    FIFTH: 2,
    NONE: 1,
  };

  test("구매한 로또 목록에 따라 당첨 통계가 정확하게 계산되어야 한다.", () => {
    // given
    const lottoResult = new LottoResult(purchasedLottos, mockWinningLotto);

    // when
    const stats = lottoResult.calculateStats();

    // then
    expect(stats).toEqual(expectedStats);
  });

  test("정확한 통계 기반으로 수익률이 계산되어야 하며, 소수점 둘째 자리에서 반올림되어야 한다.", () => {
    // given
    const lottoResult = new LottoResult(purchasedLottos, mockWinningLotto);
    lottoResult.calculateStats();

    // when
    const profitRate = lottoResult.calculateProfitRate(purchaseAmount);

    // then
    expect(profitRate).toBe("25395125.0");
  });

  test("수익률 0%를 정확히 반환해야 한다.", () => {
    // given
    const zeroWinningsLottos = [
      mockLottoTicket(0, false),
      mockLottoTicket(0, false),
      mockLottoTicket(0, false),
      mockLottoTicket(0, false),
      mockLottoTicket(0, false),
      mockLottoTicket(0, false),
      mockLottoTicket(0, false),
      mockLottoTicket(0, false),
    ];
    const zeroResult = new LottoResult(zeroWinningsLottos, mockWinningLotto);
    zeroResult.calculateStats();

    // when
    const profitRate = zeroResult.calculateProfitRate(purchaseAmount);

    // then
    expect(profitRate).toBe("0.0");
  });
});
