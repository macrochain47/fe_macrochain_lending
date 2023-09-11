import { AnyAction, combineReducers } from "@reduxjs/toolkit";

import userState from "./user/userSlice";
import appState from "./app/appSlice";

const appReducer = combineReducers({
  //authen
  userState,
  appState
});

export type RootState = ReturnType<typeof appReducer>

export default appReducer;