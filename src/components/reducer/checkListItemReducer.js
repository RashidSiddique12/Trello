export const checkListItemReducer = (state, action) => {
    switch (action.type) {
      case "displayCheckListItem":
        return { ...state, checkItems: action.payload };
  
      case "addNewItem":
        return {
          ...state,
          checkItems: [...state.checkItems, action.payload],
          newAddItem: "",
        };
  
      case "deleteItem":
        return {
          ...state,
          checkItems: state.checkItems.filter((st) => st.id !== action.payload),
        };
  
      case "handleCheckBox":
        return {
          ...state,
          checkItems: state.checkItems.map((st) => {
            if (st.id === action.payload.checkItemId) {
              return { ...st, state: action.payload.checkItemstate };
            } else {
              return st;
            }
          }),
        };
  
      case "newItem":
        return { ...state, newAddItem: action.payload };
      default:
        return state;
    }
  };
  