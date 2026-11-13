import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import documentAccessSetupService from "./documentAccessSetupService";

const initialState = {
  documentAccessSetups: [],
  documentTypes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ✅ Create Document Access Setup
export const createDocumentAccessSetup = createAsyncThunk(
  "documentAccessSetup/create",
  async (documentAccessData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await documentAccessSetupService.createDocumentAccessSetup(
        documentAccessData,
        token
      );
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Get All Document Access Setups
export const getDocumentAccessSetups = createAsyncThunk(
  "documentAccessSetup/getAll",
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await documentAccessSetupService.getDocumentAccessSetups(token, params);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Delete Document Access Setup
export const deleteDocumentAccessSetup = createAsyncThunk(
  "documentAccessSetup/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await documentAccessSetupService.deleteDocumentAccessSetup(
        id,
        token
      );
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Update Document Access Setup
export const updateDocumentAccessSetup = createAsyncThunk(
  "documentAccessSetup/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await documentAccessSetupService.updateDocumentAccessSetup(
        id,
        newData,
        token
      );
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Get Document Types
export const getDocumentTypes = createAsyncThunk(
  "documentAccessSetup/getDocumentTypes",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await documentAccessSetupService.getDocumentTypes(token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Slice
export const documentAccessSetupSlice = createSlice({
  name: "documentAccessSetup",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createDocumentAccessSetup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDocumentAccessSetup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.documentAccessSetups.push(action.payload);
      })
      .addCase(createDocumentAccessSetup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get All
      .addCase(getDocumentAccessSetups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocumentAccessSetups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.documentAccessSetups = action.payload.data;
      })
      .addCase(getDocumentAccessSetups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete
      .addCase(deleteDocumentAccessSetup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDocumentAccessSetup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.documentAccessSetups = state.documentAccessSetups.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteDocumentAccessSetup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update
      .addCase(updateDocumentAccessSetup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDocumentAccessSetup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.documentAccessSetups.findIndex(
          (item) => item._id === action.payload.data._id
        );
        if (index !== -1)
          state.documentAccessSetups[index] = action.payload.data;
      })
      .addCase(updateDocumentAccessSetup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      }).
      // Get Document Types
      addCase(getDocumentTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDocumentTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.documentTypes = action.payload.data;
      })
      .addCase(getDocumentTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = documentAccessSetupSlice.actions;
export default documentAccessSetupSlice.reducer;
