import { HabitType } from "lib/types/habit.types";

export interface HabitState {
  fetchHabitList: {
    isLoading: boolean | null;
    error: string | null;
    habitList: HabitType[];
  };
}
