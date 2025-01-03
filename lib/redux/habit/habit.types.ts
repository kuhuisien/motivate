import { HabitType } from "lib/types/habit.types";

export interface HabitState {
  selectedHabit: HabitType;
  fetchHabitList: {
    isLoading: boolean | null;
    error: string | null;
    habitList: HabitType[];
  };
}
