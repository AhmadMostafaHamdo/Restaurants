import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/users");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
