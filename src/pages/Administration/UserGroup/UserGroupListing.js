import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from '@mui/material/Chip';
import { MaterialReactTable } from "material-react-table";
import {
  Button,
  MenuItem,
  Typography,
  Breadcrumbs,
  ListItemIcon,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserGroup, getUserGroups } from "../../../features/userGroup/userGroupSlice";
import { getPermissionsets } from "../../../features/persmissionsets/permissionsetsSlice";
import { useNavigate, Link } from "react-router-dom";
import openNewWindow from "utils/windowUtils";

const UserGroupList = () => {

  const dispatch = useDispatch();

  const { userGroups,
    isLoading,
    isSuccess,
    isError,
    message
  } = useSelector(
    (state) => state.userGroups
  )
  const { permissions } = useSelector(
    (state) => state.permissions
  )
  if(permissions.length <= 0){
    dispatch(getPermissionsets())
  }

  useEffect(()=>{
    dispatch(getUserGroups());
  },[dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
      },
      {
        accessorKey: "permissions",
        header: "Permissions",
        size: 200,
        

        enableColumnFilter: false,
        enableRowGroup: false,
        Cell: ({ cell }) => (
          <Box
            component="span"
          >
            {cell.getValue()?.map((item, index) => (
              <Chip label={item.name} key={index} sx={{  m:0.5 }} />
            ))}
          </Box>
        )
      },  
      {
        accessorKey: "description", //access nested data with dot notation
        header: "Description",
        size: 100
      }
    ],
    []
  );

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("name")}`
        )
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      dispatch(deleteUserGroup(row.original.uuid));
      dispatch(getUserGroups());
    },
    [dispatch]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">User Group List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={userGroups}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          // editingMode="modal" //default
          enableColumnOrdering
          // enableEditing
          enableRowActions
          enableColumnResizing
          columnResizeMode="onChange"
          // onEditingRowSave={handleSaveRowEdits}
          // onEditingRowCancel={handleCancelRowEdits}
          positionActionsColumn="last"
          enablePinning
          state={{ isLoading: isLoading}}
          initialState={{
            columnPinning: {
              left: ["Name"],
              right: ["mrt-row-actions"],
            },
          }}
          renderRowActionMenuItems={({ row, table }) => [
            <MenuItem
              component={Link}
              onClick={() =>
                openNewWindow(
                  `/administration/user-group/${row.original.uuid}/edit`
                )}
              key="edit"
            >
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              Edit
            </MenuItem>,
            <MenuItem key="delete" onClick={() => handleDeleteRow(row)}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              Delete
            </MenuItem>,
          ]}

          renderTopToolbarCustomActions={({ table }) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                }}
              >
                <Button
                  onClick={() =>
                    openNewWindow(
                      `/administration/user-group/create`
                    )}
                  variant="contained"
                >
                  Create New
                </Button>
              </div>
            );
          }}
        />
      </Paper>
    </Box>
  );
};

export default UserGroupList;
