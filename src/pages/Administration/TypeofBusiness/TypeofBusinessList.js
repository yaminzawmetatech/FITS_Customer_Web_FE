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
import { Check, Delete } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import CreateNewTypeofBusinessModal from "./CreateNewTypeofBusinessModal";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  createTypeofBusiness,
  getTypeofBusinesses,
  updateTypeofBusiness,
  deleteTypeofBusiness,
  batchDeleteTypeofBusiness,
} from "../../../features/typeofbusiness/typeofbusinessSlice";

const TypeofBusinessList = () => {
  const { typeofBusinesses, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.typeofBusinesses);

  const columns = useMemo(
    () => [
      {
        accessorKey: "code",
        header: "Code",
        size: 200,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypeofBusinesses());
  }, [dispatch]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleCreateNewRow = (values) => {
    dispatch(createTypeofBusiness(values));
    dispatch(getTypeofBusinesses());
  };

  const batchDelete = () => {
    if (Object.keys(rowSelection).length === 0) {
      alert("Please Select one or more rows to Delete");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete selected rows?`)) {
      return;
    }
    dispatch(batchDeleteTypeofBusiness(Object.keys(rowSelection)));
    dispatch(getTypeofBusinesses());
  };
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    let id = row.original.uuid;
    dispatch(updateTypeofBusiness({ id, newData: values }));
    dispatch(getTypeofBusinesses());

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
    dispatch(deleteTypeofBusiness(row.original.uuid));
    dispatch(getTypeofBusinesses());
  }, []);

  const [rowSelection, setRowSelection] = useState({});

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Type of Business List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={typeofBusinesses}
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
          typeofbusinessActionsColumn="last"
          enablePinning
          // enableRowSelection
          getRowId={(row) => row.uuid} //give each row a more useful id
          // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
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
                  <Button
                    onClick={() => setCreateModalOpen(true)}
                    variant="contained"
                  >
                    Create New Type of Business
                  </Button>
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
        <CreateNewTypeofBusinessModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
        />
      </Paper>
    </Box>
  );
};

export default TypeofBusinessList;
