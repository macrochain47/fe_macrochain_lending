import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  address: string;
  network: number;
  balance: string;
  isAuthenticated: boolean;
  signature: string,
  createdAt: Date,
  token: string,
  expiredTime: Date,
}

export const initialUserState : IUserState = {
  address: "",
  network: -1,
  balance: "0",
  isAuthenticated: false,
  signature: "",
  createdAt: new Date(),
  token: "",
  expiredTime: new Date(),
}

interface IPayloadUpdateToken {
  token: string;
  expiredTime : Date
}

const userSlice = createSlice({
  name: "userState",
  initialState: initialUserState,
  reducers: {
    saveInfo: (state, action: PayloadAction<IUserState>) => {
      state = action.payload;
      return state
    },
    clearInfo: (state, action: PayloadAction<undefined>) => {
      state = initialUserState;
      return state;
    },
    updateToken: (state, action: PayloadAction<IPayloadUpdateToken>) => {
      state.token = action.payload.token;
      state.expiredTime = action.payload.expiredTime;
      return state;
    }
  },
});

export const { saveInfo, clearInfo, updateToken } = userSlice.actions;

export default userSlice.reducer;