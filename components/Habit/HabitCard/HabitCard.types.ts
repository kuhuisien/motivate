import { HabitType } from "lib/types/habit.types";
import { SystemSetting } from "lib/types/systemSetting.types";

export interface HabitCardProps {
  habit: HabitType;

  difficultySettings: SystemSetting[];
}
