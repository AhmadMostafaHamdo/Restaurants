import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const thunkGetFoodById = createAsyncThunk(
  "food/id",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/food/list/${restaurantId}`);
      console.log(res?.data?.data);
      return res?.data?.data;
    } catch (error) {
      toast.error(error.response?.data?.data?.msg);
      return rejectWithValue(error.response?.data);
    }
  }
);
