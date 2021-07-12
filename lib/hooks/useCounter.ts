import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedHabit } from "lib/redux/habit/habitSlice";
import { HabitType } from "lib/types/habit.types";
import { SystemSetting } from "lib/types/systemSetting.types";
import { setDifficultySettings } from "lib/redux/systemSetting";

type SystemSettingsOperators = {
  onLoad: () => void;
};

/**
 * Counter custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useGetSystemSettings = (systemSettings: SystemSetting[]): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDifficultySettings(systemSettings));
  }, []);
};
