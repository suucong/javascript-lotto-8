import WinningLotto from "../../src/model/WinningLotto.js";
import { ERROR } from "../../src/constants/Messages.js";

describe("WinningLotto 클래스 테스트", () => {
  const validWinningNumbers = [1, 2, 3, 4, 5, 6];

  test("보너스 번호가 당첨 번호와 중복될 경우 예외가 발생한다.", () => {
    // given
    const duplicateBonusNumber = 6;

    // then
    expect(() => {
      new WinningLotto(validWinningNumbers, duplicateBonusNumber);
    }).toThrow(ERROR.BONUS_DUPLICATE_WINNING);
  });

  test("보너스 번호가 당첨 번호와 중복되지 않을 경우, 정상적으로 생성된다.", () => {
    // given
    const validBonusNumber = 7;

    // then
    expect(() => {
      new WinningLotto(validWinningNumbers, validBonusNumber);
    }).not.toThrow();
  });
});
