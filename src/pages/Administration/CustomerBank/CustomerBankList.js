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
import { getCustomerBanks, syncWebCustomerBanks } from "../../../features/customerBank/customerBankSlice";

const CustomerBankList = () => {
  const dispatch = useDispatch();

  const { customerBanks, isLoading } = useSelector((state) => state.customerBanks);

  // define columns
  const columns = useMemo(
    () => [
      // {
      //   accessorKey: "web_sys_table_id",
      //   header: "Web System ID",
      //   size: 100,
      // },
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "code",
        header: "Code",
        size: 120,
      },
    ],
    []
  );

  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(getCustomerBanks());
  }, [dispatch]);

  const handleSyncWebCustomerBanks = () => {
    try {
      dispatch(syncWebCustomerBanks()).then(() => {
        fetchApi();
        showSuccessToast("Web Customer Banks Synced Successfully");
      });
    } catch (error) {
      console.error("Error syncing Customer Bank:", error);
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
        <Typography color="text.primary">Customer Banks</Typography>
      </Breadcrumbs>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSyncWebCustomerBanks}
          disabled={isLoading}
        >
          Sync Customer Bank
        </Button>
      </Box>
      <Paper sx={{ width: "100%", overflowX: "auto" }}>
        <MaterialReactTable
          columns={columns}
          data={customerBanks ?? []}
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

export default CustomerBankList;
