import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HabitState } from "./habit.types";
import { HabitType } from "components/Habit/HabitCard/HabitCard.types";
import { RootState } from "../root/redux.types";

export const initialState: HabitState = {
  selectedHabit: {
    taskTitle: null,
    notes: null,
    difficultyId: null,
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
 * @param state HabitState
 */
export const habitSelector = (state: RootState): HabitState => state.habit;

export default habitSlice.reducer;
