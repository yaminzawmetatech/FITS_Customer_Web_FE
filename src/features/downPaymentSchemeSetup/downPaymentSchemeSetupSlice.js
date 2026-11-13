import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import downPaymentSchemeSetupService from './downPaymentSchemeSetupService'
// import Cookies from "js-cookie";
const initialState = {
  downPaymentSetups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',

}

// Create new downpayment
export const createDownPayments = createAsyncThunk(
  'downPaymentSetups/create',
  async (downPaymentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await downPaymentSchemeSetupService.createDownPayments(downPaymentData, token)
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

// Get user downpayments
export const getDownPayment = createAsyncThunk(
  'downPaymentSetups',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await downPaymentSchemeSetupService.getDownPayment(token)
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

export const getDownPaymentWithParams = createAsyncThunk(
  'downPaymentSetups/withParams',
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await downPaymentSchemeSetupService.getDownPaymentWithParams(params, token)
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

// Delete user downpayment
export const deleteDownPayment = createAsyncThunk(
  'downPaymentSetups/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await downPaymentSchemeSetupService.deleteDownPayment(id, token)
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

export const updateDownPayment = createAsyncThunk(
  'downPaymentSetups/update',
  async ({ id,newData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await downPaymentSchemeSetupService.updateDownPayment(id, newData, token)
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

export const downPaymentSlice = createSlice({
  name: 'downPaymentSetups',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDownPayments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createDownPayments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.downPaymentSetups.push(action.payload)
      })
      .addCase(createDownPayments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getDownPayment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDownPayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.downPaymentSetups = action.payload.data
      })
      .addCase(getDownPayment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteDownPayment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteDownPayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // state.downPaymentSetups = state.downPayments.filter(
        //   (downpayment) => downpayment._id !== action.payload.id
        // )
      })
      .addCase(deleteDownPayment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateDownPayment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateDownPayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.downPaymentSetups = action.payload.data
        // state.downpayments = state.downpayments.filter(
        //   (department) => department._id !== action.payload.id
        // )
      })
      .addCase(updateDownPayment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getDownPaymentWithParams.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDownPaymentWithParams.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.downPaymentSetups = action.payload.data
      })
      .addCase(getDownPaymentWithParams.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = downPaymentSlice.actions
export default downPaymentSlice.reducer
