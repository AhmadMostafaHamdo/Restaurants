import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/users/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
