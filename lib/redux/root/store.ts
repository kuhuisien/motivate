import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { RootState } from "./redux.types";
import rootReducer, { persistConfig } from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";

/**
 * @see https://redux-toolkit.js.org/usage/usage-with-typescript#correct-typings-for-the-dispatch-type
 */
const middlewares = [...getDefaultMiddleware<RootState>()];

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV === "development",
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
    });
    store.__persistor = persistStore(store);
    return store;
  }
};
