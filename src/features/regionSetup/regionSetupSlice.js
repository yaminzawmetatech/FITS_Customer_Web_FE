import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import regionSetupService from "./regionSetupService";

const initialState = {
  regions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ✅ Create Region
export const createRegion = createAsyncThunk(
  "region/create",
  async (regionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await regionSetupService.createRegion(regionData, token);
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Get All Regions
export const getRegions = createAsyncThunk(
  "region/getAll",
  async (params, thunkAPI) => {
    try {
      return await regionSetupService.getRegions(params);
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Delete Region
export const deleteRegion = createAsyncThunk(
  "region/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await regionSetupService.deleteRegion(id, token);
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Update Region
export const updateRegion = createAsyncThunk(
  "region/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await regionSetupService.updateRegion(id, newData, token);
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Slice
export const regionSetupSlice = createSlice({
  name: "region",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createRegion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRegion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.regions.push(action.payload);
      })
      .addCase(createRegion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get All
      .addCase(getRegions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRegions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.regions = action.payload.data;
      })
      .addCase(getRegions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete
      .addCase(deleteRegion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRegion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.regions = state.regions.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteRegion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update
      .addCase(updateRegion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateRegion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.regions.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) state.regions[index] = action.payload.data;
      })
      .addCase(updateRegion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = regionSetupSlice.actions;
export default regionSetupSlice.reducer;
