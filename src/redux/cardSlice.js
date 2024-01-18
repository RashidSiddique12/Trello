import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
};

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    displayCards: (state, action) => {
      // Assuming action.payload is an array of cards
      console.log("red", action.payload)
      const uniqueNewCards = action.payload.filter(
        (newCard) => !state.cards.some((existingCard) => existingCard.id === newCard.id)
      );

      return {
        ...state,
        cards: [...state.cards, ...uniqueNewCards],
      };
    },
    createNewCard: (state, action) => {
      state.cards.push(action.payload);
      return state;
    },
    deleteCard: (state, action) => {
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
      };
    },
  },
});

export const { displayCards, createNewCard, deleteCard } = cardSlice.actions;

export default cardSlice.reducer;


// export const cardSlice = createSlice({
//   name: "cards",
//   initialState,
//   reducers: {
//     displayCards: (state, action) => {
//       //   console.log(action.payload.data);
//       state.cards = {
//         ...state.cards,
//         [action.payload.id]: action.payload.data,
//       };
//     },

  
//     createNewCard: (state, action) => {
//       console.log(state.cards[action.payload.id]);
//       console.log(action.payload.data);
//       state.cards = {
//         ...state.cards,
//         [action.payload.id]: [
//           ...state.cards[action.payload.id],
//           action.payload.data,
//         ],
//       };
//     },
//     deleteCard: (state, action) =>  {
//       const temp = state.cards[action.payload.listId].filter(
//         (card) => {
//           return card.id !== action.payload.cardId;
//         }
//       );
//       state.cards[action.payload.listId] = temp;
//     },
//   },
// });