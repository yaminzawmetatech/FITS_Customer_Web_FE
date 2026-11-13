import * as React from "react";
import { useCallback, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumbs,
  Button,
  Typography,
} from "@mui/material";
import { showSuccessToast } from "../../../common/ToastMessage";
import { getNRCStates, syncWebNrcStates } from "../../../features/nrcState/nrcStateSlice";

const NRCStateList = () => {
  const dispatch = useDispatch();

  const { nrcStates, isLoading } = useSelector((state) => state.nrcStates);

  // define columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "web_sys_table_id",
        header: "Web System ID",
        size: 100,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "state_code",
        header: "State Code",
        size: 120,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 250,
      },
    ],
    []
  );

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(getNRCStates());
  }, [dispatch]);

  const handleSyncWebNRCStates = () => {
    try {
      dispatch(syncWebNrcStates()).then(() => {
        fetchApi();
        showSuccessToast("Web NRC States Synced Successfully");
      });
    } catch (error) {
      console.error("Error syncing NRC States:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">NRC States</Typography>
      </Breadcrumbs>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSyncWebNRCStates}
          disabled={isLoading}
        >
          Sync NRC States
        </Button>
      </Box>
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <MaterialReactTable
          columns={columns}
          data={nrcStates ?? []}
          muiTableContainerProps={{
            sx: { maxHeight: "calc(100vh - 220px)" },
          }}
          muiTableBodyCellEditTextFieldProps={{
            variant: "outlined",
          }}
          enableStickyHeader
          enableColumnOrdering
          enableColumnResizing
          columnResizeMode="onChange"
          state={{ isLoading: isLoading }}
          enablePinning
        />
      </Paper>
    </Box>
  );
};

export default NRCStateList;
