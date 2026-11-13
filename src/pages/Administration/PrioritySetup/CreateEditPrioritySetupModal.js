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
import FormInputSelect from "components/form/FormInputSelect";
import FormInputText from "components/form/FormInputText";
import { useWatch } from "react-hook-form";
import { useState } from "react";

const CreateEditPrioritySetupModal = ({
  open,
  onClose,
  setEditValues,
  editFlag,
  control,
  handleSubmit,
  onSubmit,
  reset,
  watch,
  priorityProperties,
  projectCategories,
  setValue,
}) => {
  const [isPriorityTwoDisabled, setIsPriorityTwoDisabled] = useState(true);
  const [isPriorityThreeDisabled, setIsPriorityThreeDisabled] = useState(true);
  const [isPriorityFourDisabled, setIsPriorityFourDisabled] = useState(true);
  const [isPriorityFiveDisabled, setIsPriorityFiveDisabled] = useState(true);
  const [isPrioritySixDisabled, setIsPrioritySixDisabled] = useState(true);

  const priorityOne = useWatch({
    control,
    name: "priority_one",
  });

  const priorityTwo = useWatch({
    control,
    name: "priority_two",
  });

  const priorityThree = useWatch({
    control,
    name: "priority_three",
  });

  const priorityFour = useWatch({
    control,
    name: "priority_four",
  });

  const priorityFive = useWatch({
    control,
    name: "priority_five",
  });

  const prioritySix = useWatch({
    control,
    name: "priority_six",
  });

  useEffect(() => {
    const priorities = [
      {
        value: priorityOne,
        setDisabled: setIsPriorityTwoDisabled,
        fields: [
          "priority_two",
          "priority_three",
          "priority_four",
          "priority_five",
          "priority_six",
        ],
      },
      {
        value: priorityTwo,
        setDisabled: setIsPriorityThreeDisabled,
        fields: [
          "priority_three",
          "priority_four",
          "priority_five",
          "priority_six",
        ],
      },
      {
        value: priorityThree,
        setDisabled: setIsPriorityFourDisabled,
        fields: ["priority_four", "priority_five", "priority_six"],
      },
      {
        value: priorityFour,
        setDisabled: setIsPriorityFiveDisabled,
        fields: ["priority_five", "priority_six"],
      },
      {
        value: priorityFive,
        setDisabled: setIsPrioritySixDisabled,
        fields: ["priority_six"],
      },
    ];

    priorities.forEach(({ value, setDisabled, fields }) => {
      if (value === undefined || value === null) {
        setDisabled(true);
        fields.forEach((field) => setValue(field, null));
      } else {
        setDisabled(false);
      }
    });
  }, [
    priorityOne,
    priorityTwo,
    priorityThree,
    priorityFour,
    priorityFive,
    prioritySix,
    setValue,
  ]);

  useEffect(() => {
    if (editFlag === false) {
      reset();
    }
  }, [editFlag, reset]);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {editFlag === true ? "Edit Priority" : "Create New Priority"}
      </DialogTitle>
      <DialogContent>
        <Stack
          key="One"
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
            options={priorityProperties}
            getOptionLabel={(option) => option?.value || ""}
            id="key"
            name="priority_one"
            label={<span className="required">Priority One</span>}
            rules={{ required: true }}
          />
        </Stack>
        <Stack
          key="Two"
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
            options={priorityProperties}
            getOptionLabel={(option) => option?.value || ""}
            id="key"
            name="priority_two"
            label={<span className="required">Priority Two</span>}
            rules={{ required: true }}
            disabled={isPriorityTwoDisabled}
          />
        </Stack>
        <Stack
          key="Three"
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
            options={priorityProperties}
            getOptionLabel={(option) => option?.value || ""}
            id="key"
            name="priority_three"
            label={<span>Priority Three</span>}
            disabled={isPriorityThreeDisabled}
          />
        </Stack>
        <Stack
          key="Four"
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
            options={priorityProperties}
            getOptionLabel={(option) => option?.value || ""}
            id="key"
            name="priority_four"
            label={<span>Priority Four</span>}
            disabled={isPriorityFourDisabled}
          />
        </Stack>
        <Stack
          key="Five"
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
            options={priorityProperties}
            getOptionLabel={(option) => option?.value || ""}
            id="key"
            name="priority_five"
            label={<span>Priority Five</span>}
            disabled={isPriorityFiveDisabled}
          />
        </Stack>
        <Stack
          key="Six"
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
            options={priorityProperties}
            getOptionLabel={(option) => option?.value || ""}
            id="key"
            name="priority_six"
            label={<span>Priority Six</span>}
            disabled={isPrioritySixDisabled}
          />
        </Stack>

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
            options={projectCategories}
            getOptionLabel={(option) => option?.name || ""}
            id="id"
            name="category_id"
            label={<span className="required">Category</span>}
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
            marginTop: "20px",
          }}
        >
          <FormInputText
            control={control}
            key="description"
            label="Description"
            name="description"
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

export default CreateEditPrioritySetupModal;
