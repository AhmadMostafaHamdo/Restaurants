import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const desriseBalance = createAsyncThunk(
  "balance/decrise",
  async ({ email, balance }, { rejectWithValue }) => {
    const numericBalance = Number(balance);

    if (isNaN(numericBalance)) {
      toast.error("Invalid balance amount: must be a number");
      return rejectWithValue("Invalid balance amount");
    }

    if (numericBalance <= 0) {
      toast.error("Balance must be a positive number");
      return rejectWithValue("Balance must be positive");
    }

    try {
      const res = await axios.put("/users/decrise-balance", {
        balance: numericBalance,
        email,
      });
      console.log(res.data);
      toast.success(
        `${res.data?.msg || "Balance added"} (Amount: ${numericBalance})`
      );

      return res.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        error.message ||
        "Failed to add balance";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);
