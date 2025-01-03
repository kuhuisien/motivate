import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SystemSetting } from "lib/types/systemSetting.types";
import { setDifficultySettings } from "lib/redux/systemSetting";

export const useGetSystemSettings = (systemSettings: SystemSetting[]): void => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDifficultySettings(systemSettings));
  }, []);
};
