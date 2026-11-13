import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import applicationInformationSetupService from "./applicationInformationSetupService";
import { chain } from "lodash";

const initialState = {
  applicationInformationProperty: {
    data: [],
    isLoading: false,
  },
  applicationInformationSetupForm: {
    properties: [],
  },
  applicationInformationSetUp: {
    isLoading: false,
    isError: false,
    message: "",
    isSuccess: true,
    applicationSetup: [],
    applicationSetupList: [],
  },
};

// Get application information setup properties
export const getApplicationInformationSetupProperties = createAsyncThunk(
  "applicationInformationSetup/getApplicationInformationSetupProperties",
  async (_, thunkAPI) => {
    try {
      return await applicationInformationSetupService.getApplicationInformationSetupProperties();
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

export const getApplicationSetUpList = createAsyncThunk(
  "applicationInformationSetup/getApplicationSetupList",
  async (_, thunkAPI) => {
    try {
      return await applicationInformationSetupService.getApplicationSetupList();
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

export const createApplicationSetUp = createAsyncThunk(
  "applicationInformationSetup/create",
  async (applicationSetupData, thunkAPI) => {
    try {
      return await applicationInformationSetupService.createApplicationInformationSetup(applicationSetupData);
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

export const updateApplicationSetUp = createAsyncThunk(
  "applicationInformationSetup/update",
  async ({uuid, applicationSetupData}, thunkAPI) => {

    try {
      return await applicationInformationSetupService.updateApplicationInformationSetup(uuid, applicationSetupData);
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

export const applicationInformationSetupSlice = createSlice({
  name: "applicationInformationSetup",
  initialState,
  reducers: {
    reset: (state) => initialState,
    handleCheckedApplicationInformationPropertyData: (state, action) => {
      const item = state.applicationInformationProperty.data.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.checked = !item?.checked;
      }
    },
    handleToggleAllApplicationInformationPropertyData: (state, action) => {
      const checkedItem = state.applicationInformationProperty.data.find(
        (item) => item.checked
      );
      state.applicationInformationProperty.data =
        state.applicationInformationProperty.data.map((i) => ({
          ...i,
          checked: !!!checkedItem?.checked,
        }));
    },
    handleTransferNewApplicationInformationPropertyData: (state, action) => {
      const checkedItems = state.applicationInformationProperty.data.filter(
        (item) => item.checked
      );

      state.applicationInformationSetupForm.properties =
        state.applicationInformationSetupForm.properties.concat(
          checkedItems.map((item) => ({
            ...item,
            required: true,
          }))
        );
      state.applicationInformationProperty.data =
        state.applicationInformationProperty.data.filter(
          (item) => !item?.checked
        );
    },
    handleInitialSelectedData: (state, action) => {
      const { application_fields } = action.payload; // Assuming application_fields is the parameter you want to log

      const applicationFieldsArray = Object.values(application_fields).map(field => ({
        id: field.id,
        title: field.title,
        value: field.value,
        type: field.type,
        group: field.group,
        checked: field.checked,
        required: field.required
      }));
        
      state.applicationInformationSetupForm.properties = applicationFieldsArray;


      state.applicationInformationProperty.data = state.applicationInformationProperty.data.filter((item) => {
        // Filter out items whose id exists in applicationFieldsArray
        return !applicationFieldsArray.some(field => field.id === item.id);
      });
      
    },
    handleCheckedNewApplicationInformationPropertyData: (state, action) => {
      const item = state.applicationInformationSetupForm.properties.find(
        (item) => item.id === action.payload
      );
      if (item) {
        item.checked = !item?.checked;
      }
    },
    handleToggleNewAllApplicationInformationPropertyData: (state, action) => {
      const checkedItem = state.applicationInformationSetupForm.properties.find(
        (item) => item.checked
      );

      state.applicationInformationSetupForm.properties =
        state.applicationInformationSetupForm.properties.map((i) => ({
          ...i,
          checked: !!!checkedItem?.checked,
        }));
    },
    handleTransferApplicationInformationPropertyData: (state, action) => {
      const checkedItems =
        state.applicationInformationSetupForm.properties.filter(
          (item) => item.checked
        );
      state.applicationInformationProperty.data =
        state.applicationInformationProperty.data.concat(checkedItems);
      state.applicationInformationSetupForm.properties =
        state.applicationInformationSetupForm.properties.filter(
          (item) => !item?.checked
        );
    },
    handleToggleRequiredNewApplicationInformationPropertyData: (
      state,
      action
    ) => {
      const item = state.applicationInformationSetupForm.properties.find(
        (item) => item.id === action.payload
      );
      if (item) {
        item.required = !item?.required;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApplicationInformationSetupProperties.pending, (state) => {
        state.applicationInformationProperty.isLoading = true;
      })
      .addCase(
        getApplicationInformationSetupProperties.fulfilled,
        (state, action) => {
          state.applicationInformationProperty.isLoading = false;
          state.applicationInformationProperty.data = action.payload.data;
        }
      )
      .addCase(
        getApplicationInformationSetupProperties.rejected,
        (state, action) => {
          state.applicationInformationProperty.isLoading = false;
        }
      )
      .addCase(createApplicationSetUp.pending, (state) => {
        state.applicationInformationSetUp.isLoading = true;
      })
      .addCase(createApplicationSetUp.fulfilled, (state, action) => {
        state.applicationInformationSetUp.isLoading = false;
        state.applicationInformationSetUp.isSuccess = true;
        state.applicationInformationSetUp.applicationSetupList.push(
          action.payload
        );
      })
      .addCase(createApplicationSetUp.rejected, (state, action) => {
        state.applicationInformationSetUp.isLoading = true;
        state.applicationInformationSetUp.message = action.payload;
      })
      .addCase(updateApplicationSetUp.pending, (state) => {
        state.applicationInformationSetUp.isLoading = true;
      })
      .addCase(updateApplicationSetUp.fulfilled, (state, action) => {
        state.applicationInformationSetUp.isLoading = false;
        state.applicationInformationSetUp.isSuccess = true;
        state.applicationInformationSetUp.applicationSetupList.push(
          action.payload
        );
      })
      .addCase(updateApplicationSetUp.rejected, (state, action) => {
        state.applicationInformationSetUp.isLoading = true;
        state.applicationInformationSetUp.message = action.payload;
      })
      .addCase(getApplicationSetUpList.pending, (state) => {
        state.applicationInformationSetUp.isLoading = true;
      })
      .addCase(getApplicationSetUpList.fulfilled, (state, action) => {
        state.applicationInformationSetUp.isLoading = false;
        state.applicationInformationSetUp.isSuccess = true;
        // state.applicationInformationSetUp.applicationSetupList = state.applicationInformationSetUp.applicationSetup.filter(
        //   (applicationSetup) => applicationSetup._id !== action.payload.id
        // );
        state.applicationInformationSetUp.applicationSetup =
          action.payload.data;
      })
      .addCase(getApplicationSetUpList.rejected, (state, action) => {
        state.applicationInformationSetUp.isLoading = false;
        state.applicationInformationSetUp.isError = true;
        state.applicationInformationSetUp.message = action.payload;
      });
  },
});

export const {
  reset,
  handleCheckedApplicationInformationPropertyData,
  handleToggleAllApplicationInformationPropertyData,
  handleTransferNewApplicationInformationPropertyData,
  handleCheckedNewApplicationInformationPropertyData,
  handleToggleNewAllApplicationInformationPropertyData,
  handleTransferApplicationInformationPropertyData,
  handleToggleRequiredNewApplicationInformationPropertyData,
  handleInitialSelectedData
} = applicationInformationSetupSlice.actions;

export const selectAllApplicationInformationSetupProperties = (state) =>
  state.applicationInformationSetup.applicationInformationProperty.data;

export const selectNumberOfAllApplicationInformationSetupProperties =
  createSelector(
    [selectAllApplicationInformationSetupProperties],
    (data) => data.length
  );

export const selectNewApplicationInformationSetupProperties = (state) =>
  state.applicationInformationSetup.applicationInformationSetupForm.properties;

export const selectCheckedApplicationInformationSetupProperties =
  createSelector([selectAllApplicationInformationSetupProperties], (data) =>
    data.filter((item) => item?.checked)
  );

export const selectNumberOfCheckedApplicationInformationSetupProperties =
  createSelector(
    [selectCheckedApplicationInformationSetupProperties],
    (data) => data.length
  );

export const selectNumberOfNewAllApplicationInformationSetupProperties =
  createSelector(
    [selectNewApplicationInformationSetupProperties],
    (data) => data.length
  );

export const selectCheckedNewApplicationInformationSetupProperties =
  createSelector([selectNewApplicationInformationSetupProperties], (data) =>
    data.filter((item) => item?.checked)
  );

export const selectNumberOfCheckedNewApplicationInformationSetupProperties =
  createSelector(
    [selectCheckedNewApplicationInformationSetupProperties],
    (data) => data.length
  );

export const selectAllApplicationInformationSetupPropertiesGroupByGroup =
  createSelector([selectAllApplicationInformationSetupProperties], (data) =>
    chain(data)
      .groupBy("group")
      .map((value, key) => ({
        key: key === "undefined" || key === "null" ? "ZZZZZ" : key,
        value,
      }))
      .sortBy("key")
      .value()
  );

export const selectNewApplicationInformationSetupPropertiesGroupByGroup =
  createSelector([selectNewApplicationInformationSetupProperties], (data) =>
    chain(data)
      .groupBy("group")
      .map((value, key) => ({
        key: key === "undefined" || key === "null" ? "ZZZZZ" : key,
        value,
      }))
      .sortBy("key")
      .value()
  );

export default applicationInformationSetupSlice.reducer;
