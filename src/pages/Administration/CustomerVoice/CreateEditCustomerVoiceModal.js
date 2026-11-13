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
import FormInputFileUpload from "../../../components/form/FormInputFileUpload";

const CreateEditCustomerVoiceModal = ({
  columns,
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
        {editFlag === true ? "Edit Customer Voice" : "Create New Customer Voice"}
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
          <FormInputFileUpload
            control={control}
            label={<span className="required">Image</span>}
            name="image"
            rules={{
              required: true,
            }}
          />
        </Stack>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 3,
          }}
        >
          {columns.map((column) => {
            const isExcludeFields = column.accessorKey === "image";

            const isRequired =
              column.accessorKey !== "title_mm" &&
              column.accessorKey !== "title_en" &&
              column.accessorKey !== "description_mm" &&
              column.accessorKey !== "customer_name_mm";

            const label = isRequired ? (
              <span className="required">{column.header}</span>
            ) : (
              column.header
            );

            const validationRules = {
              required: isRequired,
              maxLength:
                column.accessorKey === "title_en" ||
                  column.accessorKey === "title_mm" ||
                  column.accessorKey === "description_en" ||
                  column.accessorKey === "description_mm" ||
                  column.accessorKey === "customer_name_en" ||
                  column.accessorKey === "customer_name_mm"
                  ? {
                    value: 1000,
                    message: CommonMessage.MFE00003.replace(
                      "%s",
                      column.accessorKey === "title_en"
                        ? "Title (EN)"
                        : column.accessorKey === "title_mm"
                          ? "Title (MM)"
                          : column.accessorKey === "customer_name_en"
                            ? "Customer Name (EN)"
                            : column.accessorKey === "customer_name_mm"
                              ? "Customer Name (MM)"
                              : column.accessorKey === "description_en"
                                ? "Description (EN)"
                                : "Description (MM)"
                    ).replace("%s", "1000"),
                  }
                  : false,
            };

            return (
              !isExcludeFields && (
                <FormInputText
                  multiline
                  key={column.accessorKey}
                  control={control}
                  label={label}
                  name={column.accessorKey}
                  rules={validationRules}
                  sx={
                    (column.accessorKey === "description_en" || column.accessorKey === "description_mm") ? {
                      pt: 1,
                      textarea: {
                        minHeight: "130px",
                        maxHeight: "130px",
                        overflow: "auto !important",
                      },

                    } : {}
                  }
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
            {editFlag ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditCustomerVoiceModal;
