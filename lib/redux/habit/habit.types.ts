import { HabitType } from "lib/types/habit.types";

export interface HabitState {
  fetchHabitList: {
    isLoading: boolean | null;
    error: string | null;
    habitList: HabitType[];

    pagination: {
      pageNumber: number;
      totalSize: number;
    };
  };
  // whether habit list is being fetched to be appended
  isAppending: boolean;
}
