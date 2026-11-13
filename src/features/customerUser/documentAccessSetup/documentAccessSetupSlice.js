import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import documentAccessSetupService from "./documentAccessSetupService";

const initialState = {
  documentAccessSetups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


// ✅ Get All Document Access Setups
export const getDocumentAccessSetups = createAsyncThunk(
  "documentAccessSetup/getAll",
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await documentAccessSetupService.getDocumentAccessSetups(token, params);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Slice
export const documentAccessSetupSlice = createSlice({
  name: "documentAccessSetup",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      // Get All
      .addCase(getDocumentAccessSetups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocumentAccessSetups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.documentAccessSetups = action.payload.data;
      })
      .addCase(getDocumentAccessSetups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = documentAccessSetupSlice.actions;
export default documentAccessSetupSlice.reducer;
