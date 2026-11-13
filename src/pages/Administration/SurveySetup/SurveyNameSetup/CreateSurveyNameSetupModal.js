import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";
import { getContactTypes } from "features/contactType/contactTypeSlice";
import { getsurveyTypes } from "features/surveyType/surveyTypeSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CommonMessage from "common/CommonMessage";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  createSurveyHeader,
  getSurveyHeaders,
} from "features/surveyNameSetup/surveyNameSetupSlice";

export const CreateSurveyNameSetupModal = ({
  open,
  columns,
  onClose,
  handleSuccessMessage,
}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );
  const [errorList, setErrorList] = useState({}); // for store validation message list

  const initialValues = {
    category_id: "",
    description: "",
    survey_type: "",
    contact_type: "",
    survey_header_code: "",
  }; // define initial value

  const { projectCategories, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.projectCategories);

  const {
    contactTypes,
    isContactLoading,
    isContactSuccess,
    isContactError,
    contactMessage,
  } = useSelector((state) => state.contactTypes);

  const {
    surveyTypes,
    isSurveyLoading,
    isSurveySuccess,
    isSurveyError,
    surveyMessage,
  } = useSelector((state) => state.surveyTypes);

  useEffect(() => {
    dispatch(getProjectCategory());
    dispatch(getContactTypes());
    dispatch(getsurveyTypes());
  }, []);

  // click submit button to create Survey Name
  const handleSubmit = async () => {
    try {
      // call create Survey Name api
      const responseData = await dispatch(createSurveyHeader(values));
      if (responseData) {
        if (responseData.payload && responseData.payload.success === true) {
          onClose();
          changeInitial();
          handleSuccessMessage(
            CommonMessage.MFS00001.replace("%s", "Survey Name")
          );
        } else if (
          responseData.error &&
          responseData.error.message === "Rejected"
        ) {
          if (typeof responseData.payload === "string") {
            onClose();
            changeInitial();
            toast.error(responseData.payload, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else {
            setErrorList(responseData.payload);
          }
        }
      }
      await dispatch(getSurveyHeaders());
    } catch (error) {
      toast.error(
        CommonMessage.MFE00009.replace("%s", "creating Survey Name"),
        {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  const changeInitial = () => {
    setValues({});
    setErrorList({});
  };

  // check validation
  const validationSchema = Yup.object().shape({
    category_id: Yup.string().required(
      CommonMessage.MFE00001.replace("%s", "Category")
    ),
    description: Yup.string()
    .min(
      2,
      CommonMessage.MFE00013.replace("%s", "Description").replace("%s", "2")
    ).max(
      255,
      CommonMessage.MFE00003.replace("%s", "Description").replace("%s", "255")
    ),
    survey_type: Yup.string().required(
      CommonMessage.MFE00001.replace("%s", "Survey Type")
    ),
    contact_type: Yup.string().required(
      CommonMessage.MFE00001.replace("%s", "Contact Type")
    ),
    survey_header_code: Yup.string()
      .required(CommonMessage.MFE00002.replace("%s", "Survey Code"))
      .min(
        2,
        CommonMessage.MFE00013.replace("%s", "Survey Code").replace("%s", "2")
      ),
  });

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Survey Name</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, handleChange }) => (
            <Form>
              <Stack
                sx={{
                  width: "100%",
                  minWidth: { xs: "300px", sm: "360px", md: "400px" },
                  gap: "1.5rem",
                  mt: 1,
                }}
              >
                {columns.map(
                  (column) =>
                    (column.accessorKey === "survey_header_code" ||
                      column.accessorKey === "description") && (
                      <React.Fragment  key={column.accessorKey}>
                        <TextField
                          key={column.accessorKey}
                          label={
                            column.accessorKey !== "description" ? (
                              <span className="required">{`${column.header}`}</span>
                            ) : (
                              column.header
                            )
                          }
                          name={column.accessorKey}
                          onChange={(e) => {
                            handleChange(e);
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        />
                        <ErrorMessage
                          name={column.accessorKey}
                          component="div"
                          className="error-message"
                        />
                        {errorList[column.accessorKey] &&
                          errorList[column.accessorKey].map(
                            (errorMessage, index) => (
                              <div key={index} className="error-message">
                                {errorMessage}
                              </div>
                            )
                          )}
                      </React.Fragment>
                    )
                )}
              </Stack>
              <Autocomplete
                disablePortal
                id="contact_type"
                name="contact_type"
                options={contactTypes}
                getOptionLabel={(option) => option.value}
                sx={{ my: 3 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={<span className="required">{"Contact Type"}</span>}
                  />
                )}
                onChange={(e, value, reason) => {
                  setFieldValue("contact_type", value?.key || "");
                  setValues({ ...values, contact_type: value?.key });
                }}
              />
              <ErrorMessage
                name="contact_type"
                component="div"
                className="error-message margin-top-bottom-10px"
              />
              {errorList["contact_type"] &&
                errorList["contact_type"].map((errorMessage, index) => (
                  <div key={index} className="error-message">
                    {errorMessage}
                  </div>
                ))}
              <Autocomplete
                disablePortal
                id="survey_type"
                name="survey_type"
                options={surveyTypes}
                getOptionLabel={(option) => option.value}
                sx={{ my: 3 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={<span className="required">{"Survey Type"}</span>}
                  />
                )}
                onChange={(e, value, reason) => {
                  setFieldValue("survey_type", value?.key || "");
                  setValues({ ...values, survey_type: value?.key });
                }}
              />
              <ErrorMessage
                name="survey_type"
                component="div"
                className="error-message margin-top-bottom-10px"
              />
              {errorList["survey_type"] &&
                errorList["survey_type"].map((errorMessage, index) => (
                  <div key={index} className="error-message">
                    {errorMessage}
                  </div>
                ))}
              <Autocomplete
                disablePortal
                id="category_id"
                name="category_id"
                options={projectCategories}
                getOptionLabel={(option) => option.name}
                sx={{ my: 3 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      <span className="required">{"Product Category"}</span>
                    }
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
                className="error-message margin-top-bottom-10px"
              />
              {errorList["category_id"] &&
                errorList["category_id"].map((errorMessage, index) => (
                  <div key={index} className="error-message">
                    {errorMessage}
                  </div>
                ))}
              <DialogActions sx={{ p: "1.25rem" }}>
                <Button onClick={() => {
                    onClose();
                    changeInitial();
                  }}>Cancel</Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                >
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSurveyNameSetupModal;
