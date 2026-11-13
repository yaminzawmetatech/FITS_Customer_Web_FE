import React, { useMemo, useEffect, useCallback } from "react";
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
import { getIncompleteFields } from "features/incompleteFields/incompleteFieldsSlice";
import { useParams } from "react-router";
import { getActualPaymentLinesByContractId } from "features/contract/contractDetailSlice";
import { CurrencyFormatter } from "common/CurrencyFormatter";
import ActualPaymentLinesExportButton from "./ActualPaymentLinesHistoryExportButton";

const ActualPaymentLines = ({ open, handleClose, id, applicationId }) => {
  const dispatch = useDispatch();

  const { actualPaymentLinesByContractId, isLoading } = useSelector(
    (state) => state.actualPaymentLinesByContractId
  );

  useEffect(() => {
    if (open === true) {
      dispatch(getActualPaymentLinesByContractId({ id }));
    }
  }, [id, dispatch, open]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  const columnDefs = useMemo(
    () => [
      {
        field: "row",
        headerName: "Line No",
        valueGetter: "node.rowIndex + 1",
        width: 100,
        sortable: true,
        resizable: true,
      },
      {
        field: "status",
        width: 100,
        headerName: "Status",
        sortable: false,
        resizable: true,
        valueFormatter: (params) =>
          params.value && params.value.toString().toUpperCase(),
      },
      {
        field: "monthly_installment",
        headerName: "Monthly Installment",
        width: 200,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "due_date",
        headerName: "Due Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "total_paid_amount",
        headerName: "Paid Amount",
        width: 200,
        sortable: false,
        resizable: true,
        valueFormatter: CurrencyFormatter,
      },
      {
        field: "last_paid_date",
        headerName: "Pay Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 200,
        sortable: true,
        resizable: true,
      },
    ],
    []
  );

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
        {applicationId} Actual Payment Lines
      </DialogTitle>
      <DialogContent dividers>
        <ActualPaymentLinesExportButton id={id} applicationId={applicationId} />
        <Table
          //searchParams={params}
          rowData={actualPaymentLinesByContractId ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="ActualPaymentLinesList"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 300px)",
          }}
          //onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
        />
      </DialogContent>
      <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
        <Button variant="contained" onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ActualPaymentLines);
