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
import {
  getDocumentTypes,
} from "../../../features/documentAccessSetup/documentAccessSetupSlice"; // Document Types API
import CreateEditDocumentAccessModal from "./CreateEditDocumentAccessSetupModal";
import useDocumentAccessForm from "./DocumentAccessSetupHook";
import {
  getDocumentAccessSetups,
  deleteDocumentAccessSetup,
} from "../../../features/documentAccessSetup/documentAccessSetupSlice";
import { getProjectCategory } from "../../../features/projectcategory/projectcategorySlice";

const DocumentAccessIndex = () => {
  const {
    control,
    onSubmit,
    handleSubmit,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    editValues,
    reset,
    documentTypes,  // ✅ Get document types from the hook
  } = useDocumentAccessForm();

  const [editFlag, setEditFlag] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState("");

  const dispatch = useDispatch();

  // ✅ Table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "category.name_en",
        header: "Category",
        size: 250,
      },
      {
        accessorKey: "web_sys_name_en",
        header: "Web Sys Name",
        size: 300,
      },
      {
        accessorKey: "web_sys_code",
        header: "Web Sys Code",
        size: 200,
      },
      {
        accessorKey: "name_mm",
        header: "Name (MM)",
        size: 250,
      },
    ],
    []
  );

  const { documentAccessSetups, isLoading, isError } = useSelector(
    (state) => state.documentAccessSetups
  );

  // const { documentTypes } = useSelector((state) => state.documentAccessSetups);
  const { projectCategories } = useSelector((state) => state.projectCategories);

  const fetchApi = useCallback(() => {
    dispatch(getDocumentAccessSetups());
    dispatch(getProjectCategory());
    // dispatch(getDocumentTypes());
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
      await dispatch(deleteDocumentAccessSetup(deleteData.original.uuid)).unwrap();

      showSuccessToast(
        CommonMessage.MFS00002.replace("%s", "Document Access Setup")
      );
      await dispatch(getDocumentAccessSetups());
      setConfirmMessage("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className="margin-top-8">
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Document Access List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={documentAccessSetups}
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
              left: ["name_mm"],
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
        <CreateEditDocumentAccessModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          editValues={editValues}
          setEditValues={setEditValues}
          editFlag={editFlag}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          categories={projectCategories}        // ✅ Pass categories
          documentTypes={documentTypes}  // ✅ Pass document types
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

export default DocumentAccessIndex;
