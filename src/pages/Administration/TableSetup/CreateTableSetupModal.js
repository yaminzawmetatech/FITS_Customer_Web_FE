import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";
import { createTable, getTable, updateTable } from "features/table/tableSlice";

export const CreateTableSetupModal = ({
  open,
  columns,
  onClose,
  editValues,
  editFlag,
  initialValues,
}) => {
  const dispatch = useDispatch();
  const [errorList, setErrorList] = useState({}); // for store validation message list
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const initialValuesCreate = {
    name: "",
    description: "",
  }; // define initial value

  useEffect(() => {
    if (editFlag === true && editValues) {
      setValues({
        uuid: editValues.original.uuid,
        name: editValues.original.name,
        description:
          editValues.original.description === "---"
            ? ""
            : editValues.original.description,
      });
    } else if (editFlag === false) {
      setValues({
        name: "",
        description: "",
      });
    }
  }, [editFlag, open]);

  // click save button and there is no validation error
  const handleSubmit = async () => {
    try {
      // call create api
      let responseData;
      responseData =
        editFlag === true
          ? await dispatch(updateTable({ id: values.uuid, newData: values }))
          : await dispatch(createTable(values));
      if (responseData) {
        if (responseData.payload && responseData.payload.success === true) {
          onClose();
          changeInitial();
          showSuccessToast(
            editFlag === true
              ? CommonMessage.MFS00003.replace("%s", "Table Setup")
              : CommonMessage.MFS00001.replace("%s", "Table Setup")
          );
        } else if (
          responseData.error &&
          responseData.error.message === "Rejected"
        ) {
          if (typeof responseData.payload === "string") {
            onClose();
            changeInitial();
            showErrorToast(responseData.payload);
          } else {
            setErrorList(responseData.payload);
          }
        }
      }
      await dispatch(getTable());
    } catch (error) {
      showErrorToast(
        editFlag === true
          ? CommonMessage.MFE00009.replace("%s", "updating Table Setup")
          : CommonMessage.MFE00009.replace("%s", "creating Table Setup")
      );
    }
  };

  // check validation
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(CommonMessage.MFE00002.replace("%s", "Name")),
    description: Yup.string()
      .min(
        5,
        CommonMessage.MFE00013.replace("%s", "Description").replace("%s", "5")
      )
      .max(
        255,
        CommonMessage.MFE00003.replace("%s", "Description").replace("%s", "255")
      ),
  });

  // change to initial stage
  const changeInitial = () => {
    setValues({});
    setErrorList({});
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Table Setup" : "Create New Table Setup"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={
            editFlag === true ? initialValues : initialValuesCreate
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, setFieldValue }) => (
            <Form>
              <Stack
                sx={{
                  width: "100%",
                  minWidth: { xs: "300px", sm: "360px", md: "400px" },
                  gap: "1.5rem",
                  mt: 1,
                }}
              >
                {columns.map((column) => (
                  <React.Fragment key={column.accessorKey}>
                    <TextField
                      key={column.accessorKey}
                      value={values[column.accessorKey] || ""}
                      label={
                        column.accessorKey === "name" ? (
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
                ))}
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
                    {editFlag === true ? "Update" : "Save"}
                  </Button>
                </DialogActions>
              </Stack>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTableSetupModal;
