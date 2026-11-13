import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dealerSetupService from "./dealerSetupService";

const initialState = {
  dealers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ✅ now getDealers accepts params
export const getDealers = createAsyncThunk(
  "dealer/getAll",
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await dealerSetupService.getDealers(token, params);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dealerSetupSlice = createSlice({
  name: "dealer",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getDealers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealers = action.payload.data;
      })
      .addCase(getDealers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dealerSetupSlice.actions;
export default dealerSetupSlice.reducer;
