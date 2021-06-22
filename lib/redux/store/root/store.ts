import {
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { MakeStore } from "next-redux-wrapper";
import { RootState } from "./redux.types";
import rootReducer from "./rootReducer";

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#correct-typings-for-the-dispatch-type
 */
const middlewares = [...getDefaultMiddleware<RootState>()];

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV === "development",
});

export const makeStore: MakeStore = (_?: RootState): EnhancedStore => store;
