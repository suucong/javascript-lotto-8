import { ERROR } from "../constants/Messages.js";

export const parseWinningNumbers = (inputString) => {
  const rawNumbers = inputString.split(",");

  const numbers = rawNumbers.map((numberString) => {
    const trimmed = numberString.trim();

    if (trimmed === "" || Number.isNaN(trimmed)) {
      throw new Error(ERROR.WINNING_INVALID_FORMAT);
    }

    return Number(trimmed);
  });

  return numbers;
};
