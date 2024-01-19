import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: {},
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    displayCards: (state, action) => {
     const {listId, cardData} = action.payload
    //  return{...state, cards : {...state.cards, [listId] : cardData} }
    state.cards[listId] = cardData
    },
    createNewCard: (state, action) => {
      const {listId,newData } = action.payload
      // return {...state, cards : {...state.cards, [listId] : [...state.cards[listId], newData]}}
      state.cards[listId].push(newData)
    },
    deleteCard: (state, action) => {
      const {listId, cardId} = action.payload
     state.cards[listId] = state.cards[listId].filter((card)=> card.id !== cardId)
    },
  },
});

export const { displayCards, createNewCard, deleteCard } = cardSlice.actions;

export default cardSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cards: [],
// };

// export const cardSlice = createSlice({
//   name: "cards",
//   initialState,
//   reducers: {
//     displayCards: (state, action) => {
//       // console.log("red", action.payload)
//       const uniqueNewCards = action.payload.filter(
//         (newCard) => !state.cards.some((existingCard) => existingCard.id === newCard.id)
//       );

//       return {
//         ...state,
//         cards: [...state.cards, ...uniqueNewCards],
//       };
//     },
//     createNewCard: (state, action) => {
//       state.cards.push(action.payload);
//       return state;
//     },
//     deleteCard: (state, action) => {
//       return {
//         ...state,
//         cards: state.cards.filter((card) => card.id !== action.payload),
//       };
//     },
//   },
// });

// export const { displayCards, createNewCard, deleteCard } = cardSlice.actions;

// export default cardSlice.reducer;