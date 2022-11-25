import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";
const initialState= { 
  nickname: null,
  isLogin: false,
  address:null,
  profileurl: null,
};

const accountSlice = createSlice({
  name: 'accountSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      if(!!action.payload.nickname)state.nickname = action.payload.nickname;
      if(!!action.payload.nickname)state.isLogin = true;
      if(!!action.payload.address)state.address = action.payload.address;
      if(!!action.payload.profileurl)state.profileurl = action.payload.profileurl;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});
export default accountSlice;
export const { login } = accountSlice.actions;