import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import applicationInfrmationSetupListService from './ApplicationInformationSetupListService'
import { toast } from "react-toastify";
// import Cookies from "js-cookie";
const initialState = {
  applicationInformationSetupList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get application setup list
export const getApplicationSetupList = createAsyncThunk(
  'applicationSetupList',
  async (_, thunkAPI) => {
    try {
      return await applicationInfrmationSetupListService.getApplicationSetupList()
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

export const applicationSetupListSlice = createSlice({
  name: 'applicationSetupList',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationSetupList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getApplicationSetupList.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.applicationInformationSetupList = action.payload.data
      })
      .addCase(getApplicationSetupList.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = applicationSetupListSlice.actions
export default applicationSetupListSlice.reducer
