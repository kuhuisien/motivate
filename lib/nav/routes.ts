import * as TITLES from "./titles";
import { AppPaths } from "./path.types";

const AUTH_PATH = "/auth";
const HABIT_PATH = "/habit";
const DAILIES_PATH = "/dailies";
const TODOS_PATH = "/todos";
const REWARDS_PATH = "/rewards";

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
  DAILIES: {
    path: DAILIES_PATH,
    displayName: TITLES.DAILIES,
    allowGoBackInHistory: false,
  },
  DAILIES_CREATE: {
    path: `${DAILIES_PATH}/create`,
    displayName: TITLES.DAILIES,
    allowGoBackInHistory: false,
  },
  TODOS: {
    path: TODOS_PATH,
    displayName: TITLES.TODOS,
    allowGoBackInHistory: false,
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
