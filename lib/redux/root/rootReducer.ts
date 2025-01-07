import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { systemSettingSlice } from "../systemSetting";

export const rootPersistConfig = {
  key: "aspiroRoot",
  storage,
};

const rootReducer = combineReducers({
  systemSetting: systemSettingSlice,
});

export default rootReducer;
