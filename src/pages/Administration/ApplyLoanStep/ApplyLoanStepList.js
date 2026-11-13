import * as React from "react";
import {
  Box,
  Paper,
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  Stack,
  Chip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { MaterialReactTable } from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  getApplyLoanSteps,
  deleteApplyLoanStep,
} from "../../../features/applyLoanStep/applyLoanStepSlice";
import DeleteConfirmationModal from "../../../common/DeleteConfirmationModal";
import CommonMessage from "../../../common/CommonMessage";
import { showSuccessToast } from "../../../common/ToastMessage";
import useApplyLoanStepForm from "./ApplyLoanStepHook";
import CreateEditApplyLoanStepModal from "./CreateEditApplyLoanStepModal";

const ApplyLoanStepIndex = () => {
  const {
    control,
    onSubmit,
    handleSubmit,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    editValues,
    reset,
  } = useApplyLoanStepForm();

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
            alt="step"
            style={{ width: "60px", height: "60px", borderRadius: "8px" }}
          />
        ),
      },
      {
        accessorKey: "description_en",
        header: "Description (EN)",
        size: 300,
      },
      {
        accessorKey: "description_mm",
        header: "Description (MM)",
        size: 300,
      },
    ],
    []
  );

  const { applyLoanSteps, isLoading, isError } = useSelector(
    (state) => state.applyLoanSteps
  );

  const fetchApi = useCallback(() => {
    dispatch(getApplyLoanSteps());
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
      await dispatch(deleteApplyLoanStep(deleteData.original.uuid)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Apply Loan Step"));
      await dispatch(getApplyLoanSteps());
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
        <Typography color="text.primary">Apply Loan Step List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={applyLoanSteps}
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
              left: ["description_en"],
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
        <CreateEditApplyLoanStepModal
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

export default ApplyLoanStepIndex;
