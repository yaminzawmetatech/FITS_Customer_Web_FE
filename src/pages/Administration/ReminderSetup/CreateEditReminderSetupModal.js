import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputText from "components/form/FormInputText";
import { CUSTOMER_TYPE } from "constants/customerType";
import FormInputDateTimePicker from "components/form/FormInputDateTimePicker";
import FormInputCheckbox from "components/form/FormInputCheckbox";

export const CreateEditReminderSetupModal = ({
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
  const dispatch = useDispatch();

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, editValues, open, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true
          ? "Edit Reminder"
          : "Create New Reminder"}
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300px", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
            marginTop: "20px",
          }}
        >
          <FormInputSelect
            control={control}
            id="id"
            name="customer_type"
            options={CUSTOMER_TYPE}
            getOptionLabel={(option) => option?.value || ""}
            label={<span className="required">Customer Type</span>}
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
            marginTop: "25px"
          }}
        >
          {columns.map((column) => {
            const isExcludedKey = column.accessorKey === "customer_type" || column.accessorKey === "including_penalty";

            const isDatePickerKey = column.accessorKey === "system_reminder_date";

            const isRequired = column.accessorKey !== "description";

            const label = isRequired ? (
              <span className="required">{column.header}</span>
            ) : (
              column.header
            );

            const validationRules = {
              required: isRequired,
            };

            return (
              !isExcludedKey && (
                !isDatePickerKey ?
              <FormInputText
                key={column.accessorKey}
                control={control}
                label={label}
                name={column.accessorKey}
                rules={validationRules}
              /> :
              <FormInputDateTimePicker
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
          <Stack
          sx={{
            width: "100%",
            minWidth: { xs: "300", sm: "360px", md: "400px" },
            gap: "1.5rem",
            mt: 1,
          }}
        >
          <FormInputCheckbox
            control={control}
            label="Including Penalty"
            name="including_penalty"
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
        
        {/* <DialogActions sx={{ p: "1.25rem" }}>
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
        </DialogActions> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditReminderSetupModal;
