import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const thunkGetFoodById = createAsyncThunk(
  "food/id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/food/list/${id}`);
      console.log(res?.data?.food);
      return res?.data?.food;
    } catch (error) {
      toast.error(error.response?.data?.data?.msg);
      return rejectWithValue(error.response?.data);
    }
  }
);
