import { ERROR } from "../../src/constants/Messages.js";
import WinningNumbersValidator from "../../src/validator/WinningNumbersValidator.js";

describe("WinningNumbersValidator 클래스 테스트", () => {
  test("당첨 번호가 6개가 아닐 경우 예외가 발생한다.", () => {
    expect(() => {
      WinningNumbersValidator.validate([1, 2, 3, 4, 5]);
    }).toThrow(ERROR.WINNING_INVALID_COUNT);
  });

  test("당첨 번호가 1부터 45 사이가 아닐 경우 예외가 발생한다.", () => {
    expect(() => {
      WinningNumbersValidator.validate([1, 2, 3, 4, 5, 46]);
    }).toThrow(ERROR.WINNING_INVALID_RANGE);
  });

  test("당첨 번호가 중복될 경우 예외가 발생한다.", () => {
    expect(() => {
      WinningNumbersValidator.validate([1, 2, 3, 3, 4, 5]);
    }).toThrow(ERROR.WINNING_DUPLICATE_NUMBERS);
  });
});
