import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../root/redux.types";
import { SystemSettingState } from "./systemSetting.types";
import { SystemSetting } from "lib/types/systemSetting.types";

export const initialState: SystemSettingState = {
  difficultySettings: [],
};

/**
 * The slice reducer for the part of state that represents habit feature.
 * Contains the management of habit state
 */
const systemSettingSlice = createSlice({
  name: "systemSetting",
  initialState,
  reducers: {
    setDifficultySettings(state, action: PayloadAction<SystemSetting[]>) {
      state.difficultySettings = action.payload;
    },
  },
});

export const { setDifficultySettings } = systemSettingSlice.actions;

/**
 * Selector
 * @param state SystemSetting[]
 */
export const DifficultySettingsSelector = (state: RootState): SystemSetting[] =>
  state.systemSetting.difficultySettings;

export default systemSettingSlice.reducer;
