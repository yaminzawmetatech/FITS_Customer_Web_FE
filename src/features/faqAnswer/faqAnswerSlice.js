import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import faqAnswerService from "./faqAnswerService";

const initialState = {
  faqAnswers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ✅ Create
export const createFAQAnswer = createAsyncThunk(
  "faqAnswer/create",
  async (answerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await faqAnswerService.createFAQAnswer(answerData, token);
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
export const getFAQAnswers = createAsyncThunk(
  "faqAnswer/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await faqAnswerService.getFAQAnswers(token);
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
export const deleteFAQAnswer = createAsyncThunk(
  "faqAnswer/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await faqAnswerService.deleteFAQAnswer(id, token);
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
export const updateFAQAnswer = createAsyncThunk(
  "faqAnswer/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await faqAnswerService.updateFAQAnswer(id, newData, token);
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
export const faqAnswerSlice = createSlice({
  name: "faqAnswer",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createFAQAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFAQAnswer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.faqAnswers.push(action.payload);
      })
      .addCase(createFAQAnswer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get All
      .addCase(getFAQAnswers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFAQAnswers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.faqAnswers = action.payload.data;
      })
      .addCase(getFAQAnswers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete
      .addCase(deleteFAQAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFAQAnswer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.faqAnswers = state.faqAnswers.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteFAQAnswer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update
      .addCase(updateFAQAnswer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFAQAnswer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.faqAnswers.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) state.faqAnswers[index] = action.payload.data;
      })
      .addCase(updateFAQAnswer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = faqAnswerSlice.actions;
export default faqAnswerSlice.reducer;
