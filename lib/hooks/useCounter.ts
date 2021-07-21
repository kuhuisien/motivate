import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SystemSetting } from "lib/types/systemSetting.types";
import { setDifficultySettings } from "lib/redux/systemSetting";

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
