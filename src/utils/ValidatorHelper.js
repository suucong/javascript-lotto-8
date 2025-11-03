import { LOTTO } from "../constants/LottoConstants.js";

export const isNotNumberFormat = (inputString) => {
  return Number.isNaN(inputString.trim());
};

export const isNotLottoRange = (number) => {
  return number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER;
};

export const isDuplicateArray = (numbers) => {
  return new Set(numbers).size !== numbers.length;
};
