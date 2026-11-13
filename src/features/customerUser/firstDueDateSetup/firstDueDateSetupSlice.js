import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firstDueDateSetupService from "./firstDueDateSetupService";

const initialState = {
  firstDueDateSetups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createFirstDueDateSetup = createAsyncThunk(
  "firstduedatesetup/create",
  async (firstDueDateSetupData, thunkAPI) => {
    try {
      return await firstDueDateSetupService.createFirstDueDateSetup(firstDueDateSetupData);
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

export const getFirstDueDateSetup = createAsyncThunk(
  "firstduedatesetup",
  async (_, thunkAPI) => {
    try {
      return await firstDueDateSetupService.getFirstDueDateSetup();
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

export const getFirstDueDateSetupWithParams = createAsyncThunk(
  "firstduedatesetup/withParams",
  async (params, thunkAPI) => {
    try {
      return await firstDueDateSetupService.getFirstDueDateSetupWithParams(params);
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

export const deleteFirstDueDateSetup = createAsyncThunk(
  "firstduedatesetup/delete",
  async (id, thunkAPI) => {
    try {
      return await firstDueDateSetupService.deleteFirstDueDateSetup(id);
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

export const updateFirstDueDateSetup = createAsyncThunk(
  "firstduedatesetup/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await firstDueDateSetupService.updateFirstDueDateSetup(id, newData);
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

export const batchDeleteFirstDueDateSetup = createAsyncThunk(
  "firstduedatesetup/batchDelete",
  async (ids, thunkAPI) => {
    try {
      return await firstDueDateSetupService.batchDeleteFirstDueDateSetup(ids);
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

export const firstDueDateSetupSlice = createSlice({
  name: "firstDueDateSetups",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFirstDueDateSetup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFirstDueDateSetup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.firstDueDateSetups.push(action.payload);
      })
      .addCase(createFirstDueDateSetup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFirstDueDateSetup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFirstDueDateSetup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.firstDueDateSetups = action.payload.data;
      })
      .addCase(getFirstDueDateSetup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFirstDueDateSetup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFirstDueDateSetup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.firstDueDateSetups = state.firstDueDateSetups.filter(
          (firstDueDateSetup) => firstDueDateSetup._id !== action.payload.id
        );
      })
      .addCase(deleteFirstDueDateSetup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateFirstDueDateSetup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFirstDueDateSetup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.firstDueDateSetups = action.payload.data;
      })
      .addCase(updateFirstDueDateSetup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFirstDueDateSetupWithParams.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFirstDueDateSetupWithParams.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.firstDueDateSetups = action.payload.data;
      })
      .addCase(getFirstDueDateSetupWithParams.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = firstDueDateSetupSlice.actions;
export default firstDueDateSetupSlice.reducer;
