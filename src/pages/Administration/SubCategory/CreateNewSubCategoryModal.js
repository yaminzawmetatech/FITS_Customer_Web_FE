// import * as React from "react";
// import { useEffect, useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Stack,
// } from "@mui/material";
// import TextField from "@mui/material/TextField";
// import { useSelector, useDispatch } from "react-redux";
// import Autocomplete from "@mui/material/Autocomplete";
// import {
//   createSubCategory,
//   getSubCategory,
//   updateSubCategory,
// } from "../../../features/subcategory/subcategorySlice";
// import { getProjectCategory } from "../../../features/projectcategory/projectcategorySlice";
// import { showErrorToast, showSuccessToast } from "common/ToastMessage";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import CommonMessage from "common/CommonMessage";
// import * as Yup from "yup";

// export const CreateNewSubCategoryModal = ({
//   open,
//   onClose,
//   columns,
//   editValues,
//   editFlag,
//   initialValues,
// }) => {
//   const dispatch = useDispatch();
//   const [errorList, setErrorList] = useState({}); // for store validation message list
//   const [selectCategory, setSelectCategory] = useState(""); // select category
//   const [values, setValues] = useState({
//     name: "",
//     code: "",
//     description: "",
//     category_id: "",
//   });

//   const initialValuesCreate = {
//     name: "",
//     code: "",
//     description: "",
//     category_id: "",
//   }; // define initial value

//   const { projectCategories, isLoading, isSuccess, isError, message } =
//     useSelector((state) => state.projectCategories);

//   useEffect(() => {
//     dispatch(getProjectCategory());
//   }, []);

//   useEffect(() => {
//     if (editFlag === true && projectCategories && !isLoading && editValues) {
//       let categoryId = "";

//       const foundCategory = projectCategories.find(
//         (category) => category.name === editValues.original.category
//       );
//       if (foundCategory) {
//         categoryId = foundCategory.id;
//         setSelectCategory(foundCategory);
//       }

//       setValues({
//         uuid: editValues.original.uuid,
//         category_id: categoryId,
//         name: editValues.original.name,
//         code: editValues.original.code,
//         interest_rate: editValues.original.interest_rate,
//         description:
//           editValues.original.description === "---"
//             ? ""
//             : editValues.original.description,
//       });
//     } else if (editFlag === false) {
//       setValues({ name: "", code: "", description: "", category_id: "", interest_rate: "" });
//       setSelectCategory("");
//     }
//   }, [editFlag, projectCategories, isLoading, editValues, open]);

//   // click save button and there is no validation error
//   const handleSubmit = async () => {
//     try {
//       // call create api
//       let responseData;
//       responseData =
//         editFlag === true
//           ? await dispatch(
//               updateSubCategory({ id: values.uuid, newData: values })
//             )
//           : await dispatch(createSubCategory(values));
//       if (responseData) {
//         if (responseData.payload && responseData.payload.success === true) {
//           onClose();
//           changeInitial();
//           showSuccessToast(
//             editFlag === true
//               ? CommonMessage.MFS00003.replace("%s", "Sub Category")
//               : CommonMessage.MFS00001.replace("%s", "Sub Category")
//           );
//         } else if (
//           responseData.error &&
//           responseData.error.message === "Rejected"
//         ) {
//           if (typeof responseData.payload === "string") {
//             onClose();
//             changeInitial();
//             showErrorToast(responseData.payload);
//           } else {
//             setErrorList(responseData.payload);
//           }
//         }
//       }
//       await dispatch(getSubCategory());
//     } catch (error) {
//       showErrorToast(
//         editFlag === true
//           ? CommonMessage.MFE00009.replace("%s", "updating Sub Category")
//           : CommonMessage.MFE00009.replace("%s", "creating Sub Category")
//       );
//     }
//   };

//   // check validation
//   const validationSchema = Yup.object().shape({
//     name: Yup.string()
//       .required(CommonMessage.MFE00002.replace("%s", "Name"))
//       .min(2, CommonMessage.MFE00013.replace("%s", "Name").replace("%s", "2"))
//       .max(
//         255,
//         CommonMessage.MFE00003.replace("%s", "Name").replace("%s", "255")
//       ),
//     code: Yup.string()
//       .required(CommonMessage.MFE00002.replace("%s", "Code"))
//       .min(2, CommonMessage.MFE00013.replace("%s", "Code").replace("%s", "2")),
//     description: Yup.string()
//       .min(
//         2,
//         CommonMessage.MFE00013.replace("%s", "Description").replace("%s", "2")
//       )
//       .max(
//         255,
//         CommonMessage.MFE00003.replace("%s", "Description").replace("%s", "255")
//       ),
//     category_id: Yup.string().required(
//       CommonMessage.MFE00001.replace("%s", "Product Category")
//     ),
//   });

//   // change to initial stage
//   const changeInitial = () => {
//     setValues({});
//     setErrorList({});
//     setSelectCategory("");
//   };

//   return (
//     <Dialog open={open}>
//       <DialogTitle textAlign="center">
//         {editFlag === true ? "Edit Sub Category" : "Create New Sub Category"}
//       </DialogTitle>
//       <DialogContent>
//         <Formik
//           initialValues={
//             editFlag === true ? initialValues : initialValuesCreate
//           }
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting, handleChange, setFieldValue }) => (
//             <Form>
//               <Stack
//                 sx={{
//                   width: "100%",
//                   minWidth: { xs: "300px", sm: "360px", md: "400px" },
//                   gap: "1.5rem",
//                   mt: 1,
//                 }}
//               >
//                 {columns.map(
//                   (column) =>
//                     column.accessorKey !== "category" &&
//                     column.accessorKey !== "interest_rate" &&
//                     column.accessorKey !== "description" && (
//                       <React.Fragment key={column.accessorKey}>
//                         <TextField
//                           key={column.accessorKey}
//                           label={
//                             <span className="required">{`${column.header}`}</span>
//                           }
//                           name={column.accessorKey}
//                           value={values[column.accessorKey] || ""}
//                           onChange={(e) => {
//                             handleChange(e);
//                             setValues({
//                               ...values,
//                               [e.target.name]: e.target.value,
//                             });
//                           }}
//                         />
//                         <ErrorMessage
//                           name={column.accessorKey}
//                           component="div"
//                           className="error-message"
//                         />
//                         {errorList[column.accessorKey] &&
//                           errorList[column.accessorKey].map(
//                             (errorMessage, index) => (
//                               <div key={index} className="error-message">
//                                 {errorMessage}
//                               </div>
//                             )
//                           )}
//                       </React.Fragment>
//                     )
//                 )}
//               </Stack>
//               <Autocomplete
//                 disablePortal
//                 id="category_id"
//                 name="category_id"
//                 value={selectCategory === "" ? null : selectCategory}
//                 options={projectCategories}
//                 getOptionLabel={(option) => option.name}
//                 sx={{ my: 3 }}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label={<span className="required">Product Category</span>}
//                   />
//                 )}
//                 onChange={(e, value, reason) => {
//                   setFieldValue("category_id", value?.id || "");
//                   setValues({ ...values, category_id: value?.id });
//                   setSelectCategory(value);
//                 }}
//               />
//               <ErrorMessage
//                 name={"category_id"}
//                 component="div"
//                 className="error-message"
//               />
//               {errorList["category_id"] &&
//                 errorList["category_id"].map((errorMessage, index) => (
//                   <div key={index} className="error-message">
//                     {errorMessage}
//                   </div>
//                 ))}
//               <Stack
//                   sx={{
//                     width: "100%",
//                     minWidth: { xs: "300px", sm: "360px", md: "400px" },
//                     gap: "1.5rem",
//                     // mt: 1,
//                   }}
//               >
//                 <TextField
//                     key="interest_rate"
//                     label="Interest Rate"
//                     name="interest_rate"
//                     value={values.interest_rate || ""}
//                     onChange={(e) => {
//                       handleChange(e);
//                       setValues({ ...values, [e.target.name]: e.target.value });
//                     }}
//                     type={"number"}
//                 />
//                 <ErrorMessage
//                     name="interest_rate"
//                     component="div"
//                     className="error-message"
//                 />
//                 {errorList["interest_rate"] &&
//                 errorList["interest_rate"].map((errorMessage, index) => (
//                     <div key={index} className="error-message">
//                       {errorMessage}
//                     </div>
//                 ))}
//               </Stack>
//               <Stack
//                 sx={{
//                   width: "100%",
//                   minWidth: { xs: "300px", sm: "360px", md: "400px" },
//                   gap: "1.5rem",
//                   my: 3,
//                 }}
//               >
//                 <TextField
//                   key="description"
//                   label="Description"
//                   name="description"
//                   value={values.description || ""}
//                   onChange={(e) => {
//                     handleChange(e);
//                     setValues({ ...values, [e.target.name]: e.target.value });
//                   }}
//                 />
//                 <ErrorMessage
//                   name="description"
//                   component="div"
//                   className="error-message"
//                 />
//                 {errorList["description"] &&
//                   errorList["description"].map((errorMessage, index) => (
//                     <div key={index} className="error-message">
//                       {errorMessage}
//                     </div>
//                   ))}
//               </Stack>
//               <DialogActions sx={{ p: "1.25rem" }}>
//                 <Button
//                   onClick={() => {
//                     onClose();
//                     changeInitial();
//                   }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={isSubmitting}
//                   variant="contained"
//                 >
//                  {editFlag === true ? "Update" : "Save"}
//                 </Button>
//               </DialogActions>
//             </Form>
//           )}
//         </Formik>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateNewSubCategoryModal;


import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import {
  createSubCategory,
  getSubCategory,
  updateSubCategory,
} from "../../../features/subcategory/subcategorySlice";
import { getProjectCategory } from "../../../features/projectcategory/projectcategorySlice";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CommonMessage from "common/CommonMessage";
import * as Yup from "yup";

export const CreateNewSubCategoryModal = ({
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
    name: "",
    code: "",
    description: "",
    category_id: "",
    required_inspection: false, // Add state for the checkbox
  });

  const initialValuesCreate = {
    name: "",
    code: "",
    description: "",
    category_id: "",
    required_inspection: false, // Default state for checkbox
  };

  const { projectCategories, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.projectCategories);

  useEffect(() => {
    dispatch(getProjectCategory());
  }, []);

  useEffect(() => {
    if (editFlag === true && projectCategories && !isLoading && editValues) {
      let categoryId = "";

      const foundCategory = projectCategories.find(
        (category) => category.name === editValues.original.category
      );
      if (foundCategory) {
        categoryId = foundCategory.id;
        setSelectCategory(foundCategory);
      }

      setValues({
        uuid: editValues.original.uuid,
        category_id: categoryId,
        name: editValues.original.name,
        code: editValues.original.code,
        interest_rate: editValues.original.interest_rate,
        description:
          editValues.original.description === "---"
            ? ""
            : editValues.original.description,
        required_inspection: editValues.original.required_inspection === 1 ? true : false, // Set checkbox value if it exists
      });
    } else if (editFlag === false) {
      setValues({ name: "", code: "", description: "", category_id: "", interest_rate: "", required_inspection: false });
      setSelectCategory("");
    }
  }, [editFlag, projectCategories, isLoading, editValues, open]);

  // click save button and there is no validation error
  const handleSubmit = async () => {
    try {
      // call create api
      let responseData;
      responseData =
        editFlag === true
          ? await dispatch(
              updateSubCategory({ id: values.uuid, newData: {...values,required_inspection: values.required_inspection === true ? 1 : 0 }  })
            )
          : await dispatch(createSubCategory({...values, required_inspection: values.required_inspection === true ? 1 : 0 }));
      if (responseData) {
        if (responseData.payload && responseData.payload.success === true) {
          onClose();
          changeInitial();
          showSuccessToast(
            editFlag === true
              ? CommonMessage.MFS00003.replace("%s", "Sub Category")
              : CommonMessage.MFS00001.replace("%s", "Sub Category")
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
      await dispatch(getSubCategory());
    } catch (error) {
      showErrorToast(
        editFlag === true
          ? CommonMessage.MFE00009.replace("%s", "updating Sub Category")
          : CommonMessage.MFE00009.replace("%s", "creating Sub Category")
      );
    }
  };

  // check validation
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(CommonMessage.MFE00002.replace("%s", "Name"))
      .min(2, CommonMessage.MFE00013.replace("%s", "Name").replace("%s", "2"))
      .max(
        255,
        CommonMessage.MFE00003.replace("%s", "Name").replace("%s", "255")
      ),
    code: Yup.string()
      .required(CommonMessage.MFE00002.replace("%s", "Code"))
      .min(2, CommonMessage.MFE00013.replace("%s", "Code").replace("%s", "2")),
    description: Yup.string()
      .min(
        2,
        CommonMessage.MFE00013.replace("%s", "Description").replace("%s", "2")
      )
      .max(
        255,
        CommonMessage.MFE00003.replace("%s", "Description").replace("%s", "255")
      ),
    category_id: Yup.string().required(
      CommonMessage.MFE00001.replace("%s", "Product Category")
    ),
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
        {editFlag === true ? "Edit Sub Category" : "Create New Sub Category"}
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
                    column.accessorKey !== "interest_rate" &&
                    column.accessorKey !== "description" && 
                    column.accessorKey !== "required_inspection" && (
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
                getOptionLabel={(option) => option.name}
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
                  my: 3,
                }}
              >
                <TextField
                    key="interest_rate"
                    label="Interest Rate"
                    name="interest_rate"
                    value={values.interest_rate || ""}
                    onChange={(e) => {
                      handleChange(e);
                      setValues({ ...values, [e.target.name]: e.target.value });
                    }}
                    type={"number"}
                />
                <ErrorMessage
                    name="interest_rate"
                    component="div"
                    className="error-message"
                />
                {errorList["interest_rate"] &&
                errorList["interest_rate"].map((errorMessage, index) => (
                    <div key={index} className="error-message">
                      {errorMessage}
                    </div>
                ))}
              </Stack>

              {/* Add the checkbox for Inspection Required */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="required_inspection"
                    checked={values.required_inspection}
                    onChange={(e) => {
                      setFieldValue("required_inspection", e.target.checked);
                      setValues({
                        ...values,
                        required_inspection: e.target.checked,
                      });
                    }}
                  />
                }
                label="Is inspection required?"
              />
              <Stack
                sx={{
                  width: "100%",
                  minWidth: { xs: "300px", sm: "360px", md: "400px" },
                  gap: "1.5rem",
                  my: 3,
                }}
              >
                <TextField
                  key="description"
                  label="Description"
                  name="description"
                  value={values.description || ""}
                  onChange={(e) => {
                    handleChange(e);
                    setValues({ ...values, [e.target.name]: e.target.value });
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

export default CreateNewSubCategoryModal;
