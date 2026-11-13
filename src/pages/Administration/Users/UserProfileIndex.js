import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  DialogActions,
  Button,
  Paper,
  FormControlLabel,
  Switch,
} from "@mui/material";
import useUserForm from "./UserHook";
import FormInputText from "components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { useController, useWatch } from "react-hook-form";

const UserProfileIndex = () => {
  const location = useLocation();
  const isEdit = location.state?.is_edit;
  const [pwdBox, setPwdBox] = useState(false);

  const {
    onSubmit,
    handleSubmit,
    control,
    user,
    nrcStates,
    nrcTownships,
    nrcRemarks,
    departments,
    positions,
    errors,
  } = useUserForm();

  const { field } = useController({
    name: "nrc",
    control,
  });
  const nrc_state_id = useWatch({
    control,
    name: "nrc_state_id",
  });
  const nrc_township_id = useWatch({
    control,
    name: "nrc_township_id",
  });
  const nrc_number = useWatch({
    control,
    name: "nrc_number",
  });
  const nrc_remark = useWatch({
    control,
    name: "nrc_remark",
  });
  const password = useWatch({
    control,
    name: "password",
  });

  const nrcTownshipsByNrcState = useMemo(
    () => nrcTownships.filter((item) => item?.n_r_c_state_id === nrc_state_id),
    [nrcTownships, nrc_state_id]
  );

  useEffect(() => {
    const nrc_state = nrcStates.find((item) => item.id === nrc_state_id);
    const nrc_township = nrcTownships.find(
      (item) => item.id === nrc_township_id
    );
    const nrc =
      nrc_state?.state_code &&
      nrc_township?.township_nrc_code &&
      nrc_remark &&
      nrc_number
        ? `${nrc_state?.state_code || ""}/${
            nrc_township?.township_nrc_code || ""
          }(${nrc_remark || ""})${nrc_number || ""}`
        : "";
    field.onChange(nrc);
  }, [
    field,
    nrcStates,
    nrcTownships,
    nrc_number,
    nrc_remark,
    nrc_state_id,
    nrc_township_id,
  ]);

  const handlePwdBox = () => {
    setPwdBox(!pwdBox);
  };
  return (
    <>
      <Typography variant="h3" component="h2" m={4}>
        Profile {!!isEdit ? "Edit" : "Information"}
      </Typography>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 2, border: "1px solid #ccc" }}>
          <Typography variant="h4" gutterBottom>
            Profile Section
          </Typography>
          <Box sx={{ minHeight: "100%", borderRadius: 2 }}>
            <Grid container spacing={4} sx={{ disabled: true }}>
              <Grid item xs={6}>
                <FormInputText
                  control={control}
                  label="Name"
                  name="user_name"
                  rules={{
                    required: true,
                  }}
                  disabled={!isEdit}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInputText
                  control={control}
                  label="Father Name"
                  name="father_name"
                  rules={{
                    required: true,
                  }}
                  disabled={!isEdit}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInputDatePicker control={control} label="DOB" name="dob" />
              </Grid>
              {isEdit && (
                <>
                  <Grid item xs={6}>
                    <FormInputSelect
                      control={control}
                      options={nrcStates}
                      getOptionLabel={(option) => option?.name}
                      id="id"
                      label="NRC State"
                      name="nrc_state_id"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormInputSelect
                      control={control}
                      options={isEdit ? nrcTownships : nrcTownshipsByNrcState}
                      getOptionLabel={(option) => option?.name}
                      id="id"
                      label="NRC Township"
                      name="nrc_township_id"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormInputSelect
                      control={control}
                      options={nrcRemarks}
                      getOptionLabel={(option) => option?.value || ""}
                      id="key"
                      name="nrc_remark"
                      label="NRC Remark"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormInputText
                      control={control}
                      label="NRC Number"
                      name="nrc_number"
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={6}>
                <FormInputText
                  control={control}
                  label="NRC"
                  name="nrc"
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInputText
                  control={control}
                  label="CSC"
                  name="csc"
                  rules={{
                    required: true,
                  }}
                  disabled={!isEdit}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInputText
                  control={control}
                  label="Personal Email"
                  name="personal_email"
                  rules={{
                    required: true,
                  }}
                  disabled={!isEdit}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInputSelect
                  control={control}
                  options={departments}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  label="Departments"
                  name="department_id"
                  rules={{
                    required: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInputSelect
                  control={control}
                  options={positions}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  label="Positions"
                  name="position_id"
                  rules={{
                    required: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInputText
                  control={control}
                  label="Level"
                  name="level"
                  rules={{
                    required: true,
                  }}
                  disabled={!isEdit}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInputText
                  control={control}
                  label="Personal Phone"
                  name="personal_phone"
                  rules={{
                    required: true,
                  }}
                  disabled={!isEdit}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInputText
                  control={control}
                  label="Company Phone"
                  name="company_phone"
                  rules={{
                    required: true,
                  }}
                  disabled={!isEdit}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
        {isEdit && (
          <FormControlLabel
            control={<Switch checked={pwdBox} onChange={handlePwdBox} />}
            label={
              <Typography sx={{ marginRight: 1 }}>Change Password</Typography>
            }
          />
        )}
        {pwdBox && (
          <Paper elevation={3} sx={{ p: 2, border: "1px solid #ccc" }}>
            <Typography variant="h4" gutterBottom>
              Password Section
            </Typography>
            <Box sx={{ minHeight: "100%", borderRadius: 2 }}>
              <Grid container spacing={4} sx={{ disabled: true }}>
                <Grid item xs={6}>
                  <FormInputText
                    type="password"
                    control={control}
                    label="Old Password"
                    name="old_password"
                    rules={{
                      required: true,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInputText
                    type="password"
                    control={control}
                    label="New Password"
                    name="password"
                    rules={{
                      required: true,
                      minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormInputText
                    type="password"
                    control={control}
                    label="Confirm Password"
                    name="confirm_password"
                    rules={{
                      required: true,
                      validate: (value) =>
                        value === password || "The passwords do not match",
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        )}
        {isEdit && (
          <DialogActions sx={{ p: "1.25rem" }}>
            <Button
              type="submit"
              onClick={() => {
                handleSubmit((data) => onSubmit(data, user.uuid))();
              }}
              variant="contained"
            >
              Update
            </Button>
          </DialogActions>
        )}
      </Container>
    </>
  );
};

export default UserProfileIndex;
