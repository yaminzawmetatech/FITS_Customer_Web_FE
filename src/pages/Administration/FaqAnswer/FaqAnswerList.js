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
import {
  getFAQAnswers,
  deleteFAQAnswer,
} from "../../../features/faqAnswer/faqAnswerSlice";
import DeleteConfirmationModal from "../../../common/DeleteConfirmationModal";
import CommonMessage from "../../../common/CommonMessage";
import { showSuccessToast } from "../../../common/ToastMessage";
import useFAQAnswerForm from "./FaqAnswerHook";
import CreateEditFAQAnswerModal from "./CreateEditFaqAnswerModal";
import { getFAQQuestions } from "../../../features/faqQuestion/faqQuestionSlice";

const FAQAnswerIndex = () => {
  const {
    control,
    onSubmit,
    handleSubmit,
    createModalOpen,
    setCreateModalOpen,
    setEditValues,
    editValues,
    reset,
  } = useFAQAnswerForm();

  const [editFlag, setEditFlag] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState([]);
  const [confirmMessage, setConfirmMessage] = useState("");

  const dispatch = useDispatch();

  // Table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "question.question_en", // populate from question relation
        header: "Question (EN)",
        size: 300,
      },
      {
        accessorKey: "answer_en",
        header: "Answer (EN)",
        size: 300,
      },
      {
        accessorKey: "answer_mm",
        header: "Answer (MM)",
        size: 300,
      },
    ],
    []
  );

  const { faqAnswers, isLoading, isError } = useSelector(
    (state) => state.faqAnswers
  );

  const { faqQuestions } = useSelector((state) => state.faqQuestions);

  const fetchApi = useCallback(() => {
    dispatch(getFAQAnswers());
    dispatch(getFAQQuestions());
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
      await dispatch(deleteFAQAnswer(deleteData.original.uuid)).unwrap();

      showSuccessToast(CommonMessage.MFS00002.replace("%s", "FAQ Answer"));
      await dispatch(getFAQAnswers());
      setConfirmMessage("");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className="margin-top-8">
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">FAQ Answer List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={faqAnswers}
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
              left: ["question.question_en"],
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
        <CreateEditFAQAnswerModal
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
          questions={faqQuestions} // ✅ Pass the list of FAQ questions
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

export default FAQAnswerIndex;
