import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const thunkGetFood = createAsyncThunk(
  "food",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/food/list");
      return res?.data?.food;
    } catch (error) {
      toast.error(error.response?.data?.data?.msg);
      return rejectWithValue(error.response?.data);
    }
  }
);
