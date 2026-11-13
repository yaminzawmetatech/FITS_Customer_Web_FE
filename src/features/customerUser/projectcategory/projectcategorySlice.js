import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectcategoryService from "./projectcategoryService";

const initialState = {
  projectCategories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createProjectCategory = createAsyncThunk(
  "projectcategory/create",
  async (projectcategoryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await projectcategoryService.createProjectCategory(
        projectcategoryData,
        token
      );
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

export const getProjectCategory = createAsyncThunk(
  "projectCategories",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await projectcategoryService.getProjectCategory(token);
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

export const deleteProjectCategory = createAsyncThunk(
  "projectcategory/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await projectcategoryService.deleteProjectCategory(id, token);
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

export const updateProjectCategory = createAsyncThunk(
  "projectcategory/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await projectcategoryService.updateProjectCategory(
        id,
        newData,
        token
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

//Get MOB Category
export const getMobCategory = createAsyncThunk(
  "mobProjectCategories",
  async (_, thunkAPI) => {
    try {
      return await projectcategoryService.getMobCategories();
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

export const batchDeleteProjectCategory = createAsyncThunk(
  "projectcategory/batchDelete",
  async (ids, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await projectcategoryService.batchDeleteProjectCategory(
        ids,
        token
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

export const projectcategorySlice = createSlice({
  name: "projectCategories",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProjectCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProjectCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectCategories.push(action.payload);
      })
      .addCase(createProjectCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProjectCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectCategories = action.payload.data;
      })
      .addCase(getProjectCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProjectCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProjectCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectCategories = state.projectCategories.filter(
          (projectcategory) => projectcategory._id !== action.payload.id
        );
      })
      .addCase(deleteProjectCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProjectCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProjectCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectCategories = action.payload.data;
      })
      .addCase(updateProjectCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMobCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMobCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectCategories = action.payload.data;
      })
      .addCase(getMobCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });;
  },
});

export const { reset } = projectcategorySlice.actions;
export default projectcategorySlice.reducer;
