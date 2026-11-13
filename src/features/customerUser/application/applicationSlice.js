import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import applicationService from "./applicationService";

const initialState = {
    application: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const createApplication = createAsyncThunk(
    "application/create",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.access_token;
            return await applicationService.createApplication(data, token);
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
export const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            // Create
            .addCase(createApplication.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createApplication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.application.push(action.payload);
            })
            .addCase(createApplication.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { reset } = applicationSlice.actions;
export default applicationSlice.reducer;
