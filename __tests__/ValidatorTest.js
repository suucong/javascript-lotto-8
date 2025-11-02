import Validator from "../src/util/Validator.js";
import { ERROR } from "../src/constants/Messages.js";

describe("Validator 클래스 금액 유효성 검증 테스트", () => {
  test("숫자 형식이 아닌 경우 예외가 발생한다.", () => {
    expect(() => {
      Validator.validatePurchaseAmount("1000won");
    }).toThrow(ERROR.INVALID_AMOUNT_NOT_NUMBER);
  });

  test("빈 문자열을 입력하면 예외가 발생한다.", () => {
    expect(() => {
      Validator.validatePurchaseAmount("");
    }).toThrow(ERROR.INVALID_AMOUNT_BELOW_MIN);
  });

  test("1,000원 미만의 금액을 입력하면 예외가 발생한다.", () => {
    expect(() => {
      Validator.validatePurchaseAmount("999");
    }).toThrow(ERROR.INVALID_AMOUNT_BELOW_MIN);
  });

  test("1,000원 단위가 아닌 경우 예외가 발생한다.", () => {
    expect(() => {
      Validator.validatePurchaseAmount("1500");
    }).toThrow(ERROR.INVALID_AMOUNT_UNIT);
  });
});
