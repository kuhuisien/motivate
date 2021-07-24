import * as TITLES from "./titles";
import { AppPaths } from "./path.types";

const AUTH_PATH = "/auth";
const HABIT_PATH = "/habit";
const REWARDS_PATH = "/reward";

export const PATHS: AppPaths = {
  HOME: {
    path: "/",
    displayName: null,
    allowGoBackInHistory: false,
  },
  HABIT: {
    path: HABIT_PATH,
    displayName: TITLES.HABITS,
    allowGoBackInHistory: false,
  },
  HABIT_CREATE: {
    path: `${HABIT_PATH}/create`,
    displayName: TITLES.HABITS,
    allowGoBackInHistory: true,
  },
  HABIT_EDIT: {
    path: `${HABIT_PATH}/edit`,
    displayName: TITLES.HABITS,
    allowGoBackInHistory: true,
  },
  REWARDS: {
    path: REWARDS_PATH,
    displayName: TITLES.REWARDS,
    allowGoBackInHistory: false,
  },
  SIGNUP: {
    path: `${AUTH_PATH}/signup`,
    displayName: null,
    allowGoBackInHistory: false,
  },
  LOGIN: {
    path: `${AUTH_PATH}/login`,
    displayName: null,
    allowGoBackInHistory: false,
  },
};
