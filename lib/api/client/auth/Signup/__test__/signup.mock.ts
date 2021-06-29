import { GeneralResponse } from "lib/types/habit.types";

/**
 * A mock of the payload returned by
 *
 *   POST /auth/signup
 */
const MOCK_SIGNUP_RESPONSE: GeneralResponse = {
  message: "created user",
};

export { MOCK_SIGNUP_RESPONSE };
