import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerBankService from "./customerBankService";
// import Cookies from "js-cookie";
const initialState = {
  customerBanks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getCustomerBanks = createAsyncThunk(
  "customerBanks/getAll",
  async (_, thunkAPI) => {
    try {
      return await customerBankService.getCustomerBanks();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const customerBankSlice = createSlice({
  name: "customerBanks",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerBanks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerBanks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customerBanks = action.payload.data;
      })
      .addCase(getCustomerBanks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customerBanks = [];
      });
  },
});

export const { reset } = customerBankSlice.actions;
export default customerBankSlice.reducer;