import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import faqQuestionService from "./faqQuestionService";

const initialState = {
  faqQuestions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ✅ Create
export const createFAQQuestion = createAsyncThunk(
  "faqQuestion/create",
  async (questionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await faqQuestionService.createFAQQuestion(questionData, token);
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
export const getFAQQuestions = createAsyncThunk(
  "faqQuestion/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await faqQuestionService.getFAQQuestions(token);
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
export const deleteFAQQuestion = createAsyncThunk(
  "faqQuestion/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await faqQuestionService.deleteFAQQuestion(id, token);
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
export const updateFAQQuestion = createAsyncThunk(
  "faqQuestion/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await faqQuestionService.updateFAQQuestion(id, newData, token);
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
export const faqQuestionSlice = createSlice({
  name: "faqQuestion",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createFAQQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFAQQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.faqQuestions.push(action.payload);
      })
      .addCase(createFAQQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get All
      .addCase(getFAQQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFAQQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.faqQuestions = action.payload.data;
      })
      .addCase(getFAQQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete
      .addCase(deleteFAQQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFAQQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.faqQuestions = state.faqQuestions.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteFAQQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update
      .addCase(updateFAQQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFAQQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.faqQuestions.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1) state.faqQuestions[index] = action.payload.data;
      })
      .addCase(updateFAQQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = faqQuestionSlice.actions;
export default faqQuestionSlice.reducer;
