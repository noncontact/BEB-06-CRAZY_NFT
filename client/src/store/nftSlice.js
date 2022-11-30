import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";

const initialState= { 
    meta:{
      image:"",
      address:"",
      name:"",
      description:"",
      attributes:[
        {
          trait_type:"",
          value:"",
        }
      ]
    }
};

const nftSlice = createSlice({
  name: 'nftSlice',
  initialState,
  reducers: {
    selectNft: (state, action) => {
      state.meta = action.payload.meta;
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  }
});
export default nftSlice;
export const { selectNft } = nftSlice.actions;