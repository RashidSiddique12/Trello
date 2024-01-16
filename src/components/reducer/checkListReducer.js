export const checkListReducer = (state, action)=>{
    switch(action.type){
        case "displayCheckList":
            return{...state, checkListData : action.payload}
  
        case "addNewCheckList":
          return {...state, checkListData: [...state.checkListData, action.payload],  newChecklist : ""}
        
        case "deleteCheckList":
          return {...state, checkListData: state.checkListData.filter((st)=>st.id !== action.payload)}
        case "NewChecklist":
          return {...state, newChecklist: action.payload}
        
        default : 
        return state
    }
  }

