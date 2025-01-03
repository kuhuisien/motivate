import { Dispatch } from "@reduxjs/toolkit";
import {
  getHabits,
  getHabitsInput,
} from "lib/api/client/habit/GetHabits/getHabits";
import {
  fetchHabitListErrored,
  fetchHabitListStart,
  fetchHabitListSucceeded,
} from "./habitSlice";

export const fetchHabitList =
  (input?: getHabitsInput) => async (dispatch: Dispatch) => {
    dispatch(fetchHabitListStart());
    try {
      const habitList = await getHabits(input);
      dispatch(fetchHabitListSucceeded(habitList.habitList));
    } catch (error) {
      dispatch(fetchHabitListErrored("error"));
    }
  };
