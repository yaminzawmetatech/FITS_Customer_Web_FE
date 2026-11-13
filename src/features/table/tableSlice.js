import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tableService from "./tableService";

const initialState = {
  table: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createTable = createAsyncThunk(
  "table/create",
  async (tableData, thunkAPI) => {
    try {
      return await tableService.createTable(tableData);
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

export const getTable = createAsyncThunk("table", async (_, thunkAPI) => {
  try {
    return await tableService.getTable();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTable = createAsyncThunk(
  "table/delete",
  async (id, thunkAPI) => {
    try {
      return await tableService.deleteTable(id);
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

export const updateTable = createAsyncThunk(
  "table/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await tableService.updateTable(id, newData);
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

export const batchDeletetable = createAsyncThunk(
  "table/batchDelete",
  async (ids, thunkAPI) => {
    try {
      return await tableService.batchDeleteTable(ids);
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

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.table.push(action.payload);
      })
      .addCase(createTable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.table = action.payload.data;
      })
      .addCase(getTable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.table = state.table.filter(
          (table) => table._id !== action.payload.id
        );
      })
      .addCase(deleteTable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.table = action.payload.data;
      })
      .addCase(updateTable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tableSlice.actions;
export default tableSlice.reducer;
