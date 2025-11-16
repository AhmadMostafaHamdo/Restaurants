import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import cart from "./addToCart/cartSlice";
import auth from "./auth/authSlice";
import resturant from "./resturant/resturantSlice";
import users from "./users/sliceUsers";
import balance from "./balance/balanceSlice";
import food from "./food/foodSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
const persistAuth = {
  key: "auth",
  storage,
};
const cartConfing = {
  key: "cart",
  storage,
};
const resturantConfing = {
  key: "resturant",
  storage,
};
const usersConfing = {
  key: "users",
  storage,
};
const balanceConfing = {
  key: "balance",
  storage,
};
const foodConfig = {
  key: "food",
  storage,
};
const rootReducer = combineReducers({
  auth: persistReducer(persistAuth, auth),
  cart: persistReducer(cartConfing, cart),
  resturant: persistReducer(resturantConfing, resturant),
  users: persistReducer(usersConfing, users),
  balance: persistReducer(balanceConfing, balance),
  food: persistReducer(foodConfig, food),
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
