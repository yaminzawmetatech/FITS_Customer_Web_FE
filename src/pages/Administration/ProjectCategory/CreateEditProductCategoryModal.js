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
import FormInputFileUpload from "../../../components/form/FormInputFileUpload"; // ✅ file input wrapper
import CommonMessage from "../../../common/CommonMessage";

const CreateEditProductCategoryModal = ({
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
        {editFlag === true ? "Edit Product Category" : "Create New Product Category"}
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
          {/* ✅ Image Upload */}
          <FormInputFileUpload
            control={control}
            label={<span className="required">Image</span>}
            name="image"
            rules={{ required: true }}
          />

          {/* ✅ Name English */}
          <FormInputText
            control={control}
            label={<span className="required">Name (English)</span>}
            name="name_en"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: CommonMessage.MFE00016.replace("%s", "Name (English)").replace("%s", "3"),
              },
              maxLength: {
                value: 200,
                message: CommonMessage.MFE00003.replace("%s", "Name (English)").replace("%s", "200"),
              },
            }}
          />

          {/* ✅ Name Myanmar */}
          <FormInputText
            control={control}
            label={<span className="required">Name (Myanmar)</span>}
            name="name_mm"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: CommonMessage.MFE00016.replace("%s", "Name (Myanmar)").replace("%s", "3"),
              },
              maxLength: {
                value: 200,
                message: CommonMessage.MFE00003.replace("%s", "Name (Myanmar)").replace("%s", "200"),
              },
            }}
          />

          {/* ✅ Remark English */}
          <FormInputText
            multiline
            control={control}
            label={<span className="required">Remark (English)</span>}
            name="remark_en"
            rules={{
              required: false,
              maxLength: {
                value: 1000,
                message: CommonMessage.MFE00003.replace("%s", "Remark (English)").replace("%s", "1000"),
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

          {/* ✅ Remark Myanmar */}
          <FormInputText
            multiline
            control={control}
            label={<span className="required">Remark (Myanmar)</span>}
            name="remark_mm"
            rules={{
              required: false,
              maxLength: {
                value: 1000,
                message: CommonMessage.MFE00003.replace("%s", "Remark (Myanmar)").replace("%s", "1000"),
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
          <FormInputText
            control={control}
            label={<span className="required">Interest Rate (%)</span>}
            name="interest_rate"
            type="number"
            rules={{
              required: true,
              min: { value: 0, message: "Interest Rate must be greater than or equal 0" },
              max: {
                value: 100, message: "Interest Rate cannot exceed 100"
              },
            }}
          />

          {/* ✅ Eligible Rate */}
          <FormInputText
            control={control}
            label={<span className="required">Eligible Rate (%)</span>}
            name="eligible_rate"
            type="number"
            rules={{
              required: true,
              min: { value: 0, message: "Eligible Rate must be greater than or equal 0" },
              max: { value: 100, message: "Eligible Rate cannot exceed 100" },
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

export default CreateEditProductCategoryModal;
