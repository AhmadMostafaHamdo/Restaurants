import { createSlice } from "@reduxjs/toolkit";
import { addBalanceThunk } from "./thunk/addBalanceThunk";
const initialState = {
  loading: false,
  error: null,
};
const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addBalanceThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addBalanceThunk.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addBalanceThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = {};
    });
  },
});

export default balanceSlice.reducer;
