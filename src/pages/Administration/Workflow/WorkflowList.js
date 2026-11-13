import * as React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Paper,
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import CreateWorkflowModal from "./CreateWorkflowModal";
import { deleteWorkflow, getWorkflows } from "features/workflow/workflowSlice";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";
import { getUserGroups } from "features/userGroup/userGroupSlice";
import { Edit } from "../../../../node_modules/@mui/icons-material/index";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast, showErrorToast } from "common/ToastMessage";

const WorkflowList = () => {
  const { workflows, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.workflows
  );

  const {
    projectCategories,
    isprojectCategoriesLoading,
    isprojectCategoriesSuccess,
    isprojectCategoriesError,
    projectCategoriesmessage,
  } = useSelector((state) => state.projectCategories);

  const {
    userGroups,
    isError: isUserGroupsError,
    isSuccess: isUserGroupsSuccess,
    isLoading: isUserGroupsLoading,
    message: UserGroupsMessage,
  } = useSelector((state) => state.userGroups);

  useEffect(() => {
    dispatch(getProjectCategory());
    dispatch(getUserGroups());
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "category",
        header: "Category",
        size: 200,
      },
      {
        accessorKey: "user_group",
        header: "User Group",
        size: 200,
      },
      {
        accessorKey: "sequence",
        header: "Sequence",
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

  const [tableData, setTableData] = useState(workflows);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkflows());
  }, [dispatch]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [initialValues, setInitialValues] = useState(); // for store initial state to give edit modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]); // want to delete data
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

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
        deleteWorkflow(deleteData.original.uuid)
      );
      if (responseData) {
        if (responseData.payload && responseData.payload.success === true) {
          showSuccessToast(CommonMessage.MFS00002.replace("%s", "Workflow"));
        } else if (
          responseData.error &&
          responseData.error.message === "Rejected"
        ) {
          if (typeof responseData.payload === "string") {
            showErrorToast(responseData.payload);
          }
        }
      }
      await dispatch(getWorkflows());
      setConfirmMessage("");
    } catch (error) {
      showErrorToast(CommonMessage.MFE00009.replace("%s", "deleting Workflow"));
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
      sequence: updatedValues.sequence || "",
      category_id: updatedValues.category_id || "",
      user_group_id: updatedValues.user_group_id || "",
      description: updatedValues.description || "",
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Workflow List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={workflows ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          muiTableBodyCellEditTextFieldProps={{
            variant: "outlined",
          }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          columnResizeMode="onChange"
          positionActionsColumn="last"
          enablePinning
          getRowId={(row) => row.uuid} //give each row a more useful id
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

        <CreateWorkflowModal
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

export default WorkflowList;
