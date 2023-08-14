import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IApp {
    web3: any;
    isConnectedWallet: boolean,
    isListening: boolean,
}

const initialAppState : IApp= {
    web3: null,
    isConnectedWallet: false,
    isListening: false,
}

export const appSlice = createSlice({
    name: "appState",
    initialState: initialAppState,
    reducers: {
      saveWeb3: (state, action: PayloadAction<any>) => {
        return {...state, isConnectedWallet: true, web3: action.payload, isListening: true}
      },
      clearWeb3: (state, action: PayloadAction<undefined>) => {
        return {...state, isConnectedWallet: false, web3: null, isListening: true};
      },
    },
});
  
export const { saveWeb3, clearWeb3} = appSlice.actions;
  
export default appSlice.reducer;

  