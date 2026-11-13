import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Breadcrumbs,
  Button,
  Checkbox,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import CreateNewSubBusinessCategoryModal from "./CreateNewSubBusinessCategoryModal";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  createSubBusinessCategory,
  getSubBusinessCategories,
  updateSubBusinessCategory,
  deleteSubBusinessCategory,
  batchDeleteSubBusinessCategory,
} from "../../../features/subbusinesscategory/subbusinesscategorySlice";

import { getMainBusinessCategories } from "../../../features/mainbusinesscategory/mainbusinesscategorySlice";
import MainBusinessCategoryExcelImportButton from "../MainBusinessCategory/MainBusinessCategoryExcelImportButton";
import SubBusinessCategoryExcelImportButton from "./SubBusinessCategoryExcelImportButton";

const SubBusinessCategory = () => {
  const { subBusinessCategories, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.subBusinessCategories);

  const {
    mainBusinessCategories,
    ismainBusinessLoading,
    ismainBusinessSuccess,
    ismainBusinessError,
    mainBusinessmessage,
  } = useSelector((state) => state.mainBusinessCategories);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchApi();
    dispatch(getMainBusinessCategories());
  }, []);

  const fetchApi = useCallback(() => {
    dispatch(getSubBusinessCategories());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "main_business_category_name",
        header: "BC1 Name",
        size: 200,
        editVariant: "select",
        editSelectOptions: mainBusinessCategories,
      },
      {
        accessorKey: "bc2_code",
        header: "BC2 Code",
        size: 200,
      },
      {
        accessorKey: "bc2_name",
        header: "BC2 Name",
        size: 200,
      },
      {
        accessorKey: "bc2_name_mm",
        header: "BC2 Name Burmese",
        size: 200,
      },

      //{
      //   accessorKey: "created_by",
      //   header: "Created By",
      //   size: 200,
      //   muiTableBodyCellEditTextFieldProps: {
      //     disabled: true,
      //   },
      // },
      // {
      //   accessorKey: "created_at",
      //   header: "Created At",
      //   size: 200,
      //   muiTableBodyCellEditTextFieldProps: {
      //     disabled: true,
      //   },
      // },
      // {
      //   accessorKey: "modified_by",
      //   header: "Modified By",
      //   size: 200,
      //   muiTableBodyCellEditTextFieldProps: {
      //     disabled: true,
      //   },
      // },
      // {
      //   accessorKey: "last_modified",
      //   header: "Modified At",
      //   size: 200,
      //   muiTableBodyCellEditTextFieldProps: {
      //     disabled: true,
      //   },
      // },
    ],
    []
  );

  // useEffect(() => {
  //   dispatch(getSubBusinessCategories());
  // }, [dispatch]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleCreateNewRow = (values) => {
    dispatch(createSubBusinessCategory(values));
    fetchApi();
  };

  const batchDelete = () => {
    if (Object.keys(rowSelection).length === 0) {
      alert("Please Select one or more rows to Delete");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete selected rows?`)) {
      return;
    }
    dispatch(batchDeleteSubBusinessCategory(Object.keys(rowSelection)));
    fetchApi();
  };
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    let id = row.original.uuid;
    dispatch(updateSubBusinessCategory({ id, newData: values }));
    fetchApi();
    exitEditingMode();
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback((row) => {
    if (
      !window.confirm(`Are you sure you want to delete ${row.getValue("name")}`)
    ) {
      return;
    }
    dispatch(deleteSubBusinessCategory(row.original.uuid));
    dispatch(getSubBusinessCategories());
  }, []);

  const [rowSelection, setRowSelection] = useState({});

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Sub Business Category List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={subBusinessCategories}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          enableRowActions
          enableColumnResizing
          debugTable={isError}
          columnResizeMode="onChange"
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          subbusinesscategoryActionsColumn="last"
          enablePinning
          enableRowSelection
          getRowId={(row) => row.uuid} //give each row a more useful id
          onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
          state={{ rowSelection }} //pass our managed row selection state to the table to use
          initialState={{
            columnPinning: {
              left: ["Name"],
              right: ["mrt-row-actions"],
            },
          }}
          renderRowActionMenuItems={({ row, table }) => [
            <MenuItem key="delete" onClick={() => handleDeleteRow(row)}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              Delete
            </MenuItem>,
          ]}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <>
                <div
                  style={{
                    width: "90%",
                    padding: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    // gap: "0.5rem",
                  }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                    }}
                  >
                    <Button
                      onClick={() => setCreateModalOpen(true)}
                      variant="contained"
                    >
                      Create New Sub Business Category
                    </Button>

                    <SubBusinessCategoryExcelImportButton fetchApi={fetchApi} />
                  </Box>

                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => batchDelete()}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </div>
              </>
            );
          }}
        />
        <CreateNewSubBusinessCategoryModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />
      </Paper>
    </Box>
  );
};

export default SubBusinessCategory;
