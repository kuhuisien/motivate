import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { habitSlice } from "../habit";
import { systemSettingSlice } from "../systemSetting";

export const persistConfig = {
  key: "aspiroRoot",
  storage,
};

const rootReducer = combineReducers({
  habit: habitSlice,
  systemSetting: systemSettingSlice,
});

export default rootReducer;
