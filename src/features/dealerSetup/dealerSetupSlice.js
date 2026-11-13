import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dealerSetupService from "./dealerSetupService";

const initialState = {
  dealers: [],
  dealersWebSys: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createDealer = createAsyncThunk(
  "dealer/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await dealerSetupService.createDealer(data, token);
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDealers = createAsyncThunk(
  "dealer/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await dealerSetupService.getDealers(token);
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDealersWebSys = createAsyncThunk(
  "web-dealer/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;

      return await dealerSetupService.getDealersWebSys(token);
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteDealer = createAsyncThunk(
  "dealer/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await dealerSetupService.deleteDealer(id, token);
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateDealer = createAsyncThunk(
  "dealer/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await dealerSetupService.updateDealer(id, newData, token);
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
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
      // Create
      .addCase(createDealer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDealer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealers.push(action.payload);
      })
      .addCase(createDealer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

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
      })
      // Get All
      .addCase(getDealersWebSys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDealersWebSys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealersWebSys = action.payload.data;
      })
      .addCase(getDealersWebSys.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete
      .addCase(deleteDealer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDealer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dealers = state.dealers.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteDealer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update
      .addCase(updateDealer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDealer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.dealers.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) state.dealers[index] = action.payload.data;
      })
      .addCase(updateDealer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = dealerSetupSlice.actions;
export default dealerSetupSlice.reducer;
