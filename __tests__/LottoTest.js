import Lotto from "../src/model/Lotto.js";
import { ERROR } from "../src/constants/Messages.js";

describe("로또 클래스 테스트", () => {
  test("로또 번호의 개수가 6개가 넘어가면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow(ERROR.INVALID_COUNT);
  });

  test("로또 번호에 중복된 숫자가 있으면 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow(ERROR.DUPLICATE_NUMBERS);
  });

  test("로또 번호의 범위가 1~45가 아닌 경우 예외가 발생한다.", () => {
    expect(() => {
      new Lotto([1, 78, 7, 8, 9, 10]);
    }).toThrow(ERROR.INVALID_RANGE);
  });
});
