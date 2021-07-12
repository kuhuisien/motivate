import { SystemSetting } from "lib/types/systemSetting.types";
import { DIFFICULTY_ID, EASY_ICON, MEDIUM_ICON, HARD_ICON } from "../constant";

export const MOCK_DIFFICULTY_SETTINGS: SystemSetting[] = [
  {
    category: "DIFFICULTY",
    code: DIFFICULTY_ID.EASY,
    value: 1,
    displayValue: "EASY",
    image: EASY_ICON,
  },
  {
    category: "DIFFICULTY",
    code: DIFFICULTY_ID.MEDIUM,
    value: 3,
    displayValue: "MEDIUM",
    image: MEDIUM_ICON,
  },
  {
    category: "DIFFICULTY",
    code: DIFFICULTY_ID.HARD,
    value: 6,
    displayValue: "HARD",
    image: HARD_ICON,
  },
];
