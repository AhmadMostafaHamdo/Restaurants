import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const authThunk = createAsyncThunk(
  "auth/authThunk",
  async ({ endpoint, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/auth/${endpoint}`, formData);
      cookies.set("token", res.data.token);
      toast.success(`${endpoint} successfuly`);
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.data?.msg);
      return rejectWithValue(error.response?.data);
    }
  }
);
