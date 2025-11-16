import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./thunkUsers/getAllUsers";
import { getUserById } from "./thunkUsers/getUserById";
const initialState = {
  users: [],
  user: [],
  loading: false,
  error: null,
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.data;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = action.payload.data.msg;
    });

    builder.addCase(getUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.error = action.payload.data.msg;
    });
  },
});
export default usersSlice.reducer;
