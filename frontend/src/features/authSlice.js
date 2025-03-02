import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const checkAuth = createAsyncThunk("auth/check", async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/auth/check`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw error;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "failed", // 'loading' | 'succeeded' | 'failed'
    initialized: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = "failed";
        state.user = null;
        state.initialized = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "failed";
      });
  },
});

export default authSlice.reducer;
