import { LOTTO } from "../constants/LottoConstants.js";
import { ERROR } from "../constants/Messages.js";

export const parseWinningNumbers = (inputString) => {
  const rawNumbers = inputString.trim().split(LOTTO.DELIMITER);

  const numbers = rawNumbers.map((numberString) => {
    const trimmed = numberString.trim();

    if (trimmed === "" || Number.isNaN(trimmed)) {
      throw new Error(ERROR.WINNING_INVALID_FORMAT);
    }

    return Number(trimmed);
  });

  return numbers;
};
