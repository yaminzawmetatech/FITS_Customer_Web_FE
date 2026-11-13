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
import FormInputSelect from "../../../components/form/FormInputSelect";

const CreateEditRegionModal = ({
  open,
  onClose,
  setEditValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  editValues,
  categories = [], // ✅ Pass list of categories from parent
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Region" : "Create New Region"}
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
          {/* ✅ Category Dropdown */}
          <FormInputSelect
            control={control}
            options={categories}
            getOptionLabel={(option) => option?.name_en || ""}
            id="id"
            name="category_id"
            label={<span className="required">Category</span>}
            rules={{ required: true }}
          />

          {/* ✅ Region Name */}
          <FormInputText
            control={control}
            label={<span className="required">Region Name</span>}
            name="region_name"
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: CommonMessage.MFE00016.replace("%s", "Region Name").replace("%s", "3"),
              },
              maxLength: {
                value: 200,
                message: CommonMessage.MFE00003.replace("%s", "Region Name").replace("%s", "200"),
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

export default CreateEditRegionModal;
