import * as React from "react";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumbs, Typography, Box, Paper } from "@mui/material";
import Table from "../../../../components/Table";
import dayjs from "dayjs";
import { Switch } from "@mui/material";
import { getApplication } from "../../../features/application/applicationSlice";

const ApplicationInformationListIndex = () => {
  const dispatch = useDispatch();

  const [params, setParams] = useSearchParams();
  // const { categoryId, categoryName } = useParams();
  const [selectedRow, setSelectedRow] = useState();

  const [transformedSearchDataResponse, setTransformedSearchDataResponse] =
    useState();

  const transformedSearchDataRef = useRef();

  useEffect(() => {
    transformedSearchDataRef.current = transformedSearchDataResponse;
  }, [transformedSearchDataResponse]);




  const { application , next_page_param, isLoading } = useSelector(
    (state) => state.application
  );

  const [applicationState, setApplicationState] = useState([]);

  const apiCalledRef = useRef(false); // Prevent double calls

  const fetchApi = useCallback(() => {
    dispatch(
      getApplication({})
    );
  }, [categoryId, dispatch, params]);

  useEffect(() => {
    if (apiCalledRef.current) return;
    fetchApi();
    apiCalledRef.current = true;
  }, [fetchApi]);

  const defaultColDef = useMemo(
    () => ({
      valueSetter: (params) => {},
    }),
    []
  );

  const columnDefs = useMemo(
    () => [
      {
        headerName: "No.",
        width: 50,
        valueGetter: "node.rowIndex + 1",
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      },
      {
        field: "applicant_name",
        headerName: "Applicant Name",
        width: 200,
        sortable: true,
        resizable: true,
      },
      {
        field: "category.name_en",
        headerName: "Category",
        width: 150,
        sortable: true,
        resizable: true,
        pinned: "left",
        lockPosition: "left",
        lockPinned: true,
      }
      // {
      //   headerName: "",
      //   field: "menu",
      //   width: 50,
      //   lockPosition: "left",
      //   pinned: "left",
      //   cellRenderer: ApplicationTableRowMenu,
      //   cellRendererParams: {
      //     deleteData: (data) => {},
      //     categoryName,
      //     category,
      //   },
      //   lockPinned: true,
      // },

    ],
    []
  );

  const handleBodyScroll = useCallback(
    async (event) => {
      if (next_page_param) {
        dispatch(
          getApplication({
            params: next_page_param,
            firstFetch: false,
          })
        );
      }
    },
    [dispatch, next_page_param]
  );

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

    setTransformedSearchDataResponse(transformedSearchData);
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
        <Typography color="text.primary">Credit Management</Typography>
        <Typography color="text.primary">Application List</Typography>
      </Breadcrumbs>
      {/* <AdvancedSearch
        options={searchOptions}
        status={statusOptions}
        onSearch={handleSearch}
        searchValue={searchValue}
        searchCategory={categoryId}
      /> */}
      {/* <ApplicationListAppBar fetchApi={fetchApi} category={category} /> */}
      <Paper sx={{ width: "100%" }}>
        <Table
          searchParams={params}
          setSearchParams={setParams}
          rowData={applicationState ?? []}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          name="ApplicationInformationListTable"
          rowKey="id"
          agThemeStyle={{
            height: "calc(100vh - 170px)",
          }}
          onScrollBottomEnd={handleBodyScroll}
          loading={isLoading}
          getRowStyle={getRowStyle}
        />
      </Paper>
      {/* <AssignUserModal
        open={openAssignUserModal}
        onClose={() => setOpenAssignUserModal(false)}
        selectedRow={selectedRow}
        fetchApi={fetchApi}
      /> */}
    </Box>
  );
};

export default React.memo(ApplicationInformationListIndex);
