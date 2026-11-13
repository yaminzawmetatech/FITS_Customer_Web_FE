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
import FormInputSelect from "../../../components/form/FormInputSelect";
import CommonMessage from "../../../common/CommonMessage";

const CreateEditVehicleSetupModal = ({
  open,
  onClose,
  setEditValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  editValues,
  categories = [],     
  uniqueBrandVehicles,
  uniqueModelVehicles,
  webVehicleBrands = [],
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);


  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Vehicle Setup" : "Create New Vehicle Setup"}
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

          {/* ✅ Vehicle Dropdown */}
          <FormInputSelect
            control={control}
            options={uniqueBrandVehicles}
            getOptionLabel={(option) => option?.brand_name || ""}
            id="brand_id"
            name="brand_id"
            label={<span className="required">Vehicle Brand</span>}
            rules={{ required: true }}
          />

          {/* ✅ Vehicle Brand Dropdown */}
          <FormInputSelect
            control={control}
            options={webVehicleBrands}
            getOptionLabel={(option) => option?.model_name || ""}
            id="model_id"
            name="model_id"
            label={<span className="required">Vehicle Model</span>}
            rules={{ required: true }}
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

export default CreateEditVehicleSetupModal;
