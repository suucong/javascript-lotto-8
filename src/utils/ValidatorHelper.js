import { LOTTO } from "../constants/LottoConstants.js";

export const isNotNumber = (purchaseAmount) => {
  return Number.isNaN(purchaseAmount);
};

export const isNotLottoRange = (number) => {
  return number < LOTTO.MIN_NUMBER || number > LOTTO.MAX_NUMBER;
};

export const isDuplicateArray = (numbers) => {
  return new Set(numbers).size !== numbers.length;
};
