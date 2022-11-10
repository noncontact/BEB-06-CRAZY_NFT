import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: { email: "", account: "", nickname: "", balance: "", img: "" },
  reducers: {
    info: (state, action) => {
      state.email = action.payload.email;
      state.account = action.payload.account;
      state.nickname = action.payload.nickname;
      state.balance = action.payload.balance;
      state.img = action.payload.img;
    },
    logout: (state, action) => {
      state.email = "";
      state.account = "";
      state.nickname = "";
      state.balance = "";
      state.img = "";
    },
  },
});