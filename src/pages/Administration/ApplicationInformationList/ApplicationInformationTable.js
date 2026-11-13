import * as React from "react";
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, Typography, Box, Paper, Button } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

import Table from "../../../components/Table";
import AdvancedSearch from "../../../components/form/AdvancedSearch";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import { APPLICATION_SEARCH_OPTIONS } from "../../../constants/searchOptions/applicationSearchOptions";
import { APPLICATION_STATUS } from "../../../constants/applicationStatus";
import { YesNoRenderer } from "../../../common/YesNoRenderer";
import { showErrorToast, showSuccessToast } from "../../../common/ToastMessage";
import { deleteApplications, getApplication } from "../../../features/application/applicationSlice";
import ApplicationTableRowMenu from "./ApplicationTableRowMenu";

const ApplicationInformationTable = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { applications, next_page_param, isLoading } = useSelector(
    (state) => state.applications
  );

  const [gridApi, setGridApi] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    dispatch(
      getApplication({
        params: Object.fromEntries([...params]),
        firstFetch: true,
      })
    );
  }, [dispatch, params]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  );

  // ✅ handle single delete from row menu
  const handleSingleDelete = async (data) => {
    try {
      await dispatch(deleteApplications([data.id])).unwrap();
      showSuccessToast("Deleted successfully");
      await dispatch(getApplication({ params: Object.fromEntries([...params]) }));
    } catch (error) {
      console.error("error");
    }
  };

  // ✅ handle multi-delete
  const handleMultiDelete = async () => {
    if (selectedRows.length === 0) {
      showErrorToast("Please select at least one application to delete.");
      return;
    }
    setOpenDeleteDialog(true);
  };

  const confirmMultiDelete = async () => {
    if (selectedRows.length === 0) return;

    try {
      const ids = selectedRows.map((row) => row.id);

      // Dispatch the deleteApplications thunk from slice
      await dispatch(deleteApplications(ids)).unwrap();

      showSuccessToast("Selected applications deleted successfully.");
      setOpenDeleteDialog(false);
      setSelectedRows([]);

      // Optionally refresh the list
      await dispatch(getApplication({ params: Object.fromEntries([...params]), firstFetch: true })).unwrap();
    } catch (error) {
      console.error("error");
    }
  };


  const columnDefs = useMemo(
    () => [
      {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        width: 50,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        headerName: "No.",
        width: 60,
        valueGetter: "node.rowIndex + 1",
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "applicant_name",
        headerName: "Applicant Name",
        width: 200,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "category.name_en",
        headerName: "Category",
        width: 150,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "status",
        headerName: "Status",
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
        width: 150,
      },
      {
        headerName: "Actions",
        field: "menu",
        width: 100,
        pinned: "left",
        cellRenderer: ApplicationTableRowMenu,
        cellRendererParams: {
          deleteData: (data) => handleSingleDelete(data),
        },
      },
      {
        field: "applied_date",
        headerName: "Applied Date",
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD"),
        width: 180,
      },
      {
        field: "is_synced",
        headerName: "Is Synced",
        width: 120,
        cellRenderer: YesNoRenderer,
      },
      {
        field: "attachment_sync_success",
        headerName: "Attachment Sync Success",
        width: 180,
        cellRenderer: YesNoRenderer,
      },
      {
        field: "created_user.name",
        headerName: "Created By",
        width: 200,
      },
      {
        field: "created_at",
        headerName: "Created Date",
        width: 200,
        valueFormatter: (params) =>
          params.value && dayjs(params.value).format("YYYY-MM-DD hh:mm:ss A"),
      },
    ],
    []
  );

  const onSelectionChanged = () => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map((node) => node.data);
      setSelectedRows(selectedData);
    }
  };

  const handleBodyScroll = useCallback(() => {
    if (next_page_param) {
      dispatch(
        getApplication({
          params: next_page_param,
          firstFetch: false,
        })
      );
    }
  }, [dispatch, next_page_param]);

  const handleSearch = (searchData) => {
    const transformedSearchData = {};

    searchData.forEach((item) => {
      if (item.type === "date") {
        transformedSearchData[`${item.filtered_by}_from_date`] = item.value1;
        transformedSearchData[`${item.filtered_by}_to_date`] = item.value2;
      } else if (item.type === "autocomplete_status") {
        transformedSearchData[item.filtered_by] = JSON.stringify(item.value1);
      } else {
        transformedSearchData[item.filtered_by] = item.value1;
      }
    });

    dispatch(
      getApplication({
        params: {
          ...transformedSearchData,
        },
      })
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" className="margin-top-8">
        <Typography color="text.primary">Application List</Typography>
      </Breadcrumbs>

      <AdvancedSearch
        options={APPLICATION_SEARCH_OPTIONS}
        status={APPLICATION_STATUS}
        onSearch={handleSearch}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={selectedRows.length === 0}
          onClick={handleMultiDelete}
        >
          Delete Selected ({selectedRows.length})
        </Button>
      </Box>

      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={applications ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="ApplicationInformationTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onGridReady={onGridReady}
          rowSelection="multiple"
          onSelectionChanged={onSelectionChanged}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
        />
      </Paper>

      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onOk={confirmMultiDelete}
        title="Confirm Delete Applications"
        content={`Are you sure you want to delete ${selectedRows.length} selected applications?`}
      />
    </Box>
  );
};

export default React.memo(ApplicationInformationTable);
