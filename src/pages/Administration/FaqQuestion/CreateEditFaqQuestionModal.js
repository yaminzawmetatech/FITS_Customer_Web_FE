import * as React from "react";
import { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import FormInputText from "../../../components/form/FormInputText";
import CommonMessage from "../../../common/CommonMessage";

const CreateEditFAQQuestionModal = ({
  open,
  onClose,
  setEditValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  editValues,
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit FAQ Question" : "Create New FAQ Question"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          {/* ✅ Question English */}
          <FormInputText
            multiline
            control={control}
            label={<span className="required">Question (English)</span>}
            name="question_en"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: CommonMessage.MFE00016.replace("%s", "Question (English)").replace("%s", "3"),
              },
              maxLength: {
                value: 1000,
                message: CommonMessage.MFE00003.replace("%s", "Question (English)").replace("%s", "1000"),
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

          {/* ✅ Question Myanmar */}
          <FormInputText
            multiline
            control={control}
            label={<span className="required">Question (Myanmar)</span>}
            name="question_mm"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: CommonMessage.MFE00016.replace("%s", "Question (Myanmar)").replace("%s", "3"),
              },
              maxLength: {
                value: 1000,
                message: CommonMessage.MFE00003.replace("%s", "Question (Myanmar)").replace("%s", "1000"),
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

export default CreateEditFAQQuestionModal;
