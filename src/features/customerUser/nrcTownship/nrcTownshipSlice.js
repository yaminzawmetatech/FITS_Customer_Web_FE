import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import nrcTownshipService from "./nrcTownshipService";

const initialState = {
  nrcTownships: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all NRC Townships
export const getNRCTownships = createAsyncThunk(
  "nrcTownships/getAll",
  async (params, thunkAPI) => {
    try {
      return await nrcTownshipService.getNrcTownships(params);
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


export const nrcTownshipSlice = createSlice({
  name: "nrcTownships",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNRCTownships.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNRCTownships.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.nrcTownships = action.payload.data;
      })
      .addCase(getNRCTownships.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.nrcTownships = [];
      })
  },
});

export const { reset } = nrcTownshipSlice.actions;
export default nrcTownshipSlice.reducer;
