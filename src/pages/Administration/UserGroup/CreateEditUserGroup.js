import * as React from "react";
import { Breadcrumbs, Typography, Button, Grid, Backdrop, CircularProgress, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import FormInputText from "components/form/FormInputText";
import useUserGroupForm from "./UserGroupHook";
import { useParams } from "react-router-dom";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import { getPermissionsets } from "features/persmissionsets/permissionsetsSlice";

const CreateUserGroupSetup = ({}) => {
  const { mode } = useParams();
  const dispatch = useDispatch();

  const { control, onSubmit, handleSubmit, reset, setValue } =
    useUserGroupForm();

  const { permissions, isLoading } = useSelector((state) => state.permissions);

  if (permissions.length <= 0) {
    dispatch(getPermissionsets());
  } else {
    const limit = Math.ceil(permissions.length / 2);

  }

  return (
    <Box style={{padding:"30px"}}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">
          {mode === "create" ? "Create New User Group" : "Edit User Group"}
        </Typography>
      </Breadcrumbs>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormInputText
            control={control}
            label="Name"
            name="name"
            rules={{ required: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormInputText
            control={control}
            label="Description"
            name="description"
          />
        </Grid>
        {permissions.map((permission) => (
          <Grid item xs={12} sm={3}>
            <FormInputCheckbox
              control={control}
              label={permission.name}
              name={permission.name}
            />
          </Grid>
        ))}


      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        sx={{ mt: 2, gap: 2, display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          onClick={() => {
            reset();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={() => {
            handleSubmit((data) => onSubmit(data))();
          }}
          variant="contained"
        >
          {mode === "edit" ? "Update" : "Save"}
        </Button>
      </Grid>
    </Box>
  );
};

export default CreateUserGroupSetup;
