import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HabitState } from "./habit.types";
import { RootState } from "../root/redux.types";
import { HabitType } from "lib/types/habit.types";

export const initialState: HabitState = {
  fetchHabitList: {
    isLoading: null,
    error: null,
    habitList: [],
  },
};

/**
 * The slice reducer for the part of state that represents habit feature.
 * Contains the management of habit state
 */
const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    fetchHabitListStart(state) {
      state.fetchHabitList.isLoading = true;
      state.fetchHabitList.error = null;
      state.fetchHabitList.habitList = initialState.fetchHabitList.habitList;
    },
    fetchHabitListErrored(state, action: PayloadAction<string>) {
      state.fetchHabitList.isLoading = false;
      state.fetchHabitList.error = action.payload;
    },
    fetchHabitListSucceeded(state, action: PayloadAction<HabitType[]>) {
      state.fetchHabitList.isLoading = false;
      state.fetchHabitList.habitList = action.payload;
    },
  },
});

export const {
  fetchHabitListStart,
  fetchHabitListErrored,
  fetchHabitListSucceeded,
} = habitSlice.actions;

/**
 * Selectors
 */
export const habitSelector =
  (id: string) =>
  (state: RootState): HabitType | undefined =>
    state.habit.fetchHabitList.habitList.find((x) => x.id === id);

export const habitListIsLoadingSelector = (state: RootState): boolean | null =>
  state.habit.fetchHabitList.isLoading;

export const habitListErrorSelector = (state: RootState): string | null =>
  state.habit.fetchHabitList.error;

export const habitListSelector = (state: RootState): HabitType[] =>
  state.habit.fetchHabitList.habitList || [];

export default habitSlice.reducer;
