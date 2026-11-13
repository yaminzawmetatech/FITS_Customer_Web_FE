import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputText from "components/form/FormInputText";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import { useController, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormInputMultiSelect from "components/form/FormInputMultiSelect";

export const CreateEditUserModal = ({
  open,
  onClose,
  columns,
  editValues,
  editFlag,
  setEditFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  setEditValues,
  userGroups,
  nrcStates,
  nrcTownships,
  nrcRemarks,
  departments,
  positions,
}) => {
  const [pwdBox, setPwdBox] = useState(false);

  const auth = useSelector((state) => state.auth.user);

  const { addressStates } = useSelector((state) => state.addressStates);

  const handlePwdBox = () => {
    setPwdBox(!pwdBox);
  };
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);

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

  const [regionIds, setRegionIds] = useState([]);
  const handleSelectChange = (selectedOptions) => {
    const ids = selectedOptions?.map((item) => item.id) || [];
    setRegionIds(ids);
  };

  // change format for addressStates 
  const transformedOptions = (addressStates ?? []).map(option => ({
    ...option,
    text: option.name,
  }));  

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit User" : "Create New User"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputText
            control={control}
            key="user_name"
            label="User Name"
            name="user_name"
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputSelect
            control={control}
            options={userGroups}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="role_id"
            label={<span className="required">User Groups</span>}
            rules={{
              required: true,
            }}
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputSelect
            control={control}
            options={departments}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="department_id"
            label={<span className="required">Department</span>}
            rules={{
              required: true,
            }}
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputSelect
            control={control}
            options={positions}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="position_id"
            label={<span className="required">Position</span>}
            rules={{
              required: true,
            }}
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputSelect
            control={control}
            options={nrcStates}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="nrc_state_id"
            label="NRC State"
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputSelect
            control={control}
            options={editFlag ? nrcTownships : nrcTownshipsByNrcState}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="nrc_township_id"
            label="NRC Township"
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputSelect
            control={control}
            options={nrcRemarks}
            getOptionLabel={(option) => option?.value || ""}
            id="key"
            name="nrc_remark"
            label="NRC Remark"
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputNumber
            control={control}
            key="nrc_number"
            label="NRC Number"
            name="nrc_number"
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputText
            control={control}
            key="nrc"
            label="Full NRC"
            name="nrc"
          />
          {/* {!editFlag && (
            <FormInputMultiSelect
              name="region"
              control={control}
              limitTags={2}
              options={transformedOptions ?? []}
              label="Region"
              rules={{ required: false }}
              onSelect={handleSelectChange}
              id="id"
              getOptionLabel={(option) => option?.id}
              sx={{ mb: 2 }}
            />
          )} */}
          {/* {editFlag && (
            <FormInputSelect
              control={control}
              options={addressStates ?? []}
              getOptionLabel={(option) => option?.name || ""}
              id="key"
              name="region"
              label="Region"
            />
          )} */}
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputDatePicker control={control} label="DOB" name="dob" />
        </Stack>
        {!editFlag && (
          <>
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
                mt: 1,
                marginTop: "20px",
              }}
            >
              <FormInputText
                type="password"
                control={control}
                label={<span className="required">Password</span>}
                name="password"
                rules={{
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                }}
              />
            </Stack>
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
                mt: 1,
                marginTop: "20px",
              }}
            >
              <FormInputText
                type="password"
                control={control}
                label={<span className="required">Confirm Password</span>}
                name="password_confirmation"
                rules={{
                  required: true,
                  validate: (value) =>
                    value === password || "The passwords do not match",
                }}
              />
            </Stack>
          </>
        )}

        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          {columns.map(
            (column) =>
              column.accessorKey !== "user_name" &&
              column.accessorKey !== "userGroup" &&
              column.accessorKey !== "department" &&
              column.accessorKey !== "position" &&
              column.accessorKey !== "nrc_state" &&
              column.accessorKey !== "nrc_township" &&
              column.accessorKey !== "nrc_remark" &&
              column.accessorKey !== "nrc_number" &&
              column.accessorKey !== "nrc" &&
              column.accessorKey !== "dob" &&
              column.accessorKey !== "password" &&
              column.accessorKey !== "password_confirmation" && (
                <FormInputText
                  control={control}
                  key={column.accessorKey}
                  label={
                    column.accessorKey !== "description" &&
                    column.accessorKey !== "father_name" &&
                    column.accessorKey !== "dob" &&
                    column.accessorKey !== "csc" &&
                    column.accessorKey !== "level" &&
                    column.accessorKey !== "personal_phone" &&
                    column.accessorKey !== "company_phone" ? (
                      <span className="required">{`${column.header}`}</span>
                    ) : (
                      column.header
                    )
                  }
                  name={column.accessorKey}
                  rules={{
                    required:
                      column.accessorKey !== "description" &&
                      column.accessorKey !== "father_name" &&
                      column.accessorKey !== "dob" &&
                      column.accessorKey !== "csc" &&
                      column.accessorKey !== "level" &&
                      column.accessorKey !== "personal_phone" &&
                      column.accessorKey !== "company_phone"
                        ? true
                        : false,
                  }}
                />
              )
          )}
        </Stack>
        {editFlag && (
          <FormControlLabel
            control={<Switch checked={pwdBox} onChange={handlePwdBox} />}
            label={
              <Typography sx={{ marginRight: 1 }}>Change Password</Typography>
            }
          />
        )}
        {pwdBox && (
          <>
            {auth.is_super === false && (
              <Stack
                sx={{
                  width: "100%",
                  minWidth: { xs: "300px", sm: "360px", md: "400px" },
                  gap: "1.5rem",
                  mt: 1,
                  marginTop: "20px",
                }}
              >
                <FormInputText
                  type="password"
                  control={control}
                  label={<span className="required">Old Password</span>}
                  name="old_password"
                  rules={{
                    required: true,
                  }}
                />
              </Stack>
            )}
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
                mt: 1,
                marginTop: "20px",
              }}
            >
              <FormInputText
                type="password"
                control={control}
                label={<span className="required">New Password</span>}
                name="password"
                rules={{
                  required: true,
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                }}
              />
            </Stack>
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
                mt: 1,
                marginTop: "20px",
              }}
            >
              <FormInputText
                type="password"
                control={control}
                label={<span className="required">Confirm Password</span>}
                name="password_confirmation"
                rules={{
                  required: true,
                  validate: (value) =>
                    value === password || "The passwords do not match",
                }}
              />
            </Stack>
          </>
        )}

        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              reset();
              setEditValues("");
              onClose();
              setEditFlag(false);
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
             // handleSubmit((data) => onSubmit(data, editFlag, regionIds))();
              handleSubmit((data) => onSubmit(data, editFlag))();
            }}
            variant="contained"
          >
            {editFlag === true ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditUserModal;
