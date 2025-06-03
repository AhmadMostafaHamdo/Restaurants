import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import cart from "./addToCart/cartSlice";
import { persistReducer, persistStore } from "redux-persist";
const cartConfing = {
  key: "cart",
  storage,
};
const persistCart = persistReducer(cartConfing, cart);
export const store = configureStore({ reducer: { cart: persistCart } });
export const persistor = persistStore(store);
