import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import applyLoanStepService from "./applyLoanStepService";

const initialState = {
  applyLoanSteps: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ✅ Create
export const createApplyLoanStep = createAsyncThunk(
  "applyLoanSteps/create",
  async (loanStepData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await applyLoanStepService.createApplyLoanStep(loanStepData, token);
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
export const getApplyLoanSteps = createAsyncThunk(
  "applyLoanSteps/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await applyLoanStepService.getApplyLoanSteps(token);
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
export const deleteApplyLoanStep = createAsyncThunk(
  "applyLoanSteps/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await applyLoanStepService.deleteApplyLoanStep(id, token);
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
export const updateApplyLoanStep = createAsyncThunk(
  "applyLoanSteps/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await applyLoanStepService.updateApplyLoanStep(id, newData, token);
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

// ✅ Batch Delete
export const batchDeleteApplyLoanSteps = createAsyncThunk(
  "applyLoanSteps/batchDelete",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await applyLoanStepService.batchDeleteApplyLoanSteps(ids, token);
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
export const applyLoanStepSlice = createSlice({
  name: "applyLoanSteps",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createApplyLoanStep.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApplyLoanStep.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applyLoanSteps.push(action.payload);
      })
      .addCase(createApplyLoanStep.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get All
      .addCase(getApplyLoanSteps.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplyLoanSteps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applyLoanSteps = action.payload.data;
      })
      .addCase(getApplyLoanSteps.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete
      .addCase(deleteApplyLoanStep.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApplyLoanStep.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applyLoanSteps = state.applyLoanSteps.filter(
          (loanStep) => loanStep._id !== action.payload.id
        );
      })
      .addCase(deleteApplyLoanStep.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update
      .addCase(updateApplyLoanStep.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApplyLoanStep.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applyLoanSteps = action.payload.data;
      })
      .addCase(updateApplyLoanStep.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Batch Delete
      .addCase(batchDeleteApplyLoanSteps.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(batchDeleteApplyLoanSteps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.applyLoanSteps = state.applyLoanSteps.filter(
          (loanStep) => !action.payload.ids.includes(loanStep._id)
        );
      })
      .addCase(batchDeleteApplyLoanSteps.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = applyLoanStepSlice.actions;
export default applyLoanStepSlice.reducer;
