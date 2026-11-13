import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vehicleService from "./vehicleSetupService";


const initialState = {
  vehicles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  webVehicles: [],
  webVehicleBrands: [],
  vehicleModal: [],
};

// ✅ Create vehicle
export const createVehicle = createAsyncThunk(
  "vehicle/create",
  async (data, thunkAPI) => {
    try {
      return await vehicleService.createVehicle(data);
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

// ✅ Get all vehicles
export const getVehicles = createAsyncThunk(
  "vehicles/get",
  async (params, thunkAPI) => {
    try {
      return await vehicleService.getVehicles(params);
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


// ✅ Delete vehicle
export const deleteVehicle = createAsyncThunk(
  "vehicle/delete",
  async (id, thunkAPI) => {
    try {
      return await vehicleService.deleteVehicle(id);
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

// ✅ Update vehicle
export const updateVehicle = createAsyncThunk(
  "vehicle/update",
  async ({ id, newData }, thunkAPI) => {
    try {
      return await vehicleService.updateVehicle(id, newData);
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

// ✅ Get web vehicles with params
export const getWebVehicle = createAsyncThunk(
  "get-web-vehicles",
  async (params, thunkAPI) => {
    try {
      return await vehicleService.getWebVehicle(params);
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

// ✅ Get web vehicle brands with params
export const getWebVehicleBrand = createAsyncThunk(
  "web/vehicle-brands",
  async (params, thunkAPI) => {
    try {
      return await vehicleService.getWebVehicleBrand(params);
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

// ✅ Get vehicles for modal with params
export const getVehiclesModal = createAsyncThunk(
  "get-vehicles-modal",
  async (params, thunkAPI) => {
    try {
      return await vehicleService.getVehiclesModal(params);
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

export const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicles.push(action.payload);
      })
      .addCase(createVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get
      .addCase(getVehicles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehicles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicles = action.payload.data;
      })
      .addCase(getVehicles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete
      .addCase(deleteVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicles = state.vehicles.filter(
          (vehicle) => vehicle._id !== action.payload.id
        );
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update
      .addCase(updateVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicles = action.payload.data;
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Web Vehicles
      .addCase(getWebVehicle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWebVehicle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.webVehicles = action.payload.data;
      })
      .addCase(getWebVehicle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //Web Vehicle Brands
      .addCase(getWebVehicleBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWebVehicleBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // you might want to store brands separately, but here I keep in `vehicles` for consistency
        state.webVehicleBrands = action.payload.data;
      })
      .addCase(getWebVehicleBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Vehicles Modal
      .addCase(getVehiclesModal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVehiclesModal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vehicleModal = action.payload.data;
      })
      .addCase(getVehiclesModal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });

  },
});

export const { reset } = vehicleSlice.actions;
export default vehicleSlice.reducer;
