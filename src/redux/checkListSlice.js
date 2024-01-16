import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkListData: [],
//   newChecklist: ""
};

export const checkListSlice = createSlice({
  name: "checkList",
  initialState,
  reducers: {
    displayCheckList: (state, action) => {
      return { ...state, checkListData: action.payload };
    },

    createNewCheckList: (state, action) => {
      state.checkListData.push(action.payload);
    },
    deleteCheckList: (state, action) => {
      state.checkListData =  state.checkListData.filter(
        (checkList) => (checkList.id !== action.payload)
      );
    },
    // newChecklist : (state, action)=>{
    //     return {...state, newChecklist : action.payload}
    // }
  },
});

export const { displayCheckList, createNewCheckList, deleteCheckList } =
  checkListSlice.actions;

export default checkListSlice.reducer