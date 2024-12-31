import { HabitType } from "lib/types/habit.types";
import { SystemSetting } from "lib/types/systemSetting.types";

export interface HabitFormFieldProps {
  habitState?: HabitType;
  difficultySettings: SystemSetting[];
  tags: string[];
  setTags: (tags: string[]) => void;
}
