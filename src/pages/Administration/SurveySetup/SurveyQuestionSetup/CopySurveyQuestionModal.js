import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getSurveyHeaders } from "features/surveyNameSetup/surveyNameSetupSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CommonMessage from "common/CommonMessage";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  copySurveyQA,
} from "features/surveyQASetup/surveyQASetupSlice";
import { getSurveyQAsByHeaderUuid, getSurveyHeaderByUuid } from "features/surveyNameSetup/surveyNameSetupSlice";
import { useParams } from "react-router";

export const CopySurveyQuestionModal = ({
  open,
  onClose,
  handleSuccessMessage,
}) => {
  const param = useParams("uuid"); // define param id
  const paramId = param.uuid;
  const initialValues = {
    source_survey_header_id: "",
  }; // define initial value

  const dispatch = useDispatch();
  const [values, setValues] = useState();
  const [errorList, setErrorList] = useState({}); // for store validation message list

  const { surveyHeaders, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.surveyHeaders
  );

  const { surveyHeader, isHeaderLoading, isHeaderSuccess, isHeaderError, headerMessage } = useSelector(
    (state) => state.surveyHeader
  );

  useEffect(() => {
    dispatch(getSurveyHeaders());
    dispatch(getSurveyHeaderByUuid({id: paramId}));
  }, [dispatch]);

  useEffect(() => {
    if (open) {
      dispatch(getSurveyHeaders());
      dispatch(getSurveyHeaderByUuid({id: paramId}));
    }
  }, [open]);

  const handleSubmit = async() => {
    try {
      // call create Survey QA api
      if (surveyHeader.uuid === paramId) {
        const id = surveyHeader.id;

        const createValues = {
          ...values,
          destination_survey_header_id: id, 
        };
        
        const responseData = await dispatch(copySurveyQA(createValues));
       
        if (responseData) {
          if (responseData.payload && responseData.payload.success === true) {
            onClose();
            changeInitial();
            handleSuccessMessage(
              CommonMessage.MFS00004.replace("%s", "Survey QA")
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
      }
      await dispatch(getSurveyQAsByHeaderUuid({ id: paramId }));
    } catch (error) {
      toast.error(CommonMessage.MFE00009.replace("%s", "creating Survey QA"), {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

    // check validation
    const validationSchema = Yup.object().shape({
      source_survey_header_id: Yup.string().required(CommonMessage.MFE00001.replace("%s", "Survey Header")),
    });

    // change to initial stage
  const changeInitial = () => {
    setValues({});
    setErrorList({});
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Copy Survey Questions</DialogTitle>
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
          <Autocomplete
            disablePortal
            id="source_survey_header_id"
            name="source_survey_header_id"
            options={surveyHeaders}
            getOptionLabel={(option) => option.survey_header_code}
            sx={{ my: 3 }}
            renderInput={(params) => <TextField {...params}  label={<span className="required">{"Survey Header Code"}</span>} />}
            onChange={(e, value, reason) => {
              setValues({ source_survey_header_id: value?.id });
              setFieldValue("source_survey_header_id", value?.id || "");
            }}
          />
          <ErrorMessage
                name="source_survey_header_id"
                component="div"
                className="error-message margin-top-bottom-10px"
              />
              {errorList["source_survey_header_id"] &&
                errorList["source_survey_header_id"].map((errorMessage, index) => (
                  <div key={index} className="error-message">
                    {errorMessage}
                  </div>
                ))}
          </Stack>
          <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          onClick={() => {
            onClose();
            changeInitial();
          }}
        >
          Cancel
        </Button>
        <Button type="submit"
                  disabled={isSubmitting}
                  variant="contained">
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

export default CopySurveyQuestionModal;
