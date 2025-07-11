import { createSlice } from "@reduxjs/toolkit";
import { authThunk } from "./authThunk/authThunk";
import { logoutThunk } from "./logoutThunk/logoutThunk";
import { updateThunk } from "./updateThunk/updateThunk";
const initialState = {
  user: {},
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(authThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
    });
    builder.addCase(authThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = {};
    });
    builder.addCase(updateThunk.pending, (state) => {
      (state.error = null), (state.loading = true);
    });
    builder.addCase(updateThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logoutThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {};
    });
  },
});

export default authSlice.reducer;
