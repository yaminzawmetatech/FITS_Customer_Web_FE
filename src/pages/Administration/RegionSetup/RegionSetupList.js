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
import { getProjectCategory } from "../../../features/projectcategory/projectcategorySlice";
import CreateEditRegionModal from "./CreateEditRegionSetupModal";
import useRegionForm from "./RegionSetupHook";
import { deleteRegion, getRegions } from "../../../features/regionSetup/regionSetupSlice";

const RegionIndex = () => {
  const {
    control,
    onSubmit,
    handleSubmit,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    editValues,
    reset,
  } = useRegionForm();

  const [editFlag, setEditFlag] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState("");

  const dispatch = useDispatch();

  // ✅ Table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "category.name_en", // will display category id (can be replaced with category name if available)
        header: "Category",
        size: 250,
      },
      {
        accessorKey: "region_name",
        header: "Region Name",
        size: 300,
      },
    ],
    []
  );

  const { regions, isLoading, isError } = useSelector(
    (state) => state.regions
  );

  const { projectCategories } = useSelector((state) => state.projectCategories);

  const fetchApi = useCallback(() => {
    dispatch(getRegions());
    dispatch(getProjectCategory());
  }, [dispatch]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  // ✅ Edit handler
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

  // ✅ Delete handler
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
      await dispatch(deleteRegion(deleteData.original.uuid)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Region"));
      await dispatch(getRegions());
      setConfirmMessage("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className="margin-top-8">
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Region List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={regions}
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
              left: ["region_name"],
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
        <CreateEditRegionModal
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
          categories={projectCategories} // ✅ Pass list of categories here
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

export default RegionIndex;
