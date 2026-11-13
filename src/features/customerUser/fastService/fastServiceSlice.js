import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fastService from "./fastService";

const initialState = {
  fastServices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ✅ Create
export const createFastService = createAsyncThunk(
  "fastService/create",
  async (serviceData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await fastService.createFastService(serviceData, token);
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

// ✅ Get All
export const getFastServices = createAsyncThunk(
  "fastService/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await fastService.getFastServices(token);
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

// ✅ Delete
export const deleteFastService = createAsyncThunk(
  "fastService/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await fastService.deleteFastService(id, token);
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

// ✅ Update
export const updateFastService = createAsyncThunk(
  "fastService/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await fastService.updateFastService(id, newData, token);
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

// ✅ Slice
export const fastServiceSlice = createSlice({
  name: "fastService",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createFastService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFastService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fastServices.push(action.payload);
      })
      .addCase(createFastService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get All
      .addCase(getFastServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFastServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fastServices = action.payload.data;
      })
      .addCase(getFastServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete
      .addCase(deleteFastService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFastService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fastServices = state.fastServices.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteFastService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update
      .addCase(updateFastService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFastService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Replace the updated item in the array
        const index = state.fastServices.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) state.fastServices[index] = action.payload.data;
      })
      .addCase(updateFastService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = fastServiceSlice.actions;
export default fastServiceSlice.reducer;
