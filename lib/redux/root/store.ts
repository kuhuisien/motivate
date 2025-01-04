import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { rootPersistConfig } from "./rootReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const clientSideConfigureStore = () => {
  const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export const clientSideConfiguredStore = clientSideConfigureStore();

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    return clientSideConfigureStore();
  }
};
