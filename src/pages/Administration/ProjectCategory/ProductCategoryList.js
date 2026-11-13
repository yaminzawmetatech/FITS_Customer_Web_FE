import * as React from "react";
import {
  Box,
  Paper,
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import DeleteConfirmationModal from "../../../common/DeleteConfirmationModal";
import CommonMessage from "../../../common/CommonMessage";
import { showSuccessToast } from "../../../common/ToastMessage";
import useProductCategoryForm from "./ProductCategoryHook";
import CreateEditProductCategoryModal from "./CreateEditProductCategoryModal";
import { deleteProjectCategory, getProjectCategory } from "../../../features/projectcategory/projectcategorySlice";

const ProductCategoryIndex = () => {
  const {
    control,
    onSubmit,
    handleSubmit,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    editValues,
    reset,
  } = useProductCategoryForm();

  const [editFlag, setEditFlag] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState("");

  const dispatch = useDispatch();

  // Define table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "image",
        header: "Image",
        size: 150,
        Cell: ({ cell }) => (
          <img
            src={cell.getValue()}
            alt="category"
            style={{ width: "60px", height: "60px", borderRadius: "8px" }}
          />
        ),
      },
      {
        accessorKey: "name_en",
        header: "Name (EN)",
        size: 200,
      },
      {
        accessorKey: "name_mm",
        header: "Name (MM)",
        size: 200,
      },
      {
        accessorKey: "remark_en",
        header: "Remark (EN)",
        size: 300,
      },
      {
        accessorKey: "remark_mm",
        header: "Remark (MM)",
        size: 300,
      },
      {
        accessorKey: "interest_rate",
        header: "Interest Rate",
        size: 100,
        Cell: ({ cell }) => `${cell.getValue()}%`,
      },
      {
        accessorKey: "eligible_rate",
        header: "Eligible Rate",
        size: 100,
        Cell: ({ cell }) => `${cell.getValue()}%`,
      },
    ],
    []
  );

  const { projectCategories, isLoading, isError } = useSelector(
    (state) => state.projectCategories
  );

  const fetchApi = useCallback(() => {
    dispatch(getProjectCategory());
  }, [dispatch]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  // Edit handler
  const editClick = (row) => {
    setCreateModalOpen(true);
    setEditFlag(true);

    const updatedValues = { ...row.original };
    for (const key in updatedValues) {
      if (updatedValues[key] === "---") {
        updatedValues[key] = "";
      }
    }

    setEditValues(updatedValues);
  };

  // Delete handler
  const handleDeleteRow = (row) => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteData(row);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
  };

  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      await dispatch(deleteProjectCategory(deleteData.original.uuid)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Product Category"));
      await dispatch(getProjectCategory()).unwrap();
      setConfirmMessage("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Product Category List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={projectCategories}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          debugTable={isError}
          columnResizeMode="onChange"
          enablePinning
          state={{ isLoading: isLoading }}
          getRowId={(row) => row.uuid}
          initialState={{
            columnPinning: {
              left: ["name_en"],
              right: ["mrt-row-actions"],
            },
          }}
          renderRowActionMenuItems={({ row }) => [
            <MenuItem key="edit" onClick={() => editClick(row)}>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              Edit
            </MenuItem>,
            <MenuItem key="delete" onClick={() => handleDeleteRow(row)}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              Delete
            </MenuItem>,
          ]}
          renderTopToolbarCustomActions={() => (
            <div
              style={{
                width: "90%",
                padding: "0.5rem",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={() => {
                  setCreateModalOpen(true);
                  setEditFlag(false);
                }}
                variant="contained"
              >
                Create New
              </Button>
            </div>
          )}
        />
        <CreateEditProductCategoryModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          editValues={editValues}
          setEditValues={setEditValues}
          editFlag={editFlag}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          onDelete={handleDeleteConfirmed}
          message={confirmMessage}
        />
      </Paper>
    </Box>
  );
};

export default ProductCategoryIndex;
