export const PROMPT = Object.freeze({
  PURCHASE_AMOUNT: "구입금액을 입력해 주세요.\n",
});

const ERROR_PREFIX = "[ERROR]";

export const ERROR = Object.freeze({
  // 구입금액 검증 에러
  INVALID_AMOUNT_NOT_NUMBER: `${ERROR_PREFIX} 로또 구입 금액은 숫자 형식이어야 합니다.`,
  INVALID_AMOUNT_BELOW_MIN: `${ERROR_PREFIX} 로또 구입 금액은 1,000원 이상이어야 합니다.`,
  INVALID_AMOUNT_UNIT: `${ERROR_PREFIX} 로또 구입 금액은 1,000원 단위어야 합니다.`,
});
