import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkListItemData: {},
  // newItem: "",
  // openInput: false,
  // loading: true,
};

export const checkListItemSlice = createSlice({
  name: "checkListItem",
  initialState,
  reducers: {
    displayCheckListItem: (state, action) => {
      const { itemData, checkListId } = action.payload;
      // console.log(itemData);
      return {
        ...state,
        checkListItemData: {
          ...state.checkListItemData,
          [checkListId]: itemData,
        },
      };
  
    },
    createNewCheckListItem: (state, action) => {
      const { newItemData, checkListId } = action.payload;
      return {
        ...state,
        checkListItemData: {
          ...state.checkListItemData,
          [checkListId]: [...state.checkListItemData[checkListId], newItemData],
        },
        // newItem : ""
      };
    },
    deleteCheckListItem: (state, action) => {
      const { checkItemsId, checkListId } = action.payload;
      let updatedData = state.checkListItemData[checkListId].filter(
        (ele) => ele.id != checkItemsId
      );
      return {
        ...state,
        checkListItemData: {
          ...state.checkListItemData,
          [checkListId]: [...updatedData],
        },
      };
    },
    handleCheckBox: (state, action) => {
      const {checkListId,data } = action.payload
      state.checkListItemData[checkListId] = state.checkListItemData[checkListId].map((item) => {
        if (item.id === data.id) {
          return { ...item, state: data.state };
        } else {
          return item;
        }
      });
    },
    // setNewItem: (state, action) => {
    //   // console.log(action.payload);
    //   state.newItem = action.payload;
    // },
    // setOpenInput: (state, action) => {
    //   state.openInput = action.payload;
    // },
  },
});

export const {
  displayCheckListItem,
  createNewCheckListItem,
  deleteCheckListItem,
  handleCheckBox,
  setNewItem,
  setOpenInput,
} = checkListItemSlice.actions;

export default checkListItemSlice.reducer;
