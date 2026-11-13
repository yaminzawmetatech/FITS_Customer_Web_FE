import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import applicationService from "./applicationService";
import { uniqBy } from "lodash";

const initialState = {
    applications: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const getApplication = createAsyncThunk(
    "application/getApplication",
    async ({ params, url, firstFetch = true }, thunkAPI) => {
        try {
            const response = await applicationService.getApplication(params, url);

            const {
                metadata: { info },
            } = response;

            const remainingPages = Math.ceil(
                ((+info?.total || 0) - (+info?.offset || 0)) / +info?.limit || 10
            );

            const next_page_param =
                remainingPages >= 1
                    ? {
                        ...params,
                        offset: (+info?.limit || 10) + (+info?.offset || 0),
                    }
                    : null;
            return {
                info: info,
                data: response.data,
                firstFetch,
                next_page_param,
            };
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

export const getApplicationByUUID = createAsyncThunk(
    "application/getByUUID",
    async (uuid, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.access_token;
            return await applicationService.getApplicationByUUID(uuid, token);
        }
        catch (error) {
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


export const updateApplication = createAsyncThunk(
    "application/update",
    async ({ uuid, applicationData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.access_token;
            return await applicationService.updateApplication(uuid, applicationData, token);
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

export const cancelApplication = createAsyncThunk(
    "application/cancel",
    async ({ uuid, data }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.access_token;
            return await applicationService.cancelApplication(uuid, data, token);
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

export const syncApplication = createAsyncThunk(
    "application/sync-application",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.access_token;
            return await applicationService.syncApplication(data, token);
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

// ✅ Delete multiple applications
export const deleteApplications = createAsyncThunk(
    "application/deleteApplications",
    async (ids, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.access_token;
            const response = await applicationService.deleteApplications(ids, token);
            return { ids, response };
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
            .addCase(getApplication.pending, (state) => {
                state.isLoading = true;
                state.next_page_param = null;
            })
            .addCase(getApplication.fulfilled, (state, action) => {
                state.isSuccess = true;
                const { firstFetch, data, next_page_param } = action.payload;
                if (firstFetch) {
                    state.applications = data;
                } else {
                    // state.applications = state.applications.concat(data);
                    state.applications = uniqBy(state.applications.concat(data), "id");
                }

                state.next_page_param = next_page_param;
                state.isLoading = false;
            })
            // Get by UUID
            .addCase(getApplicationByUUID.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getApplicationByUUID.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.applications = action.payload.data;
            })
            .addCase(getApplicationByUUID.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.applications = [];
            })
            // Update Application
            .addCase(updateApplication.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateApplication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.applications = action.payload.data;
            })
            .addCase(updateApplication.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Cancel Application
            .addCase(cancelApplication.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(cancelApplication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.applications = action.payload.data;
            })
            .addCase(cancelApplication.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(syncApplication.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(syncApplication.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.applications.push(action.payload);
            })
            .addCase(syncApplication.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // DELETE Applications
            .addCase(deleteApplications.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteApplications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const { ids } = action.payload;
                // Remove deleted applications from state
                state.applications = state.applications.filter(
                    (app) => !ids.includes(app.id)
                );
            })
            .addCase(deleteApplications.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = applicationSlice.actions;
export default applicationSlice.reducer;
