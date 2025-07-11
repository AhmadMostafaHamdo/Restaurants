import { createSlice } from "@reduxjs/toolkit";
import { thunkGetFoodById } from "./thunk/thunkGetFoodById";
const initialState = {
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
      state.food = {};
    });
  },
});

export default getFoodByIdSlice.reducer;
