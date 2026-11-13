import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import {
  createApplicationSetUp,
  getApplicationInformationSetupProperties,
  handleToggleAllApplicationInformationPropertyData,
  handleToggleNewAllApplicationInformationPropertyData,
  handleTransferApplicationInformationPropertyData,
  handleTransferNewApplicationInformationPropertyData,
  reset,
  selectAllApplicationInformationSetupPropertiesGroupByGroup,
  selectNewApplicationInformationSetupPropertiesGroupByGroup,
  selectNumberOfAllApplicationInformationSetupProperties,
  selectNumberOfCheckedApplicationInformationSetupProperties,
  selectNumberOfCheckedNewApplicationInformationSetupProperties,
  selectNumberOfNewAllApplicationInformationSetupProperties,
  updateApplicationSetUp,
} from "../../features/applicationInformationSetup/applicationInformationSetupSlice";
import {
  Box,
  Breadcrumbs,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import RightApplicationSetupPropertyItem from "./components/RightApplicationSetupPropertyItem";
import LeftApplicationSetupPropertyItem from "./components/LeftApplicationSetupPropertyItem";
import { getProjectCategory } from "../../features/projectcategory/projectcategorySlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getApplicationSetupList } from "../../features/ApplicationInformationSetupList/ApplicationInformationSetupSlice";
import { handleInitialSelectedData } from "../../features/applicationInformationSetup/applicationInformationSetupSlice";
import { useParams } from "react-router-dom";
import CommonMessage from "../../common/CommonMessage";
import { showSuccessToast } from "../../common/ToastMessage";

export default function CreateApplicationInformationSetup() {
  const initialValues = {
    category_id: "",
    name: "",
    description: "",
  };

  const [open, setOpen] = useState(false);

  const properties = useSelector(
    (state) =>
      state.applicationInformationSetup.applicationInformationSetupForm
        .properties
  );

  const { projectCategories, isLoading } = useSelector(
    (state) => state.projectCategories
  );


  const handleClickOpen = () => {
    setValues({ ...values, application_fields: properties });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const [errorList, setErrorList] = useState({}); // for store validation message list

  const applicationInformationSetupPropertiesGroupByGroup = useSelector(
    selectAllApplicationInformationSetupPropertiesGroupByGroup
  );

  const numberOfAllApplicationInformationSetupProperties = useSelector(
    selectNumberOfAllApplicationInformationSetupProperties
  );
  const numberOfCheckedApplicationInformationSetupProperties = useSelector(
    selectNumberOfCheckedApplicationInformationSetupProperties
  );

  const newApplicationInformationSetupPropertiesGroupByGroup = useSelector(
    selectNewApplicationInformationSetupPropertiesGroupByGroup
  );
  const numberOfNewAllApplicationInformationSetupProperties = useSelector(
    selectNumberOfNewAllApplicationInformationSetupProperties
  );
  const numberOfCheckedNewApplicationInformationSetupProperties = useSelector(
    selectNumberOfCheckedNewApplicationInformationSetupProperties
  );

  const { applicationInformationSetupList } = useSelector(
    (state) => state.applicationInformationSetupList
  );

  const { uuid } = useParams();

  const [values, setValues] = useState({
    name: "",
    category_id: "",
    application_fields: [],
  });

  useEffect(() => {
    dispatch(getApplicationInformationSetupProperties());
    dispatch(getProjectCategory());
    dispatch(getApplicationSetupList());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    const applicationInformationByUuid = applicationInformationSetupList.find(
      (item) => item.uuid === uuid
    );

    if (
      applicationInformationByUuid &&
      applicationInformationSetupPropertiesGroupByGroup
    ) {
      dispatch(handleInitialSelectedData(applicationInformationByUuid)); // initial selected data in edit stage

      setValues({
        ...values,
        category_id: applicationInformationByUuid.category_id,
        name: applicationInformationByUuid.name,
        description: applicationInformationByUuid.description,
      }); // data auto bind in edit stage

    }
  }, [applicationInformationSetupList, uuid, dispatch]);

  const handleSubmit = async () => {
    try {
      if (uuid) {
        // Update existing setup
        await dispatch(
          updateApplicationSetUp({ uuid: uuid, applicationSetupData: values })
        ).unwrap(); // unwrap ensures proper error handling
        showSuccessToast(
          CommonMessage.MFS00003.replace("%s", "Application Information Setup")
        );
        
      } else {
        // Create new setup
        await dispatch(createApplicationSetUp(values)).unwrap();
        showSuccessToast(
          CommonMessage.MFS00001.replace("%s", "Application Information Setup")
        );
      }

      // Reset form and reload data
      await dispatch(reset());
      await dispatch(getApplicationInformationSetupProperties()).unwrap();

      setOpen(false);
    } catch (error) {
      console.error("Error in submitting application setup:", error);
      // Optionally show error toast
      // showErrorToast("Failed to submit Application Information Setup");
    } finally {
      window.location.reload();
    }
  };



  const validationSchema = Yup.object().shape({
    category_id: Yup.string().required(
      CommonMessage.MFE00001.replace("%s", "Product Category")
    ),
    name: Yup.string().required(CommonMessage.MFE00002.replace("%s", "name")),
    description: Yup.string().max(
      255,
      CommonMessage.MFE00003.replace("%s", "Description").replace("%s", "255")
    ).nullable(),
  });

  // change to initial stage
  const changeInitial = () => {
    setValues({});
    setErrorList({});
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">
          Application Information Setup
        </Typography>
      </Breadcrumbs>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs>
          <Card>
            <CardHeader
              sx={{ px: 2, py: 1 }}
              avatar={
                <Checkbox
                  onClick={() => {
                    dispatch(
                      handleToggleAllApplicationInformationPropertyData()
                    );
                  }}
                  checked={
                    numberOfCheckedApplicationInformationSetupProperties ===
                    numberOfAllApplicationInformationSetupProperties &&
                    numberOfCheckedApplicationInformationSetupProperties !== 0
                  }
                  indeterminate={
                    numberOfCheckedApplicationInformationSetupProperties !==
                    numberOfAllApplicationInformationSetupProperties &&
                    numberOfCheckedApplicationInformationSetupProperties !== 0
                  }
                  disabled={
                    numberOfAllApplicationInformationSetupProperties === 0
                  }
                  inputProps={{
                    "aria-label": "all items selected",
                  }}
                />
              }
              title="Choices"
              subheader={`${numberOfCheckedApplicationInformationSetupProperties}/${numberOfAllApplicationInformationSetupProperties} selected`}
            />
            <Divider />
            <List
              sx={{
                height: "calc(100vh - 245px)",
                bgcolor: "background.paper",
                overflow: "auto",
              }}
              dense
              component="div"
              role="list"
            >
              {applicationInformationSetupPropertiesGroupByGroup.map(
                ({ key, value }) => (
                  <Fragment key={key}>
                    <Box
                      sx={{
                        backgroundColor: "#F0F0F0",
                        padding: "5px 16px",
                      }}
                    >
                      {key === "ZZZZZ" ? "Other" : key}
                    </Box>
                    {value.map((property) => (
                      <LeftApplicationSetupPropertyItem
                        key={property.id}
                        property={property}
                      />
                    ))}
                  </Fragment>
                )
              )}
            </List>
          </Card>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={() => {
                dispatch(handleTransferNewApplicationInformationPropertyData());
              }}
              disabled={
                numberOfCheckedApplicationInformationSetupProperties === 0
              }
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={() => {
                dispatch(handleTransferApplicationInformationPropertyData());
              }}
              disabled={
                numberOfCheckedNewApplicationInformationSetupProperties === 0
              }
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item xs>
          <Card>
            <CardHeader
              sx={{ px: 2, py: 1 }}
              avatar={
                <Checkbox
                  onClick={() => {
                    dispatch(
                      handleToggleNewAllApplicationInformationPropertyData()
                    );
                  }}
                  checked={
                    numberOfCheckedNewApplicationInformationSetupProperties ===
                    numberOfNewAllApplicationInformationSetupProperties &&
                    numberOfCheckedNewApplicationInformationSetupProperties !==
                    0
                  }
                  indeterminate={
                    numberOfNewAllApplicationInformationSetupProperties !==
                    numberOfCheckedNewApplicationInformationSetupProperties &&
                    numberOfCheckedNewApplicationInformationSetupProperties !==
                    0
                  }
                  disabled={
                    numberOfNewAllApplicationInformationSetupProperties === 0
                  }
                  inputProps={{
                    "aria-label": "all items selected",
                  }}
                />
              }
              title="Choices"
              subheader={`${numberOfCheckedNewApplicationInformationSetupProperties}/${numberOfNewAllApplicationInformationSetupProperties} selected`}
            />
            <Divider />
            <List
              sx={{
                height: "calc(100vh - 245px)",
                bgcolor: "background.paper",
                overflow: "auto",
              }}
              dense
              component="div"
              role="list"
            >
              {newApplicationInformationSetupPropertiesGroupByGroup.map(
                ({ key, value }) => (
                  <Fragment key={key}>
                    <Box
                      sx={{
                        backgroundColor: "#F0F0F0",
                        padding: "5px 16px",
                      }}
                    >
                      {key === "ZZZZZ" ? "Other" : key}
                    </Box>
                    {value.map((property) => (
                      <RightApplicationSetupPropertyItem
                        key={property.id}
                        property={property}
                      />
                    ))}
                  </Fragment>
                )
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
      <Grid
        sx={{ marginTop: "10px" }}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button onClick={handleClickOpen} variant="contained">
          {uuid ? "Edit" : "Create New"}
        </Button>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle textAlign="center">
          {uuid ? "Edit Application Setup" : "Create New Application Setup"}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={uuid ? values : initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, handleChange }) => (
              <Form>
                <Autocomplete
                  disablePortal
                  id="category_id"
                  name="category_id"
                  options={projectCategories}
                  getOptionLabel={(option) => option.name_en}
                  sx={{ my: 3 }}
                  value={projectCategories.find(
                    (option) => option.id === values.category_id ?? null
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={
                        <span className="required">{"Product Category"}</span>
                      }
                      size="small"
                    />
                  )}
                  onChange={(e, value, reason) => {
                    setFieldValue("category_id", value?.id || "");
                    setValues({ ...values, category_id: value?.id });
                  }}
                />
                <ErrorMessage
                  name="category_id"
                  component="div"
                  className="error-message"
                />
                {errorList["category_id"] &&
                  errorList["category_id"].map((errorMessage, index) => (
                    <div key={index} className="error-message">
                      {errorMessage}
                    </div>
                  ))}

                <Stack
                  sx={{
                    width: "100%",
                    minWidth: { xs: "300px", sm: "360px", md: "400px" },
                    gap: "1.5rem",
                    mt: 1,
                  }}
                >
                  <TextField
                    label={<span className="required">{"Name"}</span>}
                    name="name"
                    value={values.name ?? ""}
                    onChange={(e) => {
                      setValues({ ...values, [e.target.name]: e.target.value });
                      handleChange(e);
                    }}
                    size="small"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message"
                  />
                  {errorList["name"] &&
                    errorList["name"].map((errorMessage, index) => (
                      <div key={index} className="error-message">
                        {errorMessage}
                      </div>
                    ))}
                  <TextField
                    label={"Description"}
                    name="description"
                    value={values.description ?? ""}
                    onChange={(e) => {
                      setValues({ ...values, [e.target.name]: e.target.value });
                      handleChange(e);
                    }}
                    sx={{
                      pt: 1,
                      textarea: {
                        minHeight: "200px",
                        maxHeight: "200px",
                        overflow: "auto !important",
                      },
                    }}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error-message"
                  />
                  {errorList["description"] &&
                    errorList["description"].map((errorMessage, index) => (
                      <div key={index} className="error-message">
                        {errorMessage}
                      </div>
                    ))}
                </Stack>
                <DialogActions sx={{ p: "1.25rem" }}>
                  <Button
                    onClick={() => {
                      if (uuid) {
                        handleClose();
                      } else {
                        handleClose();
                        changeInitial();
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                  >
                    {uuid ? "Update" : "Save"}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
