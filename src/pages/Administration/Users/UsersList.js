import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItemIcon,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { deleteUsers, getUsers, createUser, updateUser } from "../../../features/users/usersSlice";
import { getUserGroups } from "../../../features/userGroup/userGroupSlice";
import { showErrorToast, showSuccessToast } from "../../../common/ToastMessage";
import CommonMessage from "../../../common/CommonMessage";
import DeleteConfirmationModal from "../../../common/DeleteConfirmationModal";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);
  const { userGroups } = useSelector((state) => state.userGroups);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  useEffect(() => {
    const loadUsersAndRoles = async () => {
      try {
        await Promise.all([
          dispatch(getUsers()).unwrap(),
          dispatch(getUserGroups()).unwrap(),
        ]);
      } catch (error) {
        showErrorToast("Unable to load users.");
        console.error("Unable to load users and roles:", error);
      }
    };

    loadUsersAndRoles();
  }, [dispatch]);

  const columns = useMemo(
    () => [
      { accessorKey: "user_name", header: "User Name", size: 180 },
      { accessorKey: "email", header: "Email", size: 220 },
      {
        id: "role",
        header: "Role",
        size: 180,
        Cell: ({ row }) =>
          row.original.role?.name ||
          row.original.role_name ||
          row.original.role ||
          "",
      },
    ],
    []
  );

  const openCreateForm = () => {
    setEditingUser(null);
    reset({ user_name: "", email: "", role_id: "", password: "", password_confirmation: "" });
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    reset({
      user_name: user.user_name || user.name || "",
      email: user.email || "",
      role_id: user.role_id ?? user.role?.id ?? "",
      password: "",
      password_confirmation: "",
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
    reset();
  };

  const saveUser = handleSubmit(async (values) => {
    const { password_confirmation, ...userData } = values;
    if (!userData.password) {
      delete userData.password;
    }

    try {
      if (editingUser) {
        const id = editingUser.uuid || editingUser.id || editingUser._id;
        await dispatch(updateUser({ id, newData: userData })).unwrap();
        showSuccessToast(CommonMessage.MFS00003.replace("%s", "User"));
      } else {
        await dispatch(createUser(userData)).unwrap();
        showSuccessToast(CommonMessage.MFS00001.replace("%s", "User"));
      }
      await dispatch(getUsers()).unwrap();
      closeForm();
    } catch (error) {
      showErrorToast("Unable to save user.");
      console.error("Unable to save user:", error);
    }
  });

  const confirmDelete = async () => {
    const id = deleteUser?.uuid || deleteUser?.id || deleteUser?._id;
    if (!id) {
      showErrorToast("Unable to delete user: missing user ID.");
      return;
    }

    try {
      await dispatch(deleteUsers(id)).unwrap();
      await dispatch(getUsers()).unwrap();
      showSuccessToast(CommonMessage.MFS00002.replace("%s", "User"));
      setIsDeleteModalOpen(false);
      setDeleteUser(null);
    } catch (error) {
      showErrorToast("Unable to delete user.");
      console.error("Unable to delete user:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className="margin-top-8">
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">User List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <MaterialReactTable
          columns={columns}
          data={users ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          columnResizeMode="onChange"
          enablePinning
          getRowId={(row) => row.uuid || row.id || row._id}
          state={{ isLoading }}
          initialState={{
            columnPinning: {
              left: ["user_name"],
              right: ["mrt-row-actions"],
            },
          }}
          renderRowActionMenuItems={({ row }) => [
            <MenuItem key="edit" onClick={() => openEditForm(row.original)}>
              <ListItemIcon><Edit /></ListItemIcon>
              Edit
            </MenuItem>,
            <MenuItem
              key="delete"
              onClick={() => {
                setDeleteUser(row.original);
                setIsDeleteModalOpen(true);
              }}
            >
              <ListItemIcon><Delete /></ListItemIcon>
              Delete
            </MenuItem>,
          ]}
          renderTopToolbarCustomActions={() => (
            <Button onClick={openCreateForm} variant="contained">
              Create New
            </Button>
          )}
        />
        <Dialog open={isFormOpen} onClose={closeForm} fullWidth maxWidth="sm">
          <DialogTitle>{editingUser ? "Edit User" : "Create User"}</DialogTitle>
          <DialogContent sx={{ display: "grid", gap: 2, pt: "12px !important" }}>
            <TextField
              label="User Name"
              {...register("user_name", { required: "User name is required." })}
              error={Boolean(errors.user_name)}
              helperText={errors.user_name?.message}
              required
            />
            <TextField
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required.",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email." },
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              required
            />
            <Controller
              name="role_id"
              control={control}
              rules={{ required: "Select a role." }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  value={field.value ?? ""}
                  label="Role"
                  error={Boolean(errors.role_id)}
                  helperText={errors.role_id?.message}
                  required
                >
                  {(userGroups ?? []).map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <TextField
              label={editingUser ? "New Password (optional)" : "Password"}
              type="password"
              {...register("password", {
                required: !editingUser && "Password is required.",
                minLength: { value: 8, message: "Use at least 8 characters." },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              required={!editingUser}
            />
            <TextField
              label="Confirm Password"
              type="password"
              {...register("password_confirmation", {
                validate: (value) =>
                  (!password && editingUser) ||
                  value === password ||
                  "Passwords do not match.",
                required: Boolean(password) || !editingUser,
              })}
              error={Boolean(errors.password_confirmation)}
              helperText={errors.password_confirmation?.message}
              required={!editingUser}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={closeForm}>Cancel</Button>
            <Button onClick={saveUser} variant="contained" disabled={isLoading}>
              {editingUser ? "Save Changes" : "Create User"}
            </Button>
          </DialogActions>
        </Dialog>
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeleteUser(null);
          }}
          onDelete={confirmDelete}
          message={CommonMessage.MFC00001}
        />
      </Paper>
    </Box>
  );
};

export default UsersList;
