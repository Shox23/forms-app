export const ROUTES = {
  STEP_ONE: "/",
  STEP_TWO: "/step-two",
  STEP_THREE: "/step-three",
} as const;

export const PHONE_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export const LOAN_LIMITS = {
  MIN_AMOUNT: 200,
  MAX_AMOUNT: 1000,
  STEP_AMOUNT: 100,
  MIN_TERM: 10,
  MAX_TERM: 30,
  STEP_TERM: 1,
} as const;
