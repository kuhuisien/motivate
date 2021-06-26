import { HabitType } from "lib/types/data.types";

export interface HabitCardProps {
  habit: HabitType;

  setSelectedHabit: (habit: HabitType) => void;
}
