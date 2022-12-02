import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clubId: undefined,
  clubName: "",
  category: "all",
  categoryId: 0,
  post_id: undefined,
};

const clubSlice = createSlice({
  name: "clubSlice",
  initialState,
  reducers: {
    selectClub: (state, action) => {
      state.clubId = action.payload.clubId;
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
