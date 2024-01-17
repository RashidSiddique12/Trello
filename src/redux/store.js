import { combineReducers, configureStore } from "@reduxjs/toolkit";
import checkListReducer from "../redux/checkListSlice";
import checkListItemReducer from "../redux/checkListItemSlice";
import listReducer from "../redux/ListSlice";
import cardReducer from "../redux/cardSlice";
import boardReducer from "../redux/boardSlice";

console.log("store");
const rootReducer = combineReducers({
  board: boardReducer,
  list: listReducer,
  card: cardReducer,
  checkList: checkListReducer,
  checkListItem: checkListItemReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
