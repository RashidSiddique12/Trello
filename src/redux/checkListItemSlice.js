import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkListItemData: [],
  //   newChecklist: ""
};

export const checkListItemSlice = createSlice({
  name: "checkListItem",
  initialState,
  reducers: {
    displayCheckListItem: (state, action) => {
      state.checkListItemData = action.payload;
    },
    createNewCheckListItem: (state, action) => {
      state.checkListItemData.push(action.payload);
    },
    deleteCheckListItem: (state, action) => {
      state.checkListItemData = state.checkListItemData.filter(
        (item) => item.id !== action.payload
      );
    },
    handleCheckBox: (state, action) => {
      state.checkListItemData = state.checkListItemData.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, state: action.payload.state };
        } else {
          return item;
        }
      });
    },
  },
});

export const {
  displayCheckListItem,
  createNewCheckListItem,
  deleteCheckListItem,
  handleCheckBox,
} = checkListItemSlice.actions;

export default checkListItemSlice.reducer;
