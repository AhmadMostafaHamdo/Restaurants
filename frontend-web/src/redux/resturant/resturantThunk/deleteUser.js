import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const deleteUser = createAsyncThunk(
  "resturant/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/users/${id}`);
      toast.success(res.data.data.msg);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
