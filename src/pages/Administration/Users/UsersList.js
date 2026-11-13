import * as React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { getUsers, syncWebUsers } from "../../../features/users/usersSlice";
import { showSuccessToast } from "../../../common/ToastMessage";

const UsersList = () => {
  const dispatch = useDispatch();
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const { users, isLoading } = useSelector((state) => state.users);



  // define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "User Name",
        size: 100,
      },
      // {
      //   accessorKey: "password",
      //   header: "Password",
      //   size: 200,
      //   show: false,
      // },
      // {
      //   accessorKey: "password_confirmation",
      //   header: "Confirm Password",
      //   size: 200,
      //   show: false,
      // },
      // {
      //   accessorKey: "father_name",
      //   header: "Father Name",
      //   size: 200,
      // },
      // {
      //   accessorKey: "dob",
      //   header: "Date of Birth",
      //   size: 200,
      // },
      // {
      //   accessorKey: "nrc_state",
      //   header: "NRC State",
      //   size: 200,
      // },
      // {
      //   accessorKey: "nrc_township",
      //   header: "NRC Township",
      //   size: 200,
      // },
      // {
      //   accessorKey: "nrc_remark",
      //   header: "NRC Remark",
      //   size: 200,
      // },
      // {
      //   accessorKey: "nrc_number",
      //   header: "NRC number",
      //   size: 200,
      // },
      // {
      //   accessorKey: "nrc",
      //   header: "Full NRC",
      //   size: 200,
      // },
      // {
      //   accessorKey: "csc",
      //   header: "CSC",
      //   size: 200,
      // },
      // {
      //   accessorKey: "userGroup",
      //   header: "User Group",
      //   size: 200,
      // },
      // {
      //   accessorKey: "department",
      //   header: "Department",
      //   size: 200,
      // },
      // {
      //   accessorKey: "position",
      //   header: "Position",
      //   size: 200,
      // },
      // {
      //   accessorKey: "level",
      //   header: "Level",
      //   size: 200,
      // },
      {
        accessorKey: "email",
        header: "Email",
        size: 150,
      },
      {
        accessorKey: "role.name",
        header: "Role",
        size: 150,
      },
      // {
      //   accessorKey: "office_email",
      //   header: "Office Email",
      //   size: 200,
      // },
      // {
      //   accessorKey: "personal_phone",
      //   header: "Personal Phone",
      //   size: 200,
      // },
      // {
      //   accessorKey: "company_phone",
      //   header: "Company Phone",
      //   size: 200,
      // },
      // {
      //   accessorKey: "description",
      //   header: "Description",
      //   size: 200,
      // },
    ],
    []
  );

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSyncWebUsers = () => {
    try {
      dispatch(syncWebUsers());
      fetchApi();
      showSuccessToast("Web Users Synced Successfully");
    } catch (error) {
      console.error("Error syncing web users:", error);
    }
  }

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">User List</Typography>
      </Breadcrumbs>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSyncWebUsers}
          disabled={isLoading}
        >
          Sync Web Users
        </Button>
      </Box>
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <MaterialReactTable
          columns={columns}
          data={users ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          muiTableBodyCellEditTextFieldProps={{
            variant: "outlined",
          }}
          enableStickyHeader
          enableColumnOrdering
          // enableRowActions
          enableColumnResizing
          columnResizeMode="onChange"
          // positionActionsColumn="last"
          state={{ isLoading: isLoading }} //pass our managed row selection state to the table to use
          enablePinning
        />
      </Paper>
    </Box>
  );
};

export default UsersList;
