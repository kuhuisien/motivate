import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HabitState } from "./habit.types";
import { RootState } from "../root/redux.types";
import { HabitType } from "lib/types/habit.types";

export const initialState: HabitState = {
  selectedHabit: {
    taskTitle: null,
    notes: null,
    difficultyId: null,
    createdAt: null,
    id: "",
    tags: [],
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
    setSelectedHabit(state, action: PayloadAction<HabitType>) {
      state.selectedHabit = action.payload;
    },
  },
});

export const { setSelectedHabit } = habitSlice.actions;

/**
 * Selector
 * @param state HabitType
 */
export const habitSelector = (state: RootState): HabitType =>
  state.habit.selectedHabit;

export default habitSlice.reducer;
