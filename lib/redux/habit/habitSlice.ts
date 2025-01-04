import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HabitState } from "./habit.types";
import { RootState } from "../root/redux.types";
import { HabitListingResponseType, HabitType } from "lib/types/habit.types";

export const initialState: HabitState = {
  fetchHabitList: {
    isLoading: null,
    error: null,
    habitList: [],
    pagination: {
      pageNumber: 1,
      totalSize: 0,
    },
  },
  isAppending: false,
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
      state.fetchHabitList.pagination = initialState.fetchHabitList.pagination;
    },
    fetchHabitListErrored(state, action: PayloadAction<string>) {
      state.fetchHabitList.isLoading = false;
      state.fetchHabitList.error = action.payload;
    },
    fetchHabitListSucceeded(
      state,
      action: PayloadAction<HabitListingResponseType>
    ) {
      state.fetchHabitList.isLoading = false;
      state.fetchHabitList.habitList = action.payload.habitList;
      state.fetchHabitList.pagination =
        action.payload.pagination || initialState.fetchHabitList.pagination;
    },
    appendingHabitListStart(state) {
      state.isAppending = true;
    },
    appendHabitListSucceeded(
      state,
      action: PayloadAction<HabitListingResponseType>
    ) {
      state.fetchHabitList.habitList = state.fetchHabitList.habitList.concat(
        action.payload.habitList
      );
      state.fetchHabitList.pagination =
        action.payload.pagination || initialState.fetchHabitList.pagination;
      state.isAppending = initialState.isAppending;
    },
    appendHabitListErrored(state) {
      state.isAppending = initialState.isAppending;
    },
  },
});

export const {
  fetchHabitListStart,
  fetchHabitListErrored,
  fetchHabitListSucceeded,
  appendingHabitListStart,
  appendHabitListSucceeded,
  appendHabitListErrored,
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

export const habitListHasMoreSelector = (state: RootState): boolean =>
  state.habit.fetchHabitList.habitList.length <
  state.habit.fetchHabitList.pagination.totalSize;

export default habitSlice.reducer;
