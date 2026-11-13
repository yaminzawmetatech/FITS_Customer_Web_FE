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
import { getNRCTownships, syncWebNrcTownships } from "../../../features/nrcTownship/nrcTownshipSlice";

const NRCTownshipList = () => {
  const dispatch = useDispatch();

  const { nrcTownships, isLoading } = useSelector((state) => state.nrcTownships);

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
        accessorKey: "township_nrc_code",
        header: "Township NRC Code",
        size: 120,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 250,
      },
      {
        accessorKey: "nrc_state.name",
        header: "NRC State",
        size: 120,
      },
    ],
    []
  );

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(getNRCTownships());
  }, [dispatch]);

  const handleSyncWebNRCTownships = () => {
    try {
      dispatch(syncWebNrcTownships()).then(() => {
        fetchApi();
        showSuccessToast("Web NRC Townships Synced Successfully");
      });
    } catch (error) {
      console.error("Error syncing NRC Townships:", error);
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
        <Typography color="text.primary">NRC Townships</Typography>
      </Breadcrumbs>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSyncWebNRCTownships}
          disabled={isLoading}
        >
          Sync NRC Townships
        </Button>
      </Box>
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <MaterialReactTable
          columns={columns}
          data={nrcTownships ?? []}
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

export default NRCTownshipList;
