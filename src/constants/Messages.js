export const PROMPT = Object.freeze({
  PURCHASE_AMOUNT: "구입금액을 입력해 주세요.\n",
});

export const OUTPUT = Object.freeze({
  PURCHASE_COUNT_SUFFIX: "개를 구매했습니다.",
});

const ERROR_PREFIX = "[ERROR]";

export const ERROR = Object.freeze({
  // 구입금액 검증 에러
  INVALID_AMOUNT_NOT_NUMBER: `${ERROR_PREFIX} 로또 구입 금액은 숫자 형식이어야 합니다.`,
  INVALID_AMOUNT_BELOW_MIN: `${ERROR_PREFIX} 로또 구입 금액은 1,000원 이상이어야 합니다.`,
  INVALID_AMOUNT_UNIT: `${ERROR_PREFIX} 로또 구입 금액은 1,000원 단위어야 합니다.`,

  // 로또 검증 에러
  INVALID_COUNT: `${ERROR_PREFIX} 로또 번호는 6개여야 합니다.`,
  INVALID_RANGE: `${ERROR_PREFIX} 로또 번호는 1부터 45 사이의 숫자여야 합니다.`,
  DUPLICATE_NUMBERS: `${ERROR_PREFIX} 로또 번호는 중복되지 않아야 합니다.`,

  // 당첨 번호 입력 에러
  WINNING_INVALID_FORMAT: `${ERROR_PREFIX} 당첨 번호는 쉼표(,)로 구분된 숫자만 허용됩니다.`,
  WINNING_INVALID_COUNT: `${ERROR_PREFIX} 당첨 번호는 6개여야 합니다.`,
  WINNING_INVALID_RANGE: `${ERROR_PREFIX} 당첨 번호는 1부터 45 사이의 숫자여야 합니다.`,
  WINNING_DUPLICATE_NUMBERS: `${ERROR_PREFIX} 당첨 번호는 중복되지 않아야 합니다.`,

  // 보너스 번호 입력 에러
  BONUS_NOT_NUMBER: `${ERROR_PREFIX} 보너스 번호는 숫자 1개만 입력해야 합니다.`,
  BONUS_RANGE: `${ERROR_PREFIX} 보너스 번호는 1부터 45 사이의 숫자여야 합니다.`,
  BONUS_DUPLICATE_WINNING: `${ERROR_PREFIX} 보너스 번호는 당첨 번호와 중복될 수 없습니다.`,
});
