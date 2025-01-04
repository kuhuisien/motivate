import { Dispatch } from "@reduxjs/toolkit";
import {
  getHabits,
  getHabitsInput,
} from "lib/api/client/habit/GetHabits/getHabits";
import { RootState } from "../root/redux.types";
import {
  appendHabitListErrored,
  appendHabitListSucceeded,
  appendingHabitListStart,
  fetchHabitListErrored,
  fetchHabitListStart,
  fetchHabitListSucceeded,
} from "./habitSlice";

export const fetchHabitList =
  (input?: getHabitsInput) => async (dispatch: Dispatch) => {
    dispatch(fetchHabitListStart());
    try {
      const habitListRes = await getHabits(input);
      dispatch(fetchHabitListSucceeded(habitListRes));
    } catch (error) {
      dispatch(fetchHabitListErrored("error"));
    }
  };

export const fetchMoreHabitList =
  (input?: getHabitsInput) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const rootState = getState();
    const { pageNumber } = rootState.habit.fetchHabitList.pagination;
    dispatch(appendingHabitListStart());
    try {
      const habitList = await getHabits({
        ...input,
        pageNumber: pageNumber + 1,
      });
      dispatch(appendHabitListSucceeded(habitList));
    } catch (error) {
      dispatch(appendHabitListErrored());
    }
  };
