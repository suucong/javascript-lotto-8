import { ERROR } from "../../src/constants/Messages.js";
import PurchaseAmountValidator from "../../src/validator/PurchaseAmountValidator.js";

describe("PurchaseAmountValidator 클래스 테스트", () => {
  test("로또 구입 금액이 숫자가 아닐 경우 예외가 발생한다.", () => {
    expect(() => {
      PurchaseAmountValidator.validate(Number("1000won"));
    }).toThrow(ERROR.INVALID_AMOUNT_NOT_NUMBER);
  });

  test("로또 구입 금액이 1,000원 미만일 경우 예외가 발생한다.", () => {
    expect(() => {
      PurchaseAmountValidator.validate(999);
    }).toThrow(ERROR.INVALID_AMOUNT_BELOW_MIN);
  });

  test("로또 구입 금액이 1,000원 단위가 아닐 경우 예외가 발생한다.", () => {
    expect(() => {
      PurchaseAmountValidator.validate(1300);
    }).toThrow(ERROR.INVALID_AMOUNT_UNIT);
  });
});
