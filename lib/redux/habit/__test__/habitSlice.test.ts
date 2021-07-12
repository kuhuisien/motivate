import {
  habitSlice,
  initialState as habitInitialState,
  setSelectedHabit,
} from "..";
import { HabitState } from "../habit.types";
import { habitSelector } from "../habitSlice";
import configureStore from "redux-mock-store";

describe("Habit Slice Reducer", () => {
  const configureMockStore = configureStore([]);
  const store = configureMockStore({
    habit: habitInitialState,
  });

  it("should handle initial state", () => {
    const action = {} as any;

    expect(habitSlice(undefined, action)).toEqual(habitInitialState);
  });

  it("should return correct state when setSelectedHabit action is used", () => {
    const MOCK_HABIT = {
      taskTitle: "dummy title",
      notes: "dummy notes",
      difficultyId: "EASY",
      createdAt: "dummy createdAt",
    };
    const finalState: HabitState = {
      ...habitInitialState,
      selectedHabit: {
        taskTitle: MOCK_HABIT.taskTitle,
        notes: MOCK_HABIT.notes,
        difficultyId: MOCK_HABIT.difficultyId,
        createdAt: MOCK_HABIT.createdAt,
      },
    };

    expect(habitSlice(habitInitialState, setSelectedHabit(MOCK_HABIT))).toEqual(
      finalState
    );
  });

  it("should return selectedHabit", () => {
    expect(habitSelector(store.getState() as any)).toBe(
      habitInitialState.selectedHabit
    );
  });
});
