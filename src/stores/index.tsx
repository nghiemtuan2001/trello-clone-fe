import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import baseRtkApi from "stores/services/todo";
import { commonReducer } from "./slices/common";
import logger from "redux-logger";

const rootReducer = combineReducers({
  common: commonReducer,
  [baseRtkApi.reducerPath]: baseRtkApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware().concat(baseRtkApi.middleware);
    if (process.env.NODE_ENV === "development") {
      return middleware.concat(logger);
    }

    return middleware;
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export default store;
