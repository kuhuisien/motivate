import { combineReducers } from "redux";
import { habitSlice } from "../habit";

const rootReducer = combineReducers({
  habit: habitSlice,
});

export default rootReducer;
