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
import { useSelector, useDispatch } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import CreateNewFirstDueDateSetupModal from "./CreateNewFirstDueDateSetupModal";
import { useMemo, useState, useEffect } from "react";
import { Edit } from "../../../../node_modules/@mui/icons-material/index";
import { getProjectCategory } from "../../../features/projectcategory/projectcategorySlice";
import { deleteFirstDueDateSetup, getFirstDueDateSetup } from "../../../features/firstDueDateSetup/firstDueDateSetupSlice";
import CommonMessage from "../../../common/CommonMessage";
import { showErrorToast, showSuccessToast } from "../../../common/ToastMessage";
import DeleteConfirmationModal from "../../../common/DeleteConfirmationModal";

const FirstDueDateSetup = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [initialValues, setInitialValues] = useState(); // for store initial state to give edit modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const { firstDueDateSetups, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.firstDueDateSetups
  );
  const {
    projectCategories,
    isprojectCategoriesLoading,
    isprojectCategoriesSuccess,
    isprojectCategoriesError,
    projectCategoriesmessage,
  } = useSelector((state) => state.projectCategories);

  useEffect(() => {
    dispatch(getProjectCategory());
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "Category",
        size: 200,
      },
      {
        accessorKey: "start_day",
        header: "Start Day",
        size: 200,
      },
      {
        accessorKey: "end_day",
        header: "End Day",
        size: 200,
      },
      {
        accessorKey: "add_to_month",
        header: "Add To Month",
        size: 200,
      },
      {
        accessorKey: "add_to_month_for_else",
        header: "Add TO Month For Else",
        size: 200,
      },
      {
        accessorKey: "billing_set_up_day",
        header: "Billing Setup Day",
        size: 200,
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getFirstDueDateSetup());
  }, [dispatch]);

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
      const responseData = await dispatch(
        deleteFirstDueDateSetup(deleteData.original.uuid)
      ).unwrap();
      if (responseData) {
        if (responseData.payload && responseData.payload.success === 1) {
          showSuccessToast(
            CommonMessage.MFS00002.replace("%s", "First Due Date Setup")
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
      await dispatch(getFirstDueDateSetup());
      setConfirmMessage("");
    } catch (error) {
      showErrorToast(
        CommonMessage.MFE00009.replace("%s", "deleting First Due Date Setup")
      );
    }
  };

  // click edit button
  const editClick = (row) => {
    setCreateModalOpen(true);
    setEditValues(row);
    setEditFlag(true);

    const updatedValues = { ...row.original };

    // Loop through the keys and replace "---" with ""
    for (const key in updatedValues) {
      if (updatedValues[key] === "---") {
        updatedValues[key] = "";
      }
    }

    // set intitial value (validation in edit modal)
    setInitialValues({
      name: updatedValues.name || "",
      category_id: updatedValues.category_id || "",
      start_day: updatedValues.start_day || "",
      end_day: updatedValues.end_day || "",
      add_to_month: updatedValues.add_to_month || "",
      add_to_month_for_else: updatedValues.add_to_month_for_else || "",
      billing_set_up_day: updatedValues.billing_set_up_day || "",
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">First Due Date Setup List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={firstDueDateSetups}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          debugTable={isError}
          columnResizeMode="onChange"
          projectcategoryActionsColumn="last"
          enablePinning
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
        <CreateNewFirstDueDateSetupModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          editValues={editValues}
          editFlag={editFlag}
          initialValues={initialValues}
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

export default FirstDueDateSetup;
