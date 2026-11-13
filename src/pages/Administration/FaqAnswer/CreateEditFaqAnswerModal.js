import * as React from "react";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  MenuItem,
  TextField,
} from "@mui/material";
import FormInputText from "../../../components/form/FormInputText";
import CommonMessage from "../../../common/CommonMessage";
import FormInputSelect from "../../../components/form/FormInputSelect";

const CreateEditFAQAnswerModal = ({
  open,
  onClose,
  setEditValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  editValues,
  questions = [], // ✅ Pass list of FAQ questions from parent
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit FAQ Answer" : "Create New FAQ Answer"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          {/* ✅ Question Dropdown */}
          {/* <TextField
            select
            label={<span className="required">Select Question</span>}
            defaultValue={editValues?.question_id || ""}
            {...control.register("question_id", { required: true })}
          >
            {questions.map((q) => (
              <MenuItem key={q._id} value={q._id}>
                {q.question_en}
              </MenuItem>
            ))}
          </TextField> */}
          <FormInputSelect
            control={control}
            options={questions}
            getOptionLabel={(option) => option?.question_en || ""}
            id="id"
            name="question_id"
            label={<span className="required">Question</span>}
          />


          {/* ✅ Answer English */}
          <FormInputText
            multiline
            control={control}
            label={<span className="required">Answer (English)</span>}
            name="answer_en"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: CommonMessage.MFE00016.replace("%s", "Answer (English)").replace("%s", "3"),
              },
              maxLength: {
                value: 1000,
                message: CommonMessage.MFE00003.replace("%s", "Answer (English)").replace("%s", "1000"),
              },
            }}
            sx={{
              pt: 1,
              textarea: {
                minHeight: "130px",
                maxHeight: "130px",
                overflow: "auto !important",
              },
            }}
          />

          {/* ✅ Answer Myanmar */}
          <FormInputText
            multiline
            control={control}
            label={<span className="required">Answer (Myanmar)</span>}
            name="answer_mm"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: CommonMessage.MFE00016.replace("%s", "Answer (Myanmar)").replace("%s", "3"),
              },
              maxLength: {
                value: 1000,
                message: CommonMessage.MFE00003.replace("%s", "Answer (Myanmar)").replace("%s", "1000"),
              },
            }}
            sx={{
              pt: 1,
              textarea: {
                minHeight: "130px",
                maxHeight: "130px",
                overflow: "auto !important",
              },
            }}
          />
        </Stack>

        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              reset();
              setEditValues("");
              onClose();
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              handleSubmit((data) => onSubmit(data, editFlag))();
            }}
            variant="contained"
          >
            {editFlag === true ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditFAQAnswerModal;
