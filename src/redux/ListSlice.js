import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listData: [],
};

export const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    displayList: (state, action) => {
      state.listData = action.payload;
    },
    createNewList: (state, action) => {
      state.listData.push(action.payload);
    },
    deleteList: (state, action) => {
      state.listData = state.listData.filter(
        (list) => list.id !== action.payload
      );
    },
  },
});

export const { displayList, createNewList, deleteList } = listSlice.actions;
export default listSlice.reducer;
