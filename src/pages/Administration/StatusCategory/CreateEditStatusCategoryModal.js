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
import FormInputText from "components/form/FormInputText";
import CommonMessage from "common/CommonMessage";
import FormInputSelect from "components/form/FormInputSelect";

export const CreateEditStatusCategoryModal = ({
  open,
  onClose,
  columns,
  editValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  setEditValues,
}) => {
  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {" "}
        {editFlag === true
          ? "Edit Application Reason"
          : "Create New Application Reason"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "30px",
          }}
        >
          <FormInputSelect
            control={control}
            options={[
              { id: "Rejected", name: "Rejected" },
              { id: "Reconsideration", name: "Reconsideration" },
              { id: "Canceled", name: "Canceled" },
            ]}
            getOptionLabel={(option) => option?.name}
            id="id"
            label={<span className="required">{"Application Status"}</span>}
            name="application_status"
            rules={{
              required: true,
            }}
          />
        </Stack>

        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "30px",
          }}
        >
          {columns.map((column) => {
            const isExcludeKey = column.accessorKey === "application_status";

            const label = column.header;

            const validationRules = {
              minLength:
                column.accessorKey === "name"
                  ? {
                      value: 2,
                      message: CommonMessage.MFE00016.replace(
                        "%s",
                        "Name"
                      ).replace("%s", "2"),
                    }
                  : false,
              maxLength:
                column.accessorKey === "reason" ||
                column.accessorKey === "description"
                  ? {
                      value: 255,
                      message: CommonMessage.MFE00003.replace(
                        "%s",
                        column.accessorKey === "reason"
                          ? "Reason"
                          : "Description"
                      ).replace("%s", "255"),
                    }
                  : false,
            };

            return (
              !isExcludeKey && (
                <FormInputText
                  key={column.accessorKey}
                  control={control}
                  label={label}
                  name={column.accessorKey}
                  rules={validationRules}
                />
              )
            );
          })}
        </Stack>
        <DialogActions sx={{ p: "1.25rem" }}>
          <Button
            onClick={() => {
              reset();
              setEditValues("");
              onClose();
            }}
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

export default CreateEditStatusCategoryModal;
