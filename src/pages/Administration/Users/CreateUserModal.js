import * as React from "react";
import { useEffect, useState, useMemo } from "react";
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
import { getNRCStates } from "features/nrc/NRCState/nrcStateSlice";
import { getNRCTownships } from "features/nrc/NRCTownship/nrcTownshipSlice";
import { getNRCRemarks } from "features/blacklistCustomer/NRCRemarkSlice";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getUserGroups } from "../../../features/userGroup/userGroupSlice";
import { getDepartments } from "../../../features/department/departmentSlice";
import { getPosition } from "../../../features/position/positionSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CommonMessage from "common/CommonMessage";
import { createUser, getUsers } from "features/users/usersSlice";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";

export const CreateUserModal = ({
  open,
  onClose,
  onSubmit,
  handleSuccessMessage,
}) => {
  const dispatch = useDispatch();
  // for NRC
  const [selectedNRCState, setSelectedNRCState] = useState(null);
  const [selectedNRCTownship, setSelectedNRCTownship] = useState(null);
  const [selectedNRCRemark, setSelectedNRCRemark] = useState(null);
  const [nrcNumber, setNRCNumber] = useState("");
  const [concatenatedNRCValue, setConcatenatedNRCValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [values, setValues] = useState();
  const [errorList, setErrorList] = useState({}); // for store validation message list

  // for NRC State (9/)
  const {
    nrcStates,
    isError: isNRCStatesError,
    isSuccess: isNRCStatesSuccess,
    isLoading: isNRCStatesLoading,
    message: nrcStatesMessage,
  } = useSelector((state) => state.nrcStates);

  // for NRC Township (/AMaYa)
  const {
    nrcTownships,
    isError: isNRCTownshipsError,
    isSuccess: isNRCTownshipsSuccess,
    isLoading: isNRCTownshipsLoading,
    message: nrcTownshipsMessage,
  } = useSelector((state) => state.nrcTownships);

  // for NRC Remark (/N,E,P)
  const {
    nrcRemarks,
    isError: isNRCRemarksError,
    isSuccess: isNRCRemarksSuccess,
    isLoading: isNRCRemarkLoading,
    message: nrcRemarksMessage,
  } = useSelector((state) => state.nrcRemarks);

  const {
    userGroups,
    isUserGpLoading,
    isUserGpSuccess,
    isUserGpError,
    userGpmessage,
  } = useSelector((state) => state.userGroups);

  const {
    departments,
    isDeptLoading,
    isDeptSuccess,
    isDeptError,
    deptmessage,
  } = useSelector((state) => state.departments);

  const {
    positions,
    isPositionLoading,
    isPositionSuccess,
    isPositionError,
    positionmessage,
  } = useSelector((state) => state.positions);
  const columns = useMemo(
    () => [
      {
        accessorKey: "user_name",
        header: "User Name",
      },
      {
        accessorKey: "father_name",
        header: "Father Name",
      },
      {
        accessorKey: "password",
        header: "Password",
      },
      {
        accessorKey: "password_confirmation",
        header: "Password Confirmation",
      },
      {
        accessorKey: "level",
        header: "Level",
      },
      {
        accessorKey: "personal_email",
        header: "Personal Email",
      },
      {
        accessorKey: "office_email",
        header: "Office Email",
      },
      {
        accessorKey: "role_id",
        header: "Role Id",
      },
      {
        accessorKey: "position_id",
        header: "Position Id",
      },
      {
        accessorKey: "department_id",
        header: "Department Id",
      },
      {
        accessorKey: "nrc",
        header: "NRC",
      },
      {
        accessorKey: "personal_phone",
        header: "Personal Phone",
      },
      {
        accessorKey: "company_phone",
        header: "Company Phone",
      },
    ],
    []
  );

  const initialValues = {
    user_name: "",
    father_name: "",
    level: "",
    personal_email: "",
    office_email: "",
    role_id: "",
    position_id: "",
    department_id: "",
    nrc_remark: "",
    nrc_number: "",
    nrc_township_id: "",
    nrc_state_id: "",
    personal_phone: "",
    company_phone: "",
    password: "",
    password_confirmation: "",
    dob: "",
    csc: "",
  };

  useEffect(() => {
    // for NRC
    dispatch(getNRCStates());
    dispatch(getNRCTownships());
    dispatch(getNRCRemarks());

    dispatch(getUserGroups());
    dispatch(getDepartments());
    dispatch(getPosition());
  }, []);

  // for NRC Concatenation
  useEffect(() => {
    const concatenateNRCValues = () => {
      const stateCode = selectedNRCState?.state_code || "";
      const townshipCode = selectedNRCTownship?.township_nrc_code || "";
      const remark = selectedNRCRemark?.value || "";
      const number = nrcNumber || "";

      // Check if any of the parts are not empty before concatenate the format
      if (stateCode || townshipCode || remark || number) {
        const resultNRC = `${stateCode}/${townshipCode}${remark ? `(${remark})` : ""
          }${number ? number : ""}`;
        setConcatenatedNRCValue(resultNRC);
        setValues({ ...values, full_nrc: resultNRC });
      } else {
        // Handle for where all parts are empty or not selected
        setConcatenatedNRCValue("");
        setValues({ ...values, full_nrc: "" });
      }
    };
    concatenateNRCValues();
  }, [selectedNRCState, selectedNRCTownship, selectedNRCRemark, nrcNumber]);

  const handleSubmit = async () => {
    try {
      const responseData = await dispatch(createUser(values));
      if (responseData) {
        if (responseData.payload && responseData.payload.success === true) {
          onClose();
          changeInitial();
          showSuccessToast(CommonMessage.MFS00001.replace("%s", "User"));
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
      await dispatch(getUsers());
    } catch (error) {
      showErrorToast(CommonMessage.MFE00009.replace("%s", "creating User"));
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Format the date using dayjs
    const formattedDate = date ? dayjs(date).format("MM/DD/YYYY") : "";

    setValues({ ...values, dob: formattedDate });
  };

  // check validation
  const validationSchema = Yup.object().shape({
    user_name: Yup.string()
      .required(CommonMessage.MFE00002.replace("%s", "User Name"))
      .min(
        2,
        CommonMessage.MFE00005.replace("%s", "User Name").replace("%s", "2")
      )
      .max(
        99,
        CommonMessage.MFE00006.replace("%s", "User Name").replace("%s", "100")
      ),
    father_name: Yup.string()
      .min(
        2,
        CommonMessage.MFE00005.replace("%s", "Father Name").replace("%s", "2")
      )
      .max(
        99,
        CommonMessage.MFE00006.replace("%s", "Father Name").replace("%s", "100")
      ),
    password: Yup.string()
      .required(CommonMessage.MFE00002.replace("%s", "Password"))
      .min(
        8,
        CommonMessage.MFE00005.replace("%s", "Password").replace("%s", "8")
      )
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        CommonMessage.MFE00011
      ),
    password_confirmation: Yup.string()
      .required(CommonMessage.MFE00002.replace("%s", "Password Confirmation"))
      .oneOf([Yup.ref("password"), null], CommonMessage.MFE00012),
    role_id: Yup.string().required(
      CommonMessage.MFE00001.replace("%s", "User Group")
    ),
    position_id: Yup.string().required(
      CommonMessage.MFE00001.replace("%s", "Position")
    ),
    department_id: Yup.string().required(
      CommonMessage.MFE00001.replace("%s", "Department")
    ),
    personal_email: Yup.string()
      .required(CommonMessage.MFE00002.replace("%s", "Personal Email"))
      .email(CommonMessage.MFE00010.replace("%s", "email")),
    office_email: Yup.string()
      .required(CommonMessage.MFE00002.replace("%s", "Office Email"))
      .email(CommonMessage.MFE00010.replace("%s", "email")),
    level: Yup.number()
      .integer()
      .typeError(CommonMessage.MFE00001.replace("%s", "number")),
    csc: Yup.string().max(
      100,
      CommonMessage.MFE00006.replace("%s", "CSC").replace("%s", "100")
    ),
    personal_phone: Yup.string().max(
      50,
      CommonMessage.MFE00006.replace("%s", "Personal Phone").replace("%s", "50")
    ),
    company_phone: Yup.string().max(
      50,
      CommonMessage.MFE00006.replace("%s", "Company Phone").replace("%s", "50")
    ),
  });

  const changeInitial = () => {
    setValues();
    setSelectedDate(null);
    setSelectedNRCRemark(null);
    setSelectedNRCState(null);
    setSelectedNRCTownship(null);
    setConcatenatedNRCValue(null);
    setNRCNumber(null);
    setErrorList({});
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New User</DialogTitle>
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

                <TextField
                  key={'user_name'}
                  label={
                    'User Name'
                  }
                  name={'user_name'}
                  onChange={(e) => {
                    handleChange(e);
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
                <ErrorMessage
                  name={'user_name'}
                  component="div"
                  className="error-message"
                />
                {errorList['user_name'] &&
                  errorList['user_name'].map(
                    (errorMessage, index) => (
                      <div key={index} className="error-message">
                        {errorMessage}
                      </div>
                    )
                  )}

                {columns.map(
                  (column) =>
                    (column.accessorKey === "personal_email") && (
                      <React.Fragment key={column.accessorKey}>
                        <TextField
                          key={column.accessorKey}
                          label={
                            column.accessorKey === "personal_email" ? (
                              <span className="required">{`${column.header}`}</span>
                            ) : (
                              column.header
                            )
                          }
                          name={column.accessorKey}
                          onChange={(e) => {
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            });
                            handleChange(e);
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

                <TextField
                  key={'password'}
                  label={
                    'Password'
                  }
                  type={'password'}
                  name={'password'}
                  onChange={(e) => {
                    handleChange(e);
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
                <ErrorMessage
                  name={'password'}
                  component="div"
                  className="error-message"
                />
                {errorList['password'] &&
                  errorList['password'].map(
                    (errorMessage, index) => (
                      <div key={index} className="error-message">
                        {errorMessage}
                      </div>
                    )
                  )}


                <TextField
                  key={'password_confirmation'}
                  label={
                    'Confirm Password'
                  }
                  type={'password'}
                  name={'password_confirmation'}
                  onChange={(e) => {
                    handleChange(e);
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
                <ErrorMessage
                  name={'password_confirmation'}
                  component="div"
                  className="error-message"
                />
                {errorList['password_confirmation'] &&
                  errorList['password_confirmation'].map(
                    (errorMessage, index) => (
                      <div key={index} className="error-message">
                        {errorMessage}
                      </div>
                    )
                  )}


                <TextField
                  key={'father_name'}
                  label={
                    'Father Name'
                  }
                  name={'father_name'}
                  onChange={(e) => {
                    handleChange(e);
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
                <ErrorMessage
                  name={'father_name'}
                  component="div"
                  className="error-message"
                />
                {errorList['father_name'] &&
                  errorList['father_name'].map(
                    (errorMessage, index) => (
                      <div key={index} className="error-message">
                        {errorMessage}
                      </div>
                    )
                  )}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date of Birth"
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
                {errorList["dob"] &&
                  errorList["dob"].map((errorMessage, index) => (
                    <div key={index} className="error-message">
                      {errorMessage}
                    </div>
                  ))}
                <Autocomplete
                  className="margin-top-bottom-0"
                  disablePortal
                  id="state_nrc_code"
                  name="state_nrc_code"
                  options={nrcStates}
                  getOptionLabel={(option) => option.state_code}
                  sx={{ my: 3 }}
                  renderInput={(params) => (
                    <TextField {...params} label="NRC State" />
                  )}
                  onChange={(e, newValue) => {
                    setSelectedNRCState(newValue);
                    setFieldValue("nrc_state_id", newValue?.id || "");
                    setValues({ ...values, nrc_state_id: newValue?.id });
                  }}
                  value={selectedNRCState}
                //value={values.id} // my test
                />
                <Autocomplete
                  className="margin-top-bottom-0"
                  disablePortal
                  id="township_nrc_code"
                  name="township_nrc_code"
                  options={nrcTownships}
                  getOptionLabel={(option) => option.township_nrc_code}
                  sx={{ my: 3 }}
                  renderInput={(params) => (
                    <TextField {...params} label="NRC Township" />
                  )}
                  onChange={(e, newValue) => {
                    setSelectedNRCTownship(newValue);
                    setFieldValue("nrc_township_id", newValue?.id || "");
                    setValues({ ...values, nrc_township_id: newValue?.id });
                  }}
                  value={selectedNRCTownship}
                //value={values.id}
                />
                <Autocomplete
                  className="margin-top-bottom-0"
                  disablePortal
                  id="key"
                  name="value"
                  options={nrcRemarks}
                  getOptionLabel={(option) => option.value}
                  renderInput={(params) => (
                    <TextField {...params} label="NRC Remark" />
                  )}
                  onChange={(e, newValue) => {
                    setSelectedNRCRemark(newValue);
                    setFieldValue("nrc_remark", newValue?.id || "");
                    setValues({ ...values, nrc_remark: newValue?.key });
                  }}
                  value={selectedNRCRemark}
                />
                <TextField
                  key="nrc_number"
                  label="NRC Number"
                  name="nrc_number"
                  type="number"
                  value={nrcNumber}
                  onChange={(e) => {
                    setNRCNumber(e.target.value);
                    setValues({ ...values, nrc_number: e.target.value });
                  }}
                />
                <TextField
                  key="nrc"
                  label="Full NRC"
                  name="nrc"
                  value={concatenatedNRCValue}
                  inputProps={{ readOnly: true }}
                  onChange={(e) => {
                    setConcatenatedNRCValue(e.target.value);
                  }}
                />
                <TextField
                  key="csc"
                  label="CSC"
                  name="csc"
                  onChange={(e) => {
                    setValues({ ...values, csc: e.target.value });
                    handleChange(e);
                  }}
                />
                <ErrorMessage
                  name="csc"
                  component="div"
                  className="error-message"
                />
                {errorList["csc"] &&
                  errorList["csc"].map((errorMessage, index) => (
                    <div key={index} className="error-message">
                      {errorMessage}
                    </div>
                  ))}
                <Autocomplete
                  className="margin-top-bottom-0"
                  disablePortal
                  id="role_id"
                  name="role_id"
                  options={userGroups}
                  getOptionLabel={(option) => option.name}
                  sx={{ my: 3 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<span className="required">{"User Group"}</span>}
                    />
                  )}
                  onChange={(e, value, reason) => {
                    setFieldValue("role_id", value?.id || "");
                    setValues({ ...values, role_id: value?.id });
                  }}
                />
                <ErrorMessage
                  name="role_id"
                  component="div"
                  className="error-message"
                />
                {errorList["role_id"] &&
                  errorList["role_id"].map((errorMessage, index) => (
                    <div key={index} className="error-message">
                      {errorMessage}
                    </div>
                  ))}
                <Autocomplete
                  className="margin-top-bottom-0"
                  disablePortal
                  id="department_id"
                  name="department_id"
                  options={departments}
                  getOptionLabel={(option) => option.name}
                  sx={{ my: 3 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<span className="required">{"Department"}</span>}
                    />
                  )}
                  onChange={(e, value, reason) => {
                    setFieldValue("department_id", value?.id || "");
                    setValues({ ...values, department_id: value?.id });
                  }}
                />
                <ErrorMessage
                  name="department_id"
                  component="div"
                  className="error-message"
                />
                {errorList["department_id"] &&
                  errorList["department_id"].map((errorMessage, index) => (
                    <div key={index} className="error-message">
                      {errorMessage}
                    </div>
                  ))}
                <Autocomplete
                  className="margin-top-bottom-0"
                  disablePortal
                  id="position_id"
                  name="position_id"
                  options={positions}
                  getOptionLabel={(option) => option.name}
                  sx={{ my: 3 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={<span className="required">{"Position"}</span>}
                    />
                  )}
                  onChange={(e, value, reason) => {
                    setFieldValue("position_id", value?.id || "");
                    setValues({ ...values, position_id: value?.id });
                  }}
                />
                <ErrorMessage
                  name="position_id"
                  component="div"
                  className="error-message"
                />
                {errorList["position_id"] &&
                  errorList["position_id"].map((errorMessage, index) => (
                    <div key={index} className="error-message">
                      {errorMessage}
                    </div>
                  ))}
                {columns.map(
                  (column) =>
                    (column.accessorKey === "office_email" ||
                      column.accessorKey === "personal_phone" ||
                      column.accessorKey === "company_phone" ||
                      column.accessorKey === "level") && (
                      <React.Fragment key={column.accessorKey}>
                        <TextField
                          key={column.accessorKey}
                          label={
                            column.accessorKey === "office_email" ? (
                              <span className="required">{`${column.header}`}</span>
                            ) : (
                              column.header
                            )
                          }
                          name={column.accessorKey}
                          onChange={(e) => {
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            });
                            handleChange(e);
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

export default CreateUserModal;
