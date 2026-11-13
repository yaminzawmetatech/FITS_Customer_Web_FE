import React, { useMemo , useEffect } from "react";
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


const ToolbarIncompleteFieldsHistoryModal = ({ open, handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();


  const { incompleteFields, isLoading } = useSelector((state) => state.incompleteFields);

  useEffect(() => {
    dispatch(getIncompleteFields({ id }));
  
}, [id, dispatch]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  const columnDefs = useMemo(
    () => [
      {
        field: "fields",
        headerName: "Application Information",
        width: 200,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          const fields = JSON.parse(params.data.fields);
          const applicationFields = Object.values(fields).filter(
            (field) => field.group.startsWith("Application")
          );
          const applicationValues = applicationFields.map((field) => field.value);
          return applicationValues.join(", ");
        },
      },
      {
        field: "fields",
        headerName: "Guarantor Information",
        width: 200,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          const fields = JSON.parse(params.data.fields);
          const guarantorFields = Object.values(fields).filter(
            (field) => field.group.startsWith("Guarantor")
          );
          const guarantorValues = guarantorFields.map(
            (field) => field.value
          );
          return guarantorValues.join(", ");
        },
      },
      {
        field: "fields",
        headerName: "Reference Information",
        width: 200,
        sortable: true,
        resizable: true,
        valueGetter: (params) => {
          const fields = JSON.parse(params.data.fields);
          const referenceFields = Object.values(fields).filter(
            (field) => field.group.startsWith("Reference")
          );
          const referenceValues = referenceFields.map(
            (field) => field.value
          );          
          return referenceValues.join(", ");
        },
      },
      {
        field: "latest_response_date",
        headerName: "Response Date",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
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
      {
        field: "created_user.user_name",
        headerName: "Created By",
        width: 200,
        resizable: true,
      },
      {
        field: "updated_at",
        headerName: "Modified Date",
        width: 200,
        sortable: true,
        resizable: true,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
      {
        field: "modified_user.user_name",
        headerName: "Modified By",
        width: 200,
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
        Incomplete Fields History List
      </DialogTitle>
      <DialogContent dividers>
          <Table
            //searchParams={params}
            rowData={incompleteFields ?? []}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            name="IncompleteFieldsHistoryList"
            rowKey="id"
            agThemeStyle={{
              height: "calc(100vh - 300px)",
            }}
            //onScrollBottomEnd={handleBodyScroll}
            loading={isLoading}
        />
      </DialogContent>
      <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
        <Button variant="contained" 
          onClick={handleClose}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ToolbarIncompleteFieldsHistoryModal);
