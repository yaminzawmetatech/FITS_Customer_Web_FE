import * as React from "react";
import { useCallback, useMemo, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
import CreateSurveyQuestionSetupModal from './CreateSurveyQuestionSetupModal';
import { Delete } from "@mui/icons-material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { 
  getSurveyQAs,
  copySurveyQA,
  getSurveyQuestions,
  deleteSurveyQA,
} from "features/surveyQASetup/surveyQASetupSlice";
import { 
  getSurveyQAsByHeaderUuid,
  getSurveyHeaderByUuid,
} from "features/surveyNameSetup/surveyNameSetupSlice";
import { useParams } from "react-router";
import DeleteConfirmationModal from "common/DeleteConfirmationModal";
import CopySurveyQuestionModal from "./CopySurveyQuestionModal";
import { toast } from "react-toastify";
import EditSurveyQuestionSetupModal from "./EditSurveyQuestionSetupModal";
import { Edit } from "../../../../../node_modules/@mui/icons-material/index";
import CommonMessage from "common/CommonMessage";

const SurveyQuestionSetupIndex = () => {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);// for create edit open flag
  const [deleteData, setDeleteData] = useState([]);
  const [initialValues, setInitialValues] = useState();// for store initial state to give edit modal
  const [editValues, setEditValues] = useState([]); // row values to edit
  const [editFlag, setEditFlag] = useState(false); // edit flag
  const param = useParams('uuid');
  const paramId = param.uuid;

  const { surveyQAs, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.surveyQAs
  );

  const { surveyQAsByHeader, isQALoading, isQASuccess, isQAError, qaMessage } = useSelector(
    (state) => state.surveyQAsByHeader
  );

  const { surveyHeader, isHeaderLoading, isHeaderSuccess, isHeaderError, headerMessage } = useSelector(
    (state) => state.surveyHeader
  );

  const { surveyQuestions, isQuestionLoading, isQuestionSuccess, isQuestionError, questionMessage } = useSelector(
    (state) => state.surveyQuestions
  );

  useEffect(() => {
    dispatch(getSurveyQAs());
    dispatch(getSurveyQAsByHeaderUuid({ id: paramId }));
    dispatch(getSurveyHeaderByUuid({id: paramId}));
    dispatch(getSurveyQuestions({ id: paramId }));
  }, [dispatch]);

  const [types, setTypes] = useState([
    {
      key: "question",
      value: "question",
    },
    {
      key: "answer",
      value: "answer",
    },
  ]);
  const [answerType, setAnswerType] = useState([
    {
      key: "radio",
      value: "radio",
    },
    {
      key: "checkbox",
      value: "checkbox",
    },
    {
      key: "text",
      value: "text",
    },
  ]);

  const columns = useMemo(() => {
    if (!isLoading && !isQALoading && !isHeaderLoading && !isQuestionLoading) {
      return [
        {
          accessorKey: "survey_qa_code",
          header: "Survey QA Code",
          size: 250,
        },
        {
          accessorKey: "text",
          header: "Text",
          size: 250,
        }, 
        {
          accessorKey: "description",
          header: "Description",
          size: 250,
        }, 
        {
          accessorKey: "type",
          header: "Type",
          enableEditing: false,
          size: 150,
        },  
        {
          accessorKey: "answer_type",
          header: "Answer Type",
          size: 150,
        }, 
        {
          accessorKey: "question_qa_code",
          header: "Question Id",
          enableEditing: false,
          size: 250,
        },
      ];
    } else {
      return [];
    }
  }, [isLoading, isQALoading, isHeaderLoading, isQuestionLoading, surveyQuestions]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [confirmMessage, setConfirmMessage] = useState(""); // for delete confirm message body

  // create and show data in table
  const handleCopyFrom = (values) => {

    if (surveyHeader.uuid === paramId) {
      const id = surveyHeader.id;
  
      const createValues = {
        ...values,
        destination_survey_header_id: id, 
      };
      dispatch(copySurveyQA(createValues));
      dispatch(getSurveyQAsByHeaderUuid({ id: paramId }));
    }
    
  };

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

    // set intitial value (validation in edit modal)
    setInitialValues({
      survey_qa_code: updatedValues.survey_qa_code || "",
      description: updatedValues.description || "",
      text: updatedValues.text || "",
      type: updatedValues.type || "",
      answer_type: updatedValues.answer_type || "",
      question_id: updatedValues.question_id || "",
    });
  };

  const handleDeleteRow = (row) => {
    setIsDeleteModalOpen(true);
    setConfirmMessage(CommonMessage.MFC00001);
    setDeleteData(row);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setDeleteData([]);
  };

  // confirm to delete
  const handleDeleteConfirmed = async() => {
    setIsDeleteModalOpen(false);
    try {
      // call delete survey name api
      const responseData = await dispatch(deleteSurveyQA(deleteData.original.uuid));
      if (responseData) {
        if (responseData.payload && responseData.payload.success === true) {
          handleSuccessMessage(
            CommonMessage.MFS00002.replace("%s", "Survey QA")
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
      await dispatch(getSurveyQAsByHeaderUuid({ id: paramId }));
      setConfirmMessage("");
    } catch (error) {
      toast.error(
        CommonMessage.MFE00009.replace("%s", "deleting Survey QA"),
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
        <Typography color="text.primary">Survey Question Lists</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={surveyQAsByHeader}
          enableExpanding
          getSubRows={(originalRow) => originalRow.answers}
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
          enableRowSelection
          getRowId={(row) => row.uuid} //give each row a more useful id
          onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
          state={{ rowSelection, isLoading: isLoading }} //pass our managed row selection state to the table to use
          initialState={{
            columnPinning: {
              left: ["SubCategory Code"],
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
                  width: "90%",
                  padding: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => setCreateModalOpen(true)}
                  variant="contained"
                >
                  Create New
                </Button>
                <Button
                    startIcon={<ContentCopyIcon />}
                    onClick={() => setCopyModalOpen(true)}
                    variant="outlined"
                  >
                    Copy From
                  </Button>
              </div>
            );
          }}
        />
        <CreateSurveyQuestionSetupModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          handleSuccessMessage={handleSuccessMessage}
        />
        <EditSurveyQuestionSetupModal
           open={editModalOpen}
           columns={columns}
           onClose={() => setEditModalOpen(false)}
           editValues={editValues}
           handleSuccessMessage={handleSuccessMessage}
           editFlag={editFlag}
           initialValues={initialValues}
        />
        <CopySurveyQuestionModal
          open={copyModalOpen}
          onClose={() => setCopyModalOpen(false)}
          handleSuccessMessage={handleSuccessMessage}
          //onSubmit={handleCopyFrom}
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

export default SurveyQuestionSetupIndex;
