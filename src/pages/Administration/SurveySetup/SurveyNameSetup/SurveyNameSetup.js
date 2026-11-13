import * as React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { MaterialReactTable } from "material-react-table";
import { useSelector, useDispatch } from "react-redux";
import {
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  getSurveyHeaders,
  deleteSurveyHeader,
} from "features/surveyNameSetup/surveyNameSetupSlice";
import CreateSurveyNameSetupModal from "./CreateSurveyNameSetupModal";
import { getContactTypes } from "features/contactType/contactTypeSlice";
import { getsurveyTypes } from "features/surveyType/surveyTypeSlice";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import openNewWindow from "utils/windowUtils";
import { Link } from "react-router-dom";
import EditSurveyNameSetupModal from "./EditSurveyNameSetupModal";
import { Edit } from "../../../../../node_modules/@mui/icons-material/index";
import { toast } from "react-toastify";
import CommonMessage from "common/CommonMessage";

const SurveyNameSetupIndex = () => {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);// for delete confirmation modal open flag
  const [deleteData, setDeleteData] = useState([]);// want to delete data
  const [createModalOpen, setCreateModalOpen] = useState(false);// for create modal open flag
  const [editModalOpen, setEditModalOpen] = useState(false);// for create edit open flag
  const [editValues, setEditValues] = useState([]); // row values to edit
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const [initialValues, setInitialValues] = useState();// for store initial state to give edit modal
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  const {
    contactTypes,
    isContactLoading,
    isContactSuccess,
    isContactError,
    contactMessage,
  } = useSelector((state) => state.contactTypes);

  const {
    projectCategories,
    isProjectLoading,
    isProjectSuccess,
    isProjectError,
    projectMessage,
  } = useSelector((state) => state.projectCategories);

  const {
    surveyTypes,
    isSurveyLoading,
    isSurveySuccess,
    isSurveyError,
    surveyMessage,
  } = useSelector((state) => state.surveyTypes);

  const { surveyHeaders, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.surveyHeaders
  );

  useEffect(() => {
    dispatch(getContactTypes());
    dispatch(getProjectCategory());
    dispatch(getsurveyTypes());
    dispatch(getSurveyHeaders());
  }, [dispatch]);

  // define columns
  const columns = useMemo(() => {
    if (!isContactLoading && !isProjectLoading && !isSurveyLoading) {
      return [
        {
          accessorKey: "survey_header_code",
          header: "Survey Code",
          size: 200,
        },
        {
          accessorKey: "description",
          header: "Description",
          size: 200,
        },
        {
          accessorKey: "contact_type",
          header: "Contact Type",
          size: 200,
        },
        {
          accessorKey: "survey_type",
          header: "Survey Type",
          size: 200,
        },
        {
          accessorKey: "category",
          header: "Product Category",
          size: 200,
        },
      ];
    } else {
      return null;
    }
  }, [isContactLoading, isProjectLoading, isSurveyLoading, contactTypes]);

  // click edit button
  const editClick = (row) => {
    setEditModalOpen(true);
    setEditValues(row);
    setEditFlag(true);

    const updatedValues = { ...row.original };

    // Loop through the keys and replace "---" with ""
    for (const key in updatedValues) {
      if (updatedValues[key] === "---") {
        updatedValues[key] = "";
      }
    }

    let categoryId = "";
    // to change category:"example" to category_id:1
    const foundCategory = projectCategories.find(
      (category) => category.name === updatedValues.category
    );
    if (foundCategory) {
      categoryId = foundCategory.id;
    }

    // set intitial value (validation in edit modal)
    setInitialValues({
      category_id: categoryId || "",
      description: updatedValues.description || "",
      contact_type: updatedValues.contact_type || "",
      survey_type: updatedValues.survey_type || "",
      survey_header_code: updatedValues.survey_header_code || "",
    });
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
      // call delete survey name api
      const responseData = await dispatch(
        deleteSurveyHeader(deleteData.original.uuid)
      );
      if (responseData) {
        if (responseData.payload && responseData.payload.success === true) {
          handleSuccessMessage(
            CommonMessage.MFS00002.replace("%s", "Survey Name")
          );
        } else if (
          responseData.error &&
          responseData.error.message === "Rejected"
        ) {
          if (typeof responseData.payload === "string") {
            toast.error(responseData.payload, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      }
      await dispatch(getSurveyHeaders());
      setConfirmMessage("");
    } catch (error) {
      toast.error(
        CommonMessage.MFE00009.replace("%s", "deleting Survey Name"),
        {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  // show success message
  const handleSuccessMessage = (message) => {
    if (message != "") {
      toast.success(message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Survey Name Setup Lists</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={surveyHeaders ?? []}
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
          state={{ isLoading: isLoading }} //pass our managed row selection state to the table to use
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
            <MenuItem
              onClick={() => {
                openNewWindow(
                  `/SurveyNameSetup/${row.original.uuid}`
                );
              }}
              component={Link}
              key="view"
            >
              <ListItemIcon>
                <VisibilityOutlinedIcon />
              </ListItemIcon>
              View
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
                  onClick={() => setCreateModalOpen(true)}
                  variant="contained"
                >
                  Create New
                </Button>
              </div>
            );
          }}
        />

        <CreateSurveyNameSetupModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          handleSuccessMessage={handleSuccessMessage}
        />
        <EditSurveyNameSetupModal
          open={editModalOpen}
          columns={columns}
          onClose={() => setEditModalOpen(false)}
          editValues={editValues}
          handleSuccessMessage={handleSuccessMessage}
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

export default SurveyNameSetupIndex;
