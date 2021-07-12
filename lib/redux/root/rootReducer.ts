import { combineReducers } from "redux";
import { habitSlice } from "../habit";
import { systemSettingSlice } from "../systemSetting";

const rootReducer = combineReducers({
  habit: habitSlice,
  systemSetting: systemSettingSlice,
});

export default rootReducer;
