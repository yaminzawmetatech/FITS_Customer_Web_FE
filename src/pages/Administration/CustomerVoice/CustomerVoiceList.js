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
import DeleteConfirmationModal from "../../../common/DeleteConfirmationModal";
import CommonMessage from "../../../common/CommonMessage";
import { showSuccessToast } from "../../../common/ToastMessage";
import useCustomerVoiceForm from "./CustomerVoiceHook";
import CreateEditCustomerVoiceModal from "./CreateEditCustomerVoiceModal";
import { deleteOurService, getOurServices } from "../../../features/ourService/ourServiceSlice";
import { deleteCustomerVoice, getCustomerVoices } from "../../../features/customerVoice/customerVoiceSlice";

const CustomerVoiceIndex = () => {
  const {
    control,
    onSubmit,
    handleSubmit,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    editValues,
    reset,
    setValue 
  } = useCustomerVoiceForm();

  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const dispatch = useDispatch();

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
        accessorKey: "customer_name_en",
        header: "Customer Name (EN)",
        size: 120,
      },
      {
        accessorKey: "customer_name_mm",
        header: "Customer Name (MM)",
        size: 120,
      },
      {
        accessorKey: "title_en",
        header: "Title (EN)",
        size: 120,
      },
      {
        accessorKey: "title_mm",
        header: "Title (MM)",
        size: 120,
      },
      {
        accessorKey: "description_en",
        header: "Description (EN)",
        size: 200,
      },
      {
        accessorKey: "description_mm",
        header: "Description (MM)",
        size: 200,
      },
    ],
    []
  );

  const { customerVoices, isLoading, isError } = useSelector(
    (state) => state.customerVoices
  );

  const fetchApi = useCallback(() => {
    dispatch(getCustomerVoices());
  }, [dispatch]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  // click edit button
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

  // delete modal close
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
  };

  // confirm to delete
  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      // call delete api
      await dispatch(deleteCustomerVoice(deleteData.original.uuid)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "Service"));

      await dispatch(getCustomerVoices());
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
        <Typography color="text.primary">Customer Voices Setup</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={customerVoices}
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
        <CreateEditCustomerVoiceModal
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

export default CustomerVoiceIndex;
