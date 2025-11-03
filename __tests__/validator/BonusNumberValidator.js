import { ERROR } from "../../src/constants/Messages.js";
import BonusNumberValidator from "../../src/validator/BonusNumberValidator.js";

describe("BonusNumberValidator 클래스 테스트", () => {
  test("보너스 번호가 한 개의 숫자가 아닐 경우 예외가 발생한다.", () => {
    expect(() => {
      BonusNumberValidator.validate(Number("1,234"), [1, 2, 3, 4, 5, 6]);
    }).toThrow(ERROR.BONUS_NOT_NUMBER);
  });

  test("보너스 번호가 1부터 45 사이가 아닐 경우 예외가 발생한다.", () => {
    expect(() => {
      BonusNumberValidator.validate(46, [1, 2, 3, 4, 5, 6]);
    }).toThrow(ERROR.BONUS_RANGE);
  });

  test("보너스 번호가 당첨 번호와 중복될 경우 예외가 발생한다.", () => {
    expect(() => {
      BonusNumberValidator.validate(1, [1, 2, 3, 3, 4, 5]);
    }).toThrow(ERROR.BONUS_DUPLICATE_WINNING);
  });
});
