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
  TextField,
  Autocomplete,
} from "@mui/material";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";
import { getUserGroups } from "features/userGroup/userGroupSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";
import {
  createWorkflow,
  getWorkflows,
  updateWorkflow,
} from "features/workflow/workflowSlice";
export const CreateNewWorkflowModal = ({
  open,
  columns,
  onClose,
  editValues,
  editFlag,
  initialValues,
}) => {
  const dispatch = useDispatch();
  const [errorList, setErrorList] = useState({}); // for store validation message list
  const [selectCategory, setSelectCategory] = useState(""); // select category
  const [selectUserGp, setSelectUserGp] = useState(""); // select category

  const [values, setValues] = useState({
    category_id: "",
    user_group_id: "",
    sequence: "",
    description: "",
  });

  const initialValuesCreate = {
    category_id: "",
    user_group_id: "",
    sequence: "",
    description: "",
  }; // define initial value

  const { projectCategories, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.projectCategories);

  const {
    userGroups,
    isError: isUserGroupsError,
    isSuccess: isUserGroupsSuccess,
    isLoading: isUserGroupsLoading,
    message: UserGroupsMessage,
  } = useSelector((state) => state.userGroups);

  useEffect(() => {
    if (open) {
      // Fetch data only when the modal is opened
      dispatch(getProjectCategory());
      dispatch(getUserGroups());
    }
  }, [dispatch, open]);

  useEffect(() => {
    if (editFlag === true && projectCategories && !isLoading && editValues) {
      let categoryId = "";
      let userGpId = "";

      const foundCategory = projectCategories.find(
        (category) => category.name === editValues.original.category
      );
      if (foundCategory) {
        categoryId = foundCategory.id;
        setSelectCategory(foundCategory);
      }

      const foundUserGp = userGroups.find(
        (userGp) => userGp.id === editValues.original.user_group_id
      );
      if (foundUserGp) {
        userGpId = foundUserGp.id;
        setSelectUserGp(foundUserGp);
      }

      setValues({
        uuid: editValues.original.uuid,
        category_id: categoryId,
        user_group_id: userGpId,
        sequence: editValues.original.sequence,
        description:
          editValues.original.description === "---"
            ? ""
            : editValues.original.description,
      });
    } else if (editFlag === false) {
      setValues({
        category_id: "",
        user_group_id: "",
        sequence: "",
        description: "",
      });
      setSelectCategory("");
      setSelectUserGp("");
    }
  }, [editFlag, projectCategories, userGroups, isLoading, editValues, open]);

  // click save button and there is no validation error
  const handleSubmit = async () => {
    try {
      // call create api
      let responseData;
      responseData =
        editFlag === true
          ? await dispatch(updateWorkflow({ id: values.uuid, newData: values }))
          : await dispatch(createWorkflow(values));
      if (responseData) {
        if (responseData.payload && responseData.payload.success === true) {
          onClose();
          changeInitial();
          showSuccessToast(
            editFlag === true
              ? CommonMessage.MFS00003.replace("%s", "Workflow")
              : CommonMessage.MFS00001.replace("%s", "Workflow")
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
      await dispatch(getWorkflows());
    } catch (error) {
      showErrorToast(
        editFlag === true
          ? CommonMessage.MFE00009.replace("%s", "updating Workflow")
          : CommonMessage.MFE00009.replace("%s", "creating Workflow")
      );
    }
  };

  // check validation
  const validationSchema = Yup.object().shape({
    sequence: Yup.number()
      .required(CommonMessage.MFE00002.replace("%s", "Sequence"))
      .typeError(CommonMessage.MFE00004.replace("%s", "Sequence")),
    description: Yup.string()
      .min(
        5,
        CommonMessage.MFE00013.replace("%s", "Description").replace("%s", "5")
      )
      .max(
        255,
        CommonMessage.MFE00003.replace("%s", "Description").replace("%s", "255")
      ),
    category_id: Yup.string().required(
      CommonMessage.MFE00001.replace("%s", "Product Category")
    ),
    user_group_id: Yup.string().required(
      CommonMessage.MFE00001.replace("%s", "User Group")
    ),
  });

  // change to initial stage
  const changeInitial = () => {
    setValues({});
    setErrorList({});
    setSelectCategory("");
    setSelectUserGp("");
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Workflow" : "Create New Workflow"}
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
              <Autocomplete
                disablePortal
                id="category_id"
                name="category_id"
                options={projectCategories}
                value={selectCategory === "" ? null : selectCategory}
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
                  setValues({ ...values, category_id: value?.id });
                  setFieldValue("category_id", value?.id || "");
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
              <Autocomplete
                disablePortal
                id="id"
                name="id"
                options={userGroups}
                value={selectUserGp === "" ? null : selectUserGp}
                getOptionLabel={(option) => option.name}
                sx={{ my: 3 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={<span className="required">{"User Group"}</span>}
                  />
                )}
                onChange={(e, value, reason) => {
                  setValues({ ...values, user_group_id: value?.id });
                  setFieldValue("user_group_id", value?.id || "");
                  setSelectUserGp(value);
                }}
              />
              <ErrorMessage
                name={"user_group_id"}
                component="div"
                className="error-message"
              />
              {errorList["user_group_id"] &&
                errorList["user_group_id"].map((errorMessage, index) => (
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
                {columns.map(
                  (column) =>
                    (column.accessorKey === "sequence" ||
                      column.accessorKey === "description") && (
                      <React.Fragment key={column.accessorKey}>
                        <TextField
                          key={column.accessorKey}
                          value={values[column.accessorKey] || ""}
                          label={
                            column.accessorKey === "sequence" ? (
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

export default CreateNewWorkflowModal;
