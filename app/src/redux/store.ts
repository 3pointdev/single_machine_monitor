import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { loginSlice } from "./reducers/auth/loginReducer";
import { indicatorSlice } from "./reducers/indicator/indicatorReducer";
import { machineListSlice } from "./reducers/machine/machineListReducer";
import { machineSlice } from "./reducers/machine/machineReducer";

const rootReducer = combineReducers({
  [loginSlice.name]: loginSlice.reducer,
  [indicatorSlice.name]: indicatorSlice.reducer,
  [machineSlice.name]: machineSlice.reducer,
  [machineListSlice.name]: machineListSlice.reducer,
});

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
  });

const store = makeStore();

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
