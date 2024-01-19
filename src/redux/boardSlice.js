import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardData: [],
  isLoading: true,
  error: "",
  open: false,
  newBoardName: "",
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    displayBoard: (state, action) => {
      state.boardData = action.payload;
      state.isLoading = false;
    },
    createNewBoard: (state, action) => {
      state.boardData.push(action.payload);
      state.newBoardName = "";
    },
    setNewBoardName: (state, action) => {
      state.newBoardName = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setOpenBox: (state, action)=>{
      state.open = action.payload
    }
  },
});

export const { displayBoard, createNewBoard, setError,setOpenBox, setNewBoardName } = boardSlice.actions;
export default boardSlice.reducer;
