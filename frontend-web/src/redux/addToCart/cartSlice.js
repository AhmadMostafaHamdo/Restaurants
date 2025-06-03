import { createSlice } from "@reduxjs/toolkit";
const initialState = { items: {} };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]--;
      }
    },
    getTotalPrice:(state)=>{
      state
    }
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
