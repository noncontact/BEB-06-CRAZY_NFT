import { createSlice } from "@reduxjs/toolkit";

const initialState= { 
  clubId:undefined,
  clubImg:"",
  clubName:"",
  catagory:"all",
  catagoryId:0,
  post_id:undefined

};

const clubSlice = createSlice({
  name: "clubSlice",
  initialState,
  reducers: {
    selectClub: (state, action) => {
      state.clubId = action.payload.clubId;
      state.clubImg = action.payload.clubImg;
      state.clubName = action.payload.clubName;
    },
    selectCategory: (state, action) => {
      state.category = action.payload.category;
      state.categoryId = action.payload.categoryId;
    },
    selectPost: (state, action) => {
      state.post_id = action.payload.post_id;
    },
    initCate: (state) => {
      state.category = "all";
      state.categoryId = 0;
    },
  },
});
export default clubSlice;
export const { selectClub, selectCategory, selectPost, initCate } =
  clubSlice.actions;
