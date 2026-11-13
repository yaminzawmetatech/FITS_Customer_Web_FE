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
import { getProjectCategory } from "../../../features/projectcategory/projectcategorySlice";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { showErrorToast, showSuccessToast } from "../../../common/ToastMessage";
import { createFirstDueDateSetup, getFirstDueDateSetup, updateFirstDueDateSetup } from "../../../features/firstDueDateSetup/firstDueDateSetupSlice";
import CommonMessage from "../../../common/CommonMessage";

export const CreateNewFirstDueDateSetupModal = ({
  open,
  onClose,
  columns,
  editValues,
  editFlag,
  initialValues,
}) => {
  const dispatch = useDispatch();
  const [errorList, setErrorList] = useState({}); // for store validation message list
  const [selectCategory, setSelectCategory] = useState(""); // select category
  const [values, setValues] = useState({
    start_day: "",
    end_day: "",
    add_to_month: "",
    add_to_month_for_else: "",
    billing_set_up_day: "",
    category_id: "",
  });

  const initialValuesCreate = {
    start_day: "",
    end_day: "",
    add_to_month: "",
    add_to_month_for_else: "",
    billing_set_up_day: "",
    category_id: "",
  }; // define initial value

  const { projectCategories, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.projectCategories);

  useEffect(() => {
    dispatch(getProjectCategory());
  }, []);

  useEffect(() => {
    if (editFlag === true && projectCategories && !isLoading && editValues) {
      let categoryId = "";

      const foundCategory = projectCategories.find(
        (category) => category.name_en === editValues.original.category
      );
      if (foundCategory) {
        categoryId = foundCategory.id;
        setSelectCategory(foundCategory);
      }

      setValues({
        uuid: editValues.original.uuid,
        category_id: categoryId,
        start_day: editValues.original.start_day,
        end_day: editValues.original.end_day,
        add_to_month: editValues.original.add_to_month,
        add_to_month_for_else: editValues.original.add_to_month_for_else,
        billing_set_up_day: editValues.original.billing_set_up_day,
      });
    } else if (editFlag === false) {
      setValues({ start_day: "", end_day: "", add_to_month: "", add_to_month_for_else: "", billing_set_up_day: "", category_id: "" });
      setSelectCategory("");
    }
  }, [editFlag, projectCategories, isLoading, editValues, open]);

  // ✅ Cleaner handleSubmit using unwrap
  const handleSubmit = async () => {
    try {
      if (editFlag) {
        await dispatch(
          updateFirstDueDateSetup({ id: values.uuid, newData: values })
        ).unwrap();

        showSuccessToast(
          CommonMessage.MFS00003.replace("%s", "First Due Date Setup")
        );
      } else {
        await dispatch(createFirstDueDateSetup(values)).unwrap();

        showSuccessToast(
          CommonMessage.MFS00001.replace("%s", "First Due Date Setup")
        );
      }

      // ✅ Close modal & reset after success
      onClose();
      changeInitial();

      // ✅ Refresh list
      await dispatch(getFirstDueDateSetup());
    } catch (error) {
      console.error("Error:", error);

      // if API returns validation errors
      if (error && typeof error === "object" && error.errors) {
        setErrorList(error.errors);
      } else {
        showErrorToast(
          editFlag
            ? CommonMessage.MFE00009.replace(
              "%s",
              "updating First Due Date Setup"
            )
            : CommonMessage.MFE00009.replace(
              "%s",
              "creating First Due Date Setup"
            )
        );
      }
    }
  };


  // check validation
  const validationSchema = Yup.object().shape({
    // start_day: Yup.string()
    //   .required(CommonMessage.MFE00002.replace("%s", "Start Day"))
    //   .min(2, CommonMessage.MFE00013.replace("%s", "Start Day").replace("%s", "2"))
    //   .max(
    //     255,
    //     CommonMessage.MFE00003.replace("%s", "Start Day").replace("%s", "255")
    //   ),
    // end_day: Yup.string()
    //   .required(CommonMessage.MFE00002.replace("%s", "End Day"))
    //   .min(2, CommonMessage.MFE00013.replace("%s", "End Day").replace("%s", "2")),
    // add_to_month: Yup.string()
    //   .min(
    //     2,
    //     CommonMessage.MFE00013.replace("%s", "Add To Month").replace("%s", "2")
    //   )
    //   .max(
    //     255,
    //     CommonMessage.MFE00003.replace("%s", "Add To Month").replace("%s", "255")
    //   ),
    //   add_to_month_for_else: Yup.string()
    //   .min(
    //     2,
    //     CommonMessage.MFE00013.replace("%s", "Add To Month For Else").replace("%s", "2")
    //   )
    //   .max(
    //     255,
    //     CommonMessage.MFE00003.replace("%s", "Add To Month For Else").replace("%s", "255")
    //   ),
    //   billing_setup_day: Yup.string()
    //   .min(
    //     2,
    //     CommonMessage.MFE00013.replace("%s", "Billing Setup Day").replace("%s", "2")
    //   )
    //   .max(
    //     255,
    //     CommonMessage.MFE00003.replace("%s", "Billing Setup Day").replace("%s", "255")
    //   ),
    // category_id: Yup.string().required(
    //   CommonMessage.MFE00001.replace("%s", "Product Category")
    // ),
  });

  // change to initial stage
  const changeInitial = () => {
    setValues({});
    setErrorList({});
    setSelectCategory("");
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit First Due Date Setup" : "Create New First Due Date Setup"}
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
                {columns.map(
                  (column) =>
                    column.accessorKey !== "category" &&
                    column.accessorKey !== "start_day" &&
                    column.accessorKey !== "end_day" &&
                    column.accessorKey !== "add_to_month" &&
                    column.accessorKey !== "add_to_month_for_else" &&
                    column.accessorKey !== "billing_set_up_day" && (
                      <React.Fragment key={column.accessorKey}>
                        <TextField
                          key={column.accessorKey}
                          label={
                            <span className="required">{`${column.header}`}</span>
                          }
                          name={column.accessorKey}
                          value={values[column.accessorKey] || ""}
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
                id="category_id"
                name="category_id"
                value={selectCategory === "" ? null : selectCategory}
                options={projectCategories}
                getOptionLabel={(option) => option.name_en || ""}
                sx={{ my: 3 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={<span className="required">Product Category</span>}
                  />
                )}
                onChange={(e, value, reason) => {
                  setFieldValue("category_id", value?.id || "");
                  setValues({ ...values, category_id: value?.id });
                  setSelectCategory(value);
                }}
              />
              <ErrorMessage
                name={"category_id"}
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
                  // mt: 1,
                }}
              >
                <TextField
                  key="start_day"
                  label="Start Day"
                  name="start_day"
                  value={values.start_day || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setValues({ ...values, [e.target.name]: e.target.value });
                  }}
                  type={"number"}
                />
                <ErrorMessage
                  name="start_day"
                  component="div"
                  className="error-message"
                />
                {errorList["start_day"] &&
                  errorList["start_day"].map((errorMessage, index) => (
                    <div key={index} className="error-message">
                      {errorMessage}
                    </div>
                  ))}

                <TextField
                  key="end_day"
                  label="End Day"
                  name="end_day"
                  value={values.end_day || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setValues({ ...values, [e.target.name]: e.target.value });
                  }}
                  type={"number"}
                />
                <ErrorMessage
                  name="end_day"
                  component="div"
                  className="error-message"
                />
                {errorList["end_day"] &&
                  errorList["end_day"].map((errorMessage, index) => (
                    <div key={index} className="error-message">
                      {errorMessage}
                    </div>
                  ))}

                <TextField
                  key="add_to_month"
                  label="Add To Month"
                  name="add_to_month"
                  value={values.add_to_month || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setValues({ ...values, [e.target.name]: e.target.value });
                  }}
                  type={"number"}
                />
                <ErrorMessage
                  name="add_to_month"
                  component="div"
                  className="error-message"
                />
                {errorList["add_to_month"] &&
                  errorList["add_to_month"].map((errorMessage, index) => (
                    <div key={index} className="error-message">
                      {errorMessage}
                    </div>
                  ))}


                <TextField
                  key="add_to_month_for_else"
                  label="Add To Month For Else"
                  name="add_to_month_for_else"
                  value={values.add_to_month_for_else || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setValues({ ...values, [e.target.name]: e.target.value });
                  }}
                  type={"number"}
                />
                <ErrorMessage
                  name="add_to_month_for_else"
                  component="div"
                  className="error-message"
                />
                {errorList["add_to_month_for_else"] &&
                  errorList["add_to_month_for_else"].map((errorMessage, index) => (
                    <div key={index} className="error-message">
                      {errorMessage}
                    </div>
                  ))}


                <TextField
                  key="billing_set_up_day"
                  label="Billing Setup Day"
                  name="billing_set_up_day"
                  value={values.billing_set_up_day || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setValues({ ...values, [e.target.name]: e.target.value });
                  }}
                  type={"number"}
                />
                <ErrorMessage
                  name="billing_set_up_day"
                  component="div"
                  className="error-message"
                />
                {errorList["billing_set_up_day"] &&
                  errorList["billing_set_up_day"].map((errorMessage, index) => (
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
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="contained"
                >
                  {editFlag === true ? "Update" : "Save"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewFirstDueDateSetupModal;
