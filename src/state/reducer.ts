import { AnyAction, combineReducers } from "@reduxjs/toolkit";

import userState from "./user/userSlice";

const appReducer = combineReducers({
  //authen
  userState,
});

export type RootState = ReturnType<typeof appReducer>

export default appReducer;