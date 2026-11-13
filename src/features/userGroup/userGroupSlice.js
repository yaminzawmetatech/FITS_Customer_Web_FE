import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userGroupService from './userGroupService'

// import Cookies from "js-cookie";
const initialState = {
  userGroups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  userGroup: {

  }
}

// Create new userGroup
export const createUserGroup = createAsyncThunk(
  'userGroup/create',
  async (userGroupData, thunkAPI) => {
    try {
      return await userGroupService.createUserGroup(userGroupData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)



// Get user UserGroup
export const getUserGroups = createAsyncThunk(
  'userGroups',
  async (_, thunkAPI) => {
    try {
      return await userGroupService.getUserGroups()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user group
export const deleteUserGroup = createAsyncThunk(
  'userGroup/delete',
  async (id, thunkAPI) => {
    try {
      return await userGroupService.deleteUserGroup(id)
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getUserGroupByUuid = createAsyncThunk(
  'userGroup/get',
  async (uuid, thunkAPI) => {
    try {
      return await userGroupService.getUserGroupByUuid(uuid)
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const updateUserGroup = createAsyncThunk(
  'userGroup/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      return await userGroupService.updateUserGroup(id, newData)
    } catch (error) {
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const batchDeleteUserGroups = createAsyncThunk(
  'userGroup/batchDelete',
  async (ids, thunkAPI) => {
    try {
      return await userGroupService.batchDeleteUserGroups(ids)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userGroupSlice = createSlice({
  name: 'userGroup',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserGroup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createUserGroup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userGroups.push(action.payload)
      })
      .addCase(createUserGroup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserGroups.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserGroups.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userGroups = action.payload.data
      })
      .addCase(getUserGroups.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteUserGroup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUserGroup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userGroups = state.userGroups.filter(
          (userGroup) => userGroup._id !== action.payload.id
        )
      })
      .addCase(deleteUserGroup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateUserGroup.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserGroup.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userGroups = action.payload.data
      })
      .addCase(updateUserGroup.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserGroupByUuid.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserGroupByUuid.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userGroups = action.payload.data
      })
      .addCase(getUserGroupByUuid.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = userGroupSlice.actions
export default userGroupSlice.reducer
