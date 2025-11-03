import { LOTTO } from "../constants/LottoConstants.js";
import { ERROR } from "../constants/Messages.js";
import { parseWinningNumbers } from "./Parser.js";

class Validator {
  static validatePurchaseAmount(input) {
    const amount = Number(input);

    if (Number.isNaN(amount)) {
      throw new Error(ERROR.INVALID_AMOUNT_NOT_NUMBER);
    }

    if (amount < LOTTO.PRICE) {
      throw new Error(ERROR.INVALID_AMOUNT_BELOW_MIN);
    }

    if (amount % LOTTO.PRICE !== 0) {
      throw new Error(ERROR.INVALID_AMOUNT_UNIT);
    }

    return amount;
  }

  static validateWinningNumbers(input) {
    const numbers = parseWinningNumbers(input);

    if (numbers.length !== LOTTO.COUNT) {
      throw new Error(ERROR.WINNING_INVALID_COUNT);
    }

    const isOutOfRange = numbers.some(
      (number) => number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER
    );
    if (isOutOfRange) {
      throw new Error(ERROR.WINNING_INVALID_RANGE);
    }

    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== numbers.length) {
      throw new Error(ERROR.WINNING_DUPLICATE_NUMBERS);
    }

    return numbers;
  }

  static validateBonusNumber(input, winningNumbers) {
    const bonusNumber = Number(input);

    if (input.trim() === "" || Number.isNaN(bonusNumber)) {
      throw new Error(ERROR.BONUS_NOT_NUMBER);
    }

    if (bonusNumber < LOTTO.MIN_NUMBER || bonusNumber > LOTTO.MAX_NUMBER) {
      throw new Error(ERROR.BONUS_RANGE);
    }

    if (winningNumbers.includes(bonusNumber)) {
      throw new Error(ERROR.BONUS_DUPLICATE_WINNING);
    }

    return bonusNumber;
  }
}

export default Validator;
