/**
 * main component of downpayment
 */
import * as React from "react";
import { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Stack, Chip } from "../../../../node_modules/@mui/material/index";
import {
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import CreateEditDownPaymentSchemeSetupModel from "./CreateEditDownPaymentSchemeSetupModel";
import { getDownPayment, deleteDownPayment } from "../../../features/downPaymentSchemeSetup/downPaymentSchemeSetupSlice";
import { Edit } from "../../../../node_modules/@mui/icons-material/index";
import { useDispatch } from "react-redux";
import useDownPaymentSchemeForm from "./DownPaymentSchemeHook";
import CommonMessage from "../../../common/CommonMessage";
import { showErrorToast, showSuccessToast } from "../../../common/ToastMessage";
import DeleteConfirmationModal from "../../../common/DeleteConfirmationModal";

const DownPaymentSchemeSetupList = () => {
  const dispatch = useDispatch(); // dispatch
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal flag
  const [deleteData, setDeleteData] = useState([]); // for delete data
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const {
    isLoading,
    onSubmit,
    handleSubmit,
    control,
    downPaymentSetups,
    projectCategories,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    editValues,
    reset,
    setValue,
  } = useDownPaymentSchemeForm();

  // memoized value to show in table
  const columns = useMemo(
    () => [
      {
        accessorKey: "category.name_en",
        header: "Product Category",
        size: 200,
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
      },
      {
        accessorKey: "stamp_duty_fee",
        header: "Stamp Duty",
        size: 200,
      },
      {
        accessorKey: "stamp_duty_fee_percentage",
        header: "Stamp Duty %",
        size: 200,
      },

      {
        accessorKey: "stamp_duty_fee_fixed_amount",
        header: "Stamp Duty Fixed",
        size: 250,
      },
      {
        accessorKey: "processing_fee",
        header: "Processing Fees",
        size: 200,
      },
      {
        accessorKey: "processing_fee_percentage",
        header: "Processing Fees %",
        size: 250,
      },

      {
        accessorKey: "processing_fee_fixed_amount",
        header: "Processing Fees Fixed",
        size: 200,
      },
      {
        accessorKey: "interest_before_first_installment_prorata_interest",
        header: "Interest Before First Installment",
        size: 200,
        Cell: ({ cell }) => {
          const row = cell.getValue();
          if (row === true) {
            return (
              <Stack direction="row" spacing={1}>
                <Chip label="YES" color="success" />
              </Stack>
            );
          } else {
            return (
              <Stack direction="row" spacing={1}>
                <Chip label="NO" color="error" />
              </Stack>
            );
          }
        },
      },
      {
        accessorKey: "insurance",
        header: "Insurance",
        size: 200,
        Cell: ({ cell }) => {
          const row = cell.getValue();
          if (row === true) {
            return (
              <Stack direction="row" spacing={1}>
                <Chip label="YES" color="success" />
              </Stack>
            );
          } else {
            return (
              <Stack direction="row" spacing={1}>
                <Chip label="NO" color="error" />
              </Stack>
            );
          }
        },
      },
      {
        accessorKey: "way_to_calculate",
        header: "Way to calculate",
        size: 200,
      },
    ],
    []
  );

  // click delete button
  const handleDeleteRow = (row) => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteData(row);
  };

  // close delete modal
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
  };

  // confirm to delete
  const handleDeleteConfirmed = async () => {
    setIsDeleteModalOpen(false);
    try {
      // call create down payment api
      const responseData = await dispatch(
        deleteDownPayment(deleteData.original.uuid)
      );
      if (responseData) {
        if (responseData.payload && responseData.payload.success === true) {
          showSuccessToast(
            CommonMessage.MFS00002.replace("%s", "Down Payment Scheme")
          );
        } else if (
          responseData.error &&
          responseData.error.message === "Rejected"
        ) {
          if (typeof responseData.payload === "string") {
            showErrorToast(responseData.payload);
          }
        }
      }
      await dispatch(getDownPayment());
      setConfirmMessage("");
    } catch (error) {
      showErrorToast(
        CommonMessage.MFE00009.replace("%s", "deleting Down Payment Scheme")
      );
    }
  };

  // click edit button
  const editClick = (row) => {
    setCreateModalOpen(true);
    setEditFlag(true);

    const updatedValues = { ...row.original };

    // Loop through the keys and replace "---" with ""
    for (const key in updatedValues) {
      if (updatedValues[key] === "---") {
        updatedValues[key] = "";
      }
    }
    setEditValues(updatedValues);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 1 }}
        className="margin-top-8"
      >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">
          Down Payment Scheme Setup List
        </Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={downPaymentSetups ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          columnResizeMode="onChange"
          state={{ isLoading: isLoading }} //pass our managed row selection state to the table to use
          positionActionsColumn="last"
          enablePinning
          initialState={{
            columnPinning: {
              left: ["CategoryCode"],
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "0.5rem",
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
            );
          }}
        />
        <CreateEditDownPaymentSchemeSetupModel
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          setEditValues={setEditValues}
          editValues={editValues}
          editFlag={editFlag}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
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

export default DownPaymentSchemeSetupList;
