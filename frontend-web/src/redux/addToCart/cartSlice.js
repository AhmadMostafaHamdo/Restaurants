import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: {} };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = String(action.payload);
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    removeFromCart: (state, action) => {
      const id = String(action.payload);
      if (state.items[id]) {
        state.items[id]--;
        if (state.items[id] <= 0) {
          delete state.items[id];
        }
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
