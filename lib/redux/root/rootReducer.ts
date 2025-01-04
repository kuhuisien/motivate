import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import habitReducer from "../habit/habitSlice";
import { systemSettingSlice } from "../systemSetting";

export const rootPersistConfig = {
  key: "aspiroRoot",
  storage,
  blacklist: ["habit"],
};

const habitConfig = {
  key: "habit",
  storage,
  blacklist: ["isAppending"],
};

const rootReducer = combineReducers({
  habit: persistReducer(habitConfig, habitReducer),
  systemSetting: systemSettingSlice,
});

export default rootReducer;
