import React, { useMemo, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, Backdrop } from "@mui/material";
import Accordion from "components/Accordion";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { getValues } from "features/smsSetup/smsSetupSlice";
import { useParams } from "react-router-dom";

const SMSFormatLines = ({
  tableData,
  setTableData,
  sms,
  valuesLoading,
  values,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const gridApiRef = useRef(null);

  const { mode, uuid } = useParams();

  useEffect(() => {
    if (mode === "edit" && sms && sms.sms_format_detail && values) {
      const defaultValues = {
        sms_body: "",
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
        value8: "",
        value9: "",
        value10: "",
      };

      const updatedTableData = sms.sms_format_detail.map((data) => {
        let newData = { ...data };
        values.forEach((item) => {
          if (newData.value1 === item.key) newData.value1 = item.value;
          if (newData.value2 === item.key) newData.value2 = item.value;
          if (newData.value3 === item.key) newData.value3 = item.value;
          if (newData.value4 === item.key) newData.value4 = item.value;
          if (newData.value5 === item.key) newData.value5 = item.value;
          if (newData.value6 === item.key) newData.value6 = item.value;
          if (newData.value7 === item.key) newData.value7 = item.value;
          if (newData.value8 === item.key) newData.value8 = item.value;
          if (newData.value9 === item.key) newData.value9 = item.value;
          if (newData.value10 === item.key) newData.value10 = item.value;
        });
        return {
          ...defaultValues,
          ...newData,
        };
      });


      const newTableData = sms?.sms_format_detail.map((format) => ({
        ...defaultValues,
        sms_body: format.sms_body,
        value1: format.value1,
        value2: format.value2,
        value3: format.value3,
        value4: format.value4,
        value5: format.value5,
        value6: format.value6,
        value7: format.value7,
        value8: format.value8,
        value9: format.value9,
        value10: format.value10,
      }));

      setTableData(updatedTableData);
    }
  }, [sms, mode, setTableData, values]);

  const handleAddRow = () => {
    const newRow = {
      sms_body: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      value9: "",
      value10: "",
    };
    setTableData((prevData) => [...prevData, newRow]);
  };

  const handleRemoveSelectedRows = () => {
    const updatedTableData = tableData.filter(
      (row) => !selectedRows.includes(row)
    );
    setTableData(updatedTableData);
    setSelectedRows([]);
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      cellDataType: false,
    };
  }, []);

  const columnDefs = useMemo(() => {
    const valueOptions = values?.map((item) => item.value) || [];

    return [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        minWidth: 70,
      },
      {
        field: "sms_body",
        headerName: "SMS Body",
        minWidth: 600,
        sortable: true,
        resizable: true,
        editable: true,
        cellEditor: "agTextCellEditor",
      },
      ...Array.from({ length: 10 }, (_, index) => ({
        field: `value${index + 1}`,
        headerName: `Value ${index + 1}`,
        minWidth: 200,
        sortable: true,
        resizable: true,
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: valueOptions,
          valuesKey: values?.map((item) => item.key) || [],
        },
        valueFormatter: ({ value }) => value,
        valueParser: ({ newValue }) => {
          const selectedOption = values?.find(
            (item) => item.value === newValue
          );
          return selectedOption ? selectedOption.key : newValue;
        },
      })),
    ];
  }, [values]);

  useEffect(() => {
    if (gridApiRef.current) {
      gridApiRef.current.setRowData(tableData);
    }
  }, [tableData]);

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const onCellValueChanged = (params) => {
    const { data } = params;
    setTableData((prevData) =>
      prevData.map((row) =>
        row === data
          ? { ...row, [params.colDef.field]: getKeyValue(params.newValue) }
          : row
      )
    );
  };

  const getKeyValue = (selectedValue) => {
    const selectedOption = values?.find((item) => item.value === selectedValue);
    return selectedOption ? selectedOption.value : selectedValue;
  };

  const onSelectionChanged = () => {
    const selectedNodes = gridApiRef.current.getSelectedNodes();
    const selectedRows = selectedNodes.map((node) => node.data);
    setSelectedRows(selectedRows);
  };

  return (
    <Accordion title="SMS Format Lines">
      <Box sx={{ mt: 1 }}>
        <Button onClick={handleAddRow} variant="contained" color="primary">
          Add New SMS
        </Button>
        <Button
          onClick={handleRemoveSelectedRows}
          variant="contained"
          color="secondary"
          style={{ marginLeft: "5px" }}
        >
          Remove
        </Button>
        {valuesLoading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={valuesLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div
            className="ag-theme-balham"
            style={{ height: "calc(100vh - 400px)", marginTop: "5px", }}
          >
          <AgGridReact
            gridOptions={{
              rowData: tableData || [],
              columnDefs: columnDefs,
              defaultColDef: defaultColDef,
              onCellValueChanged: onCellValueChanged,
              onSelectionChanged: onSelectionChanged,
              alwaysShowHorizontalScroll: true,
              suppressRowClickSelection: true,
            }}
            suppressCopyRowsToClipboard={true}
            enableRangeSelection={true}
            onGridReady={onGridReady}
            rowSelection="multiple"
            agThemeStyle={{
              height: "300px",
            }}
          />
          </div>
        )}
      </Box>
    </Accordion>
  );
};

export default SMSFormatLines;
