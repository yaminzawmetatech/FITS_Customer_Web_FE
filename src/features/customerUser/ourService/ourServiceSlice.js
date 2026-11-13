import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ourService from "./ourServiceService";

const initialState = {
  ourServices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ✅ Create
export const createOurService = createAsyncThunk(
  "ourService/create",
  async (itemData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await ourService.createOurService(itemData, token);
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
export const getOurServices = createAsyncThunk(
  "ourService/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await ourService.getOurServices(token);
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
export const deleteOurService = createAsyncThunk(
  "ourService/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await ourService.deleteOurService(id, token);
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
export const updateOurService = createAsyncThunk(
  "ourService/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await ourService.updateOurService(id, newData, token);
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
export const ourServiceSlice = createSlice({
  name: "ourService",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createOurService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOurService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ourServices.push(action.payload);
      })
      .addCase(createOurService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get All
      .addCase(getOurServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOurServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ourServices = action.payload.data;
      })
      .addCase(getOurServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete
      .addCase(deleteOurService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOurService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ourServices = state.ourServices.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteOurService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update
      .addCase(updateOurService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOurService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Replace the updated item in the array
        const index = state.ourServices.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) state.ourServices[index] = action.payload.data;
      })
      .addCase(updateOurService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ourServiceSlice.actions;
export default ourServiceSlice.reducer;
