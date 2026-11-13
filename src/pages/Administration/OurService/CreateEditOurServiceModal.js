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
import FormInputFileUpload from "../../../components/form/FormInputFileUpload"; // ✅ assume you have a file input wrapper
import CommonMessage from "../../../common/CommonMessage";

const CreateEditOurServiceModal = ({
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
        {editFlag === true ? "Edit Our Service" : "Create New Our Service"}
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
          {/* ✅ Image Upload */}
          <FormInputFileUpload
            control={control}
            label={<span className="required">Image</span>}
            name="image"
            rules={{ required: true }}
          />

          {/* ✅ Title English */}
          <FormInputText
            control={control}
            label={<span className="required">Title (English)</span>}
            name="title_en"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: CommonMessage.MFE00016.replace("%s", "Title (English)").replace("%s", "3"),
              },
              maxLength: {
                value: 200,
                message: CommonMessage.MFE00003.replace("%s", "Title (English)").replace("%s", "200"),
              },
            }}
          />

          {/* ✅ Title Myanmar */}
          <FormInputText
            control={control}
            label={<span className="required">Title (Myanmar)</span>}
            name="title_mm"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: CommonMessage.MFE00016.replace("%s", "Title (Myanmar)").replace("%s", "3"),
              },
              maxLength: {
                value: 200,
                message: CommonMessage.MFE00003.replace("%s", "Title (Myanmar)").replace("%s", "200"),
              },
            }}
          />

          {/* ✅ Description English */}
          <FormInputText
            multiline
            control={control}
            label={<span className="required">Description (English)</span>}
            name="description_en"
            rules={{
              required: true,
              minLength: {
                value: 5,
                message: CommonMessage.MFE00016.replace("%s", "Description (English)").replace("%s", "5"),
              },
              maxLength: {
                value: 1000,
                message: CommonMessage.MFE00003.replace("%s", "Description (English)").replace("%s", "1000"),
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

          {/* ✅ Description Myanmar */}
          <FormInputText
            multiline
            control={control}
            label={<span className="required">Description (Myanmar)</span>}
            name="description_mm"
            rules={{
              required: true,
              minLength: {
                value: 5,
                message: CommonMessage.MFE00016.replace("%s", "Description (Myanmar)").replace("%s", "5"),
              },
              maxLength: {
                value: 1000,
                message: CommonMessage.MFE00003.replace("%s", "Description (Myanmar)").replace("%s", "1000"),
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

export default CreateEditOurServiceModal;
