import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const updateThunk = createAsyncThunk(
  "auth/updateThunk",
  async ({ endpoint, formData, id }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/auth/${endpoint}/${id}`, formData);
      cookies.set("token", res.data.token);

      toast.success(`${endpoint} successfuly`);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.data?.msg);
      return rejectWithValue(error.response?.data);
    }
  }
);
