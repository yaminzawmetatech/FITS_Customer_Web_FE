import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import nrcStateService from "./nrcStateService";
// import Cookies from "js-cookie";
const initialState = {
  nrcStates: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all users
export const getNRCStates = createAsyncThunk(
  "nrcStates/getAll",
  async (_, thunkAPI) => {
    try {
      return await nrcStateService.getNrcStates();
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

export const syncWebNrcStates = createAsyncThunk(
  "nrcStates/syncWebNrcStates",
  async (_, thunkAPI) => {
    try {
      return await nrcStateService.syncWebNrcStates();
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

export const nrcStateSlice = createSlice({
  name: "nrcStates",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNRCStates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNRCStates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.nrcStates = action.payload.data;
      })
      .addCase(getNRCStates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.nrcStates = [];
      })
      .addCase(syncWebNrcStates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(syncWebNrcStates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(syncWebNrcStates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = nrcStateSlice.actions;
export default nrcStateSlice.reducer;