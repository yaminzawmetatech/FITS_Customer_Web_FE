import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerVoiceService from "./customerVoiceService";

const initialState = {
  customerVoices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createCustomerVoice = createAsyncThunk(
  "customer-voice/create",
  async (data, thunkAPI) => {
    try {
      return await customerVoiceService.createCustomerVoice(data);
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

export const getCustomerVoices = createAsyncThunk(
  "customer-voices/get",
  async (_, thunkAPI) => {
    try {
      return await customerVoiceService.getCustomerVoices();
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

export const deleteCustomerVoice = createAsyncThunk(
  "customer-voice/delete",
  async (id, thunkAPI) => {
    try {
      return await customerVoiceService.deleteCustomerVoice(id);
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

export const updateCustomerVoice = createAsyncThunk(
  "customer-voice/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await customerVoiceService.updateCustomerVoice(
        id,
        newData,
      );
    } catch (error) {
      console.log(error);
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

export const customerVoiceSlice = createSlice({
  name: "customerVoices",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomerVoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCustomerVoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customerVoices.push(action.payload);
      })
      .addCase(createCustomerVoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCustomerVoices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomerVoices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customerVoices = action.payload.data;
      })
      .addCase(getCustomerVoices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCustomerVoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCustomerVoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customerVoices = state.customerVoices.filter(
          (projectcategory) => projectcategory._id !== action.payload.id
        );
      })
      .addCase(deleteCustomerVoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCustomerVoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomerVoice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customerVoices = action.payload.data;
      })
      .addCase(updateCustomerVoice.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = customerVoiceSlice.actions;
export default customerVoiceSlice.reducer;
