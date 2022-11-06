import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { commonReducer } from "./slices/common";
import logger from "redux-logger";
import baseRtkApi from "./services";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  common: persistReducer({ key: "common", storage, whitelist: ["user"] }, commonReducer),
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

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export { store, persistor };
