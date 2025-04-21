"use client";
import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { authService } from "./auth/authService";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./auth/authSlice";
import boardReducer from "./boards/boardSlice";
import { boardsService } from "./boards/boardsService";
import { columnsService } from "./columns/columnsService";
import { tasksService } from "./tasks/tasksService";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  [authService.reducerPath]: authService.reducer,
  [boardsService.reducerPath]: boardsService.reducer,
  [columnsService.reducerPath]: columnsService.reducer,
  [tasksService.reducerPath]: tasksService.reducer,

  auth: authReducer,
  board: boardReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }).concat(
        authService.middleware as Middleware,
        boardsService.middleware as Middleware,
        columnsService.middleware as Middleware,
        tasksService.middleware as Middleware
      ),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
