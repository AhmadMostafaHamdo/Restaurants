import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const resturantThunk = createAsyncThunk(
  "resturant/resturantThunk",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/resturants");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
