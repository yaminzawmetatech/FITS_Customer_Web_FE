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
import FormInputSelect from "../../../components/form/FormInputSelect";


const CreateEditDealerModal = ({
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
  dealersWebSys = []
}) => {

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);



  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Dealer" : "Create New Dealer"}
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
          <FormInputSelect
            control={control}
            options={categories}
            getOptionLabel={(option) => option?.name_en || ""}
            id="id"
            name="category_id"
            label={<span className="required">Category</span>}
            rules={{ required: true }}
          />
          <FormInputSelect
            control={control}
            options={dealersWebSys}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="web_sys_dealer_table_id"
            label={<span className="required">Travel Agency Name</span>}
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

export default CreateEditDealerModal;
