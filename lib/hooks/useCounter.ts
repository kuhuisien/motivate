import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  habitSelector,
  setSelectedHabit,
} from "lib/redux/store/habit/habitSlice";
import { HabitType } from "components/Habit/HabitCard/HabitCard.types";

type CounterOperators = {
  count: HabitType;
  increment: () => void;
};

/**
 * Counter custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useCounter = (): Readonly<CounterOperators> => {
  const dispatch = useDispatch();
  const counterState = useSelector(habitSelector);

  const testing: HabitType = {
    taskTitle: "testingUpdateTitle",
    notes: "testing",
    difficultyId: "EASY",
  };

  return {
    count: counterState.selectedHabit,
    increment: useCallback(() => dispatch(setSelectedHabit(testing)), [
      dispatch,
    ]),
  };
};
