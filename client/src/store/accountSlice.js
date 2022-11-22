import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";
const initialState= { 
  nickname: null,
  isLogin: false,
  address:null,
  imageURI: null,
};

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.nickname = action.payload.nickname;
      state.isLogin = true;
      state.address = action.payload.address;
      state.imageURI = action.payload.imageURI;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});
export default accountSlice;
export const { login } = accountSlice.actions;