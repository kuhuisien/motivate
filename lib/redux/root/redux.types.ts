import { Store, CombinedState, AnyAction as ReduxAnyAction } from "redux";
import { ThunkAction, AnyAction, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { makeStore } from "./store";

// ==============================
// This file contains commonly used types for Redux things
// e.g. state, action creators, thunks.
//
// You can reuse the types here for convenience & consistency.
// Override the types in your own files if these are insufficient.
// ==============================

/**
 * The derived root state from the top-level, root reducer.
 *
 * The root reducer is defined in advance and extracted here so that
 * you do not need to manually update the root state type definition
 * when you change each slice reducer's interface.
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * The Redux store type
 */
export type RootStore = Store<CombinedState<RootState>, ReduxAnyAction>;

/**
 * Store configured, only for the use of:
 *   * App-wide Redux Typings configuration
 */
/* istanbul ignore next */
const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = ReturnType<typeof makeStore>;
/**
 * The derived dispatch function type from the store.
 *
 * The dispatch type is defined in advance and extracted here so that
 * you do not need to manually update the type definition when using
 * in container components.
 */
export type RootDispatch = typeof store.dispatch;

/**
 * A standardized AppThunk type definition. This declares that the
 * "action" that we're using is specifically a thunk function.
 *
 * The thunk is customized with some additional type parameters:
 *   1. <void>         : Return value of the thunk, which doesn't return anything
 *   2. <RootState>    : State type for getState
 *   3. <unknown>      : Extra, optional, argument
 *   4. Action<string> : Action types accepted by dispatch whose type is a string
 *
 * (Typically, the types for thunks are rather long, so this is for you
 * to reuse throughout the application wherever thunks are defined.)
 */
export type RootThunk = ThunkAction<
  Promise<string>,
  RootState,
  unknown,
  AnyAction
>;
