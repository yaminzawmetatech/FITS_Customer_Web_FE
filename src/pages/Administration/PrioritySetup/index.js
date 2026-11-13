import React from "react";
import {
  Box,
  Paper,
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Edit } from "../../../../node_modules/@mui/icons-material/index";
import { Delete } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { MaterialReactTable } from "material-react-table";
import { useDispatch } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  getPriorities,
  deletePriority,
} from "../../../features/prioritySetup/prioritySlice";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";
import usePrioritySetupForm from "./hook/usePrioritySetupForm";
import CommonMessage from "common/CommonMessage";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CreateEditPrioritySetupModal from "./CreateEditPrioritySetupModal";

const PriorityIndex = () => {
  const dispatch = useDispatch();
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [deleteData, setDeleteData] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    control,
    onSubmit,
    handleSubmit,
    priorities,
    priorityProperties,
    projectCategories,
    createModalOpen,
    editValues,
    isError,
    isLoading,
    setCreateModalOpen,
    setEditValues,
    reset,
    watch,
    setValue,
  } = usePrioritySetupForm();

  const columns = useMemo(
    () => [
      {
        accessorKey: "priority_one",
        header: "Priority One",
        size: 200,
      },
      {
        accessorKey: "priority_two",
        header: "Priority Two",
        size: 200,
      },
      {
        accessorKey: "priority_three",
        header: "Priority Three",
        size: 200,
      },
      {
        accessorKey: "priority_four",
        header: "Priority Four",
        size: 200,
      },
      {
        accessorKey: "priority_five",
        header: "Priority Five",
        size: 200,
      },
      {
        accessorKey: "priority_six",
        header: "Priority Six",
        size: 200,
      },
      {
        accessorKey: "category",
        header: "Category",
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

  const fetchApi = useCallback(() => {
    dispatch(getPriorities());
  }, [dispatch]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  //click edit button
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

  // click delete button
  const handleDeleteRow = (row) => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteData(row);
  };

  //delete modal close
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
  };

  //confirm to delete
  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      await dispatch(deletePriority(deleteData.original.uuid)).unwrap();
      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Priority Setup"));
      await dispatch(getPriorities());
      setConfirmMessage("");
    } catch (error) {
      showErrorToast(CommonMessage.MFE00009.replace("%s", "Priority Setup"));
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
        <Typography color="text.primary">Priority List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={priorities}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          debugTable={isError}
          columnResizeMode="onChange"
          projectcategoryActionsColumn="last"
          enablePinning
          state={{ isLoading: isLoading }}
          getRowId={(row) => row.uuid} //give each row a more useful id
          initialState={{
            columnPinning: {
              left: ["Name"],
              right: ["mrt-row-actions"],
            },
          }}
          renderRowActionMenuItems={({ row, table }) => [
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
                    onClick={() => {
                      setCreateModalOpen(true);
                      setEditFlag(false);
                    }}
                    variant="contained"
                  >
                    Create New
                  </Button>
                </div>
              </>
            );
          }}
        />
        <CreateEditPrioritySetupModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          editValues={editValues}
          setEditValues={setEditValues}
          editFlag={editFlag}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          watch={watch}
          priorityProperties={priorityProperties}
          projectCategories={projectCategories}
          setValue={setValue}
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

export default PriorityIndex;
