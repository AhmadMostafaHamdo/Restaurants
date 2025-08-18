import { createSlice } from "@reduxjs/toolkit";
import { thunkGetFoodById } from "./thunk/thunkGetFoodById";
import { thunkGetFood } from "./thunk/thunkFood";
const initialState = {
  foods: [],
  food: [],
  loading: false,
  error: null,
};
const getFoodByIdSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(thunkGetFoodById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(thunkGetFoodById.fulfilled, (state, action) => {
      state.loading = false;
      state.food = action.payload;
    });
    builder.addCase(thunkGetFoodById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.food = [];
    });
    builder.addCase(thunkGetFood.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(thunkGetFood.fulfilled, (state, action) => {
      state.loading = false;
      state.foods = action.payload;
    });
    builder.addCase(thunkGetFood.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.foods = {};
    });
  },
});

export default getFoodByIdSlice.reducer;
