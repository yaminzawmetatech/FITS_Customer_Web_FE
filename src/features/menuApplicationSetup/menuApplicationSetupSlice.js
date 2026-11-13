import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import menuApplicationSetupService from "./menuApplicationSetupService";

const initialState = {
  applicationSetups: {
    data: [],
    isLoading: true,
  },
  menuApplicationSetups: [],
  isLoading: true,
};

// Get application setup list
export const getMenuApplicationSetups = createAsyncThunk(
  "menuApplicationSetup/getMenuApplicationSetups",
  async (_, thunkAPI) => {
    try {
      return await menuApplicationSetupService.getMenuApplicationSetupList({});
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

// Get application setup list
export const getApplicationSetupList = createAsyncThunk(
  "menuApplicationSetup/getApplicationSetupList",
  async (_, thunkAPI) => {
    try {
      return await menuApplicationSetupService.getApplicationSetupList({});
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

export const menuApplicationSetupSlice = createSlice({
  name: "menuApplicationSetup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenuApplicationSetups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMenuApplicationSetups.fulfilled, (state, action) => {
        state.menuApplicationSetups = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getMenuApplicationSetups.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getApplicationSetupList.pending, (state) => {
        state.applicationSetups.isLoading = true;
      })
      .addCase(getApplicationSetupList.fulfilled, (state, action) => {
        state.applicationSetups.data = action.payload.data;
        state.applicationSetups.isLoading = false;
      })
      .addCase(getApplicationSetupList.rejected, (state, action) => {
        state.applicationSetups.isLoading = false;
      });
  },
});

export default menuApplicationSetupSlice.reducer;
