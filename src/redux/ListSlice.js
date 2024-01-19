import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listData: [],
  newList: "",
  isLoading: true,
  addList : false,
  error: "",
};

export const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    displayList: (state, action) => {
      state.listData = action.payload;
      state.isLoading = false;
    },
    createNewList: (state, action) => {
      state.listData.push(action.payload);
      state.newList = "";
      state.addList = false
    },
    deleteList: (state, action) => {
      state.listData = state.listData.filter(
        (list) => list.id !== action.payload
      );
    },
    setNewList: (state, action) => {
      state.newList = action.payload;
    },
    setAddList : (state, action)=>{
      state.addList = action.payload
    },
    setListError: (state, action) => {
      (state.error = action.payload), (state.isLoading = false);
    },
  },
});

export const { displayList, createNewList, deleteList, setNewList,setAddList, setListError } =
  listSlice.actions;
export default listSlice.reducer;
