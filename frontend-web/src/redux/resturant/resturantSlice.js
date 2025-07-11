import { createSlice } from "@reduxjs/toolkit";
import { resturantThunk } from "./resturantThunk/resturanrThunk";
import { deleteUser } from "./resturantThunk/deleteUser";
const initialState = {
  resturant: [],
  loading: false,
  error: null,
};
const resturantSlice = createSlice({
  name: "resturant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resturantThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(resturantThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.resturant = Array.isArray(action.payload.data)
        ? action.payload.data
        : [action.payload.data];
    });
    builder.addCase(resturantThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.resturant = [];
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default resturantSlice.reducer;
