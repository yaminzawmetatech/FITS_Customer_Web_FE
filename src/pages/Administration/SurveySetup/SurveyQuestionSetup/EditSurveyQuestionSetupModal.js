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
import { getSurveyHeaderByUuid } from "features/surveyNameSetup/surveyNameSetupSlice";
import {
  getSurveyQuestions,
  updateSurveyQA,
} from "features/surveyQASetup/surveyQASetupSlice";
import { getSurveyQAsByHeaderUuid } from "features/surveyNameSetup/surveyNameSetupSlice";
import { useParams } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CommonMessage from "common/CommonMessage";
import * as Yup from "yup";
import { toast } from "react-toastify";

export const EditSurveyQuestionSetupModal = ({
  open,
  onClose,
  handleSuccessMessage,
  editFlag,
  editValues,
  initialValues
}) => {
  const dispatch = useDispatch();
  const param = useParams("uuid"); // define param id
  const paramId = param.uuid;

  // define columns
  const create_columns = [
    {
      accessorKey: "survey_qa_code",
      header: "Survey QA Code",
      size: 100,
    },
    {
      accessorKey: "text",
      header: "Text",
      size: 100,
    },
    {
      accessorKey: "description",
      header: "Description",
      size: 300,
    },
  ];
  const [values, setValues] = useState({}); // define values

  const [errorList, setErrorList] = useState({}); // for store validation message list
  const [selectType, setSelectType] = useState(null); // select type
  const [selectAnswerType, setSelectAnswerType] = useState(null); // select answer type
  const [selectQuestionId, setSelectQuestionId] = useState(null); // select answer type

  const { surveyQuestions, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.surveyQuestions);

  const {
    surveyHeader,
    isHeaderLoading,
    isHeaderSuccess,
    isHeaderError,
    headerMessage,
  } = useSelector((state) => state.surveyHeader);

  // define type
  const [types, setTypes] = useState([
    {
      key: "question",
      value: "Question",
    },
    {
      key: "answer",
      value: "Answer",
    },
  ]);

  // define answer type
  const [answerType, setAnswerType] = useState([
    {
      key: "radio",
      value: "Radio",
    },
    {
      key: "checkbox",
      value: "Checkbox",
    },
    {
      key: "text",
      value: "Text",
    },
    {
      key: "remark",
      value: "Remark",
    },
  ]);

  useEffect(() => {
    dispatch(getSurveyQuestions({ id: paramId }));
    dispatch(getSurveyHeaderByUuid({ id: paramId }));
  }, [dispatch]);

  useEffect(() => {
    if (open) {
      dispatch(getSurveyQuestions({ id: paramId }));
      dispatch(getSurveyHeaderByUuid({ id: paramId }));
    }
  }, [open]);

  useEffect(() => {
    
    if (
      editFlag === true &&
      surveyQuestions &&
      surveyHeader &&
      !isLoading &&
      !isHeaderLoading
    ) {

      const foundType = types.find(
        (type) => type.key === editValues.original.type
      );
      if (foundType) {
        setSelectType(foundType);
      }

      const foundAnswerType = answerType.find(
        (ans_type) => ans_type.key === editValues.original.answer_type
      );
      if (foundAnswerType !== undefined) {
        setSelectAnswerType(foundAnswerType);
      }
      const foundQuestionId = surveyQuestions.find(
        (question) => question.survey_qa_code === editValues.original.question_qa_code
      );

      if (foundQuestionId !== undefined) {
        setSelectQuestionId(foundQuestionId);
      }

      setValues({
        uuid: editValues.original.uuid,
        survey_qa_code: editValues.original.survey_qa_code,
        type: editValues.original.type,
        text: editValues.original.text,
        answer_type: editValues.original.answer_type === "---" ? "" : editValues.original.answer_type,
        question_id: editValues.original.question_id === "---" ? "" : editValues.original.question_id,
        description:
          editValues.original.description === "---"
            ? ""
            : editValues.original.description,
      });
    }
  }, [
    editFlag,
    surveyQuestions,
    surveyHeader,
    isLoading,
    isHeaderLoading,
    open,
  ]);

  // click submit button to create Survey QA
  const handleSubmit = async () => {
    try {
      // call create Survey QA api
        let id = values.uuid;
        const responseData = await dispatch(updateSurveyQA({ id: id, newData: values }));

        if (responseData) {
          if (responseData.payload && responseData.payload.success === true) {
            onClose();
            changeInitial();
            handleSuccessMessage(
              CommonMessage.MFS00003.replace("%s", "Survey QA")
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
      await dispatch(getSurveyQAsByHeaderUuid({ id: paramId }));
    } catch (error) {
      toast.error(CommonMessage.MFE00009.replace("%s", "Survey QA"), {
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

  // change to initial stage
  const changeInitial = () => {
    setValues({});
    setErrorList({});
  };

  // check validation
  const validationSchema = Yup.object().shape({
    type: Yup.string().required(CommonMessage.MFE00001.replace("%s", "Type")),
    description: Yup.string()
      .min(
        2,
        CommonMessage.MFE00013.replace("%s", "Description").replace("%s", "2")
      )
      .max(
        255,
        CommonMessage.MFE00003.replace("%s", "Description").replace("%s", "255")
      ),
    text: Yup.string().required(CommonMessage.MFE00002.replace("%s", "Text")),
    survey_qa_code: Yup.string()
      .required(CommonMessage.MFE00002.replace("%s", "Survey QA Code"))
      .min(
        2,
        CommonMessage.MFE00013.replace("%s", "Survey QA Code").replace(
          "%s",
          "2"
        )
      ),
  });

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Edit Survey Question</DialogTitle>
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
                {create_columns.map(
                  (column) =>
                    (column.accessorKey === "survey_qa_code" ||
                      column.accessorKey === "description" ||
                      column.accessorKey === "text") && (
                      <React.Fragment  key={column.accessorKey}>
                        <TextField
                          key={column.accessorKey}
                          value={values[column.accessorKey] || ""}
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
                id="type"
                name="type"
                options={types}
                value={selectType}
                getOptionLabel={(option) => option.value || ""}
                sx={{ my: 3 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={<span className="required">{"Type"}</span>}
                  />
                )}
                onChange={(e, value, reason) => {
                  setFieldValue("type", value?.key || "");
                  setValues({ ...values, type: value?.key });
                  setSelectType(value);
                }}
              />
              <ErrorMessage
                name="type"
                component="div"
                className="error-message margin-top-bottom-10px"
              />
              {errorList["type"] &&
                errorList["type"].map((errorMessage, index) => (
                  <div key={index} className="error-message">
                    {errorMessage}
                  </div>
                ))}
              {values.type === "answer" && (
                <>
                  <Autocomplete
                    disablePortal
                    id="question_id"
                    name="question_id"
                    options={surveyQuestions}
                    value={selectQuestionId}
                    getOptionLabel={(option) => option.survey_qa_code || ""}
                    sx={{ my: 3 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Question Id" />
                    )}
                    onChange={(e, value, reason) => {
                      setFieldValue("question_id", value?.id || "");
                      setValues({ ...values, question_id: value?.id });
                      setSelectQuestionId(value)
                    }}
                  />
                  <ErrorMessage
                    name="question_id"
                    component="div"
                    className="error-message margin-top-bottom-10px"
                  />
                  {errorList["question_id"] &&
                    errorList["question_id"].map((errorMessage, index) => (
                      <div key={index} className="error-message">
                        {errorMessage}
                      </div>
                    ))}
                     <Autocomplete
                    disablePortal
                    id="answer_type"
                    name="answer_type"
                    options={answerType}
                    value={selectAnswerType}
                    getOptionLabel={(option) => option.value || ""}
                    sx={{ my: 3 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Answer_Type" />
                    )}
                    onChange={(e, value, reason) => {
                      setFieldValue("answer_type", value?.key || "");
                      setValues({ ...values, answer_type: value?.key });
                      setSelectAnswerType(value);
                    }}
                  />
                  <ErrorMessage
                    name="answer_type"
                    component="div"
                    className="error-message margin-top-bottom-10px"
                  />
                  {errorList["answer_type"] &&
                    errorList["answer_type"].map((errorMessage, index) => (
                      <div key={index} className="error-message" >
                        {errorMessage}
                      </div>
                    ))}
                </>
              )}
              <DialogActions sx={{ p: "1.25rem" }}>
                <Button
                  onClick={() => {
                    onClose();
                    changeInitial();
                  }}
                >
                  Cancel
                </Button>
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

export default EditSurveyQuestionSetupModal;
