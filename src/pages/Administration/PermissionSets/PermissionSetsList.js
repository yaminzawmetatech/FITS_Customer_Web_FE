import * as React from "react";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MaterialReactTable } from "material-react-table";
import {
  Breadcrumbs,
  Typography,
} from "@mui/material";
import { getPermissionsets } from "../../../features/persmissionsets/permissionsetsSlice";


const PermissionSetsList = () => {
  const { permissions,
    isLoading,
    isSuccess,
    isError,
    message
  } = useSelector(
    (state) => state.permissions
  )
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPermissionsets());
  },[dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", 
        header: "PermissionName",
        size: 200,
      },
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Permission Sets</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          data={permissions ?? []}
          state={{ isLoading: isLoading }}
          columns={columns}
          // data={permissions}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          editingMode="modal" //default
          columnResizeMode="onChange"          
          positionActionsColumn="last"
          enablePinning
        />
      </Paper>
    </Box>
  );
};

export default PermissionSetsList;
