import { HabitType } from "lib/types/habit.types";
import { SystemSetting } from "lib/types/systemSetting.types";

export interface HabitCardProps {
  habit: HabitType;

  difficultySettings: SystemSetting[];

  // event fired when the habit card is selected
  setSelectedHabit: (habit: HabitType) => void;

  // event fired when habit card button is clicked
  handleClick: (point: number) => void;
}
