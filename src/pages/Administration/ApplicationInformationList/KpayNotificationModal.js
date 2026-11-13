import React, { useEffect, useMemo, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Table from "components/Table";
import dayjs from "dayjs";
import { reset } from "features/reminderAllocation/reminderAllocationHistorySlice";
import { getAllKpayNotifications } from "features/kpayNotification/kpayNotificationSlice";

const ReminderAllocationHistoryModal = ({
  selectedApplicationId,
  open,
  handleClose,
}) => {
  const dispatch = useDispatch();

  const { kpayNotifications, next_page_param, isLoading } = useSelector(
    (state) => state.kpayNotifications
  );

  const rowData = kpayNotifications || [];
  const defaultColDef = useMemo(() => ({}), []);

  useEffect(() => {
    if (selectedApplicationId && open) {
      dispatch(
        getAllKpayNotifications({
          params: {
            application_id: selectedApplicationId,
          },
          firstFetch: true,
        })
      );
    }
  }, [dispatch, selectedApplicationId, open]);

  const handleBodyScroll = useCallback(async () => {
    if (next_page_param) {
      dispatch(
        getAllKpayNotifications({
          params: next_page_param,
          firstFetch: false,
          params: {
            application_id: selectedApplicationId,
          },
        })
      );
    }
  }, [dispatch, next_page_param, selectedApplicationId]);

  const columnDefs = useMemo(
    () => [
      {
        field: "row",
        headerName: "No",
        valueGetter: "node.rowIndex + 1",
        width: 80,
        sortable: true,
        resizable: true,
      },
      {
        field: "partner_id",
        headerName: "Partner ID",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "title",
        headerName: "Title",
        width: 250,
        sortable: true,
        resizable: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 500,
        sortable: true,
        resizable: true,
      },
      {
        field: "created_at",
        headerName: "Created Date",
        width: 200,
        sortable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
        resizable: true,
      },
    ],
    []
  );

  const handleModalClose = () => {
    dispatch(reset());
    handleClose();
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%" } }}
      maxWidth="md"
      open={open}
    >
      <DialogTitle
        id="scroll-dialog-title"
        variant="h5"
        sx={{ color: "#1890ff" }}
      >
        Kpay Notification List
      </DialogTitle>
      <DialogContent dividers>
        <>
          <Table
            rowData={rowData ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="KPayNotificationById"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 300px)",
            }}
            loading={isLoading}
            onScrollBottomEnd={handleBodyScroll}
          />
        </>
      </DialogContent>
      <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
        <Button
          variant="outlined"
          sx={{
            color: "red",
            borderColor: "red",
            "&:hover": {
              backgroundColor: "rgba(255, 0, 0, 0.04)",
              borderColor: "red",
            },
          }}
          onClick={handleModalClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ReminderAllocationHistoryModal);
