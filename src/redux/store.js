import { combineReducers, configureStore } from "@reduxjs/toolkit";
import checkListReducer from "../redux/checkListSlice";
import checkListItemReducer from "../redux/checkListItemSlice";

console.log("store");
const rootReducer = combineReducers({
  checkList: checkListReducer,
  checkListItem: checkListItemReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
