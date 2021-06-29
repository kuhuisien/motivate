import { HabitType } from "lib/types/habit.types";

export interface HabitCardProps {
  habit: HabitType;

  setSelectedHabit: (habit: HabitType) => void;
}
