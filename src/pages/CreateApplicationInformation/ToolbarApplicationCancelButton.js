import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import FormInputText from "../../../../components/form/FormInputText";
import FormInputSelect from "components/form/FormInputMultiSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  getExternalResponses,
  getInternalResponses,
} from "features/applicationResponseSetup/applicationResponseSlice";
import applicationService from "features/application/applicationService";
import { getApplicationReasonsByStatus } from "features/applicationReason/applicationReasonSlice";
import FormInputSelectSingle from "components/form/FormInputSelect";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { getApplicationByUuid } from "features/application/applicationDetailSlice";

const ToolbarApplicationCancelButton = ({ open, handleClose }) => {
  const { uuid } = useParams();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { control, handleSubmit, setValue, watch, reset, getValues } = useForm({
    defaultValues: {},
  });

  const internalRemark = watch("internal_remark_select");
  const externalRemark = watch("external_remark_select");

  const { externalResponses } = useSelector((state) => state.externalResponses);

  const { internalResponses } = useSelector((state) => state.internalResponses);

  const { applicationReasonsByStatus } = useSelector(
    (state) => state.applicationReasonsByStatus
  );

  useEffect(() => {
    // Automatically select external options based on internal options
    if (internalRemark) {
      const internalIds = internalRemark.map(
        (option) => option.external_response_id
      );
      const autoSelectExternal = externalResponses.filter((option) =>
        internalIds.includes(option.id)
      );
      setValue("external_remark_select", autoSelectExternal);
      handleSelectExternalChange(autoSelectExternal);
    }
  }, [internalRemark, externalResponses, setValue]);

  useEffect(() => {
    const status = "Canceled";
    if (open) {
      dispatch(getExternalResponses({ type: "Application", status: status }));
      dispatch(getInternalResponses({ type: "Application", status: status }));
      dispatch(getApplicationReasonsByStatus({ status: status }));
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (open) {
      reset({});
    }
  }, [open]);

  // for internal_remark concatenation
  const handleSelectInternalChange = (selectedOptions) => {
    const existingRemark = getValues("internal_remark") || "";

    // Split existing remarks into individual lines, trim spaces, and remove any bullet points
    const existingNames = existingRemark
      .split("\n")
      .map((name) => name.trim().replace(/^•\s*/, "")) // Remove any existing bullet points
      .filter(Boolean);

    // Get the text of the newly selected options
    const newSelectedNames =
      selectedOptions?.map((option) => option.text) || [];

    // Identify manually added remarks (those that are not in the select box options)
    const manuallyAddedNames = existingNames.filter(
      (existingName) =>
        !internalResponses.some((option) => existingName.includes(option.text))
    );

    // Remove any existing names that are no longer selected
    const updatedNames = existingNames.filter((existingName) => {
      return (
        newSelectedNames.some((newName) => existingName.includes(newName)) ||
        manuallyAddedNames.includes(existingName)
      );
    });

    // Add only new selections that are not already in the updated list
    const combinedNames = Array.from(
      new Set([
        ...newSelectedNames.filter(
          (newName) =>
            !updatedNames.some((existingName) => existingName.includes(newName))
        ),
        ...updatedNames, // Include manually modified or existing names
        ...manuallyAddedNames, // Preserve truly manually added names
      ])
    );

    // Concatenate with bullet points and new lines, with new selections at the top
    const newRemark = combinedNames.map((name) => `• ${name}`).join("\n");

    // Update the form field with the new value
    setValue("internal_remark", newRemark);
  };

  // for external_remark concatenation
  const handleSelectExternalChange = (selectedOptions) => {
    const existingRemark = getValues("external_remark") || "";

    // Split existing remarks into individual lines, trim spaces, and remove any bullet points
    const existingNames = existingRemark
      .split("\n")
      .map((name) => name.trim().replace(/^•\s*/, "")) // Remove any existing bullet points
      .filter(Boolean);

    // Get the text of the newly selected options
    const newSelectedNames =
      selectedOptions?.map((option) => option.text) || [];

    // Identify manually added remarks (those that are not in the select box options)
    const manuallyAddedNames = existingNames.filter(
      (existingName) =>
        !externalResponses.some((option) => existingName.includes(option.text))
    );

    // Remove any existing names that are no longer selected
    const updatedNames = existingNames.filter((existingName) => {
      return (
        newSelectedNames.some((newName) => existingName.includes(newName)) ||
        manuallyAddedNames.includes(existingName)
      );
    });

    // Add only new selections that are not already in the updated list
    const combinedNames = Array.from(
      new Set([
        ...newSelectedNames.filter(
          (newName) =>
            !updatedNames.some((existingName) => existingName.includes(newName))
        ),
        ...updatedNames, // Include manually modified or existing names
        ...manuallyAddedNames, // Preserve truly manually added names
      ])
    );

    // Concatenate with bullet points and new lines, with new selections at the top
    const newRemark = combinedNames.map((name) => `• ${name}`).join("\n");

    // Update the form field with the new value
    setValue("external_remark", newRemark);
  };

  const handleOk = handleSubmit(
    async ({ internal_remark, external_remark, reason }) => {
      setLoading(true);
      const selectedInternalOptionsArr = internalRemark?.map(
        (remark) => remark.id
      );
      const selectedExternalOptionsArr = externalRemark?.map(
        (remark) => remark.id
      );
      const remarkIdsArr = selectedInternalOptionsArr.concat(
        selectedExternalOptionsArr
      );

      try {
        // const body = {
        //   remark_of_application: `Cancel for Reason : ${remark_of_application}`,
        // };
        const body = {
          internal_remark: internal_remark,
          external_remark: external_remark,
          remark_ids: remarkIdsArr,
          reason: reason,
        };
        await applicationService.cancelApplicationByUuid(uuid, body);
        setLoading(false);
        showSuccessToast(CommonMessage.MFS00013);
        handleClose();
       // window.location.reload();
       await dispatch(getApplicationByUuid({ uuid }));
      } catch (e) {
        console.error(e);
        setLoading(false);
        handleClose();
      }
    }
  );

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%" } }}
      maxWidth="lg"
      open={open}
    >
      <DialogTitle
        id="scroll-dialog-title"
        variant="h5"
        sx={{ color: "#1890ff" }}
      >
        Cancel
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid
            container
            item
            spacing={2}
            xs={12}
            sm={6}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <FormInputSelect
                name="internal_remark_select"
                control={control}
                limitTags={2}
                options={internalResponses ?? []}
                label="Selet Internal Remark"
                rules={{ required: false }}
                onSelect={handleSelectInternalChange}
                id="id"
                getOptionLabel={(option) => option?.id}
                sx={{ mb: 2 }}
              />

              <Grid item xs={12}>
                <FormInputText
                  multiline
                  control={control}
                  rules={{ required: true }}
                  label="Internal Remark"
                  name="internal_remark"
                  sx={{
                    pt: 1,
                    mb: 3,
                    textarea: {
                      minHeight: "130px",
                      maxHeight: "130px",
                      overflow: "auto !important",
                    },
                  }}
                />
                <Grid item xs={12}>
                  <FormInputSelectSingle
                    name="reason"
                    control={control}
                    options={applicationReasonsByStatus ?? []}
                    label="Select Reason"
                    rules={{ required: true }}
                    id="id"
                    getOptionLabel={(option) => option?.reason}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            spacing={2}
            xs={12}
            sm={6}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <FormInputSelect
                name="external_remark_select"
                control={control}
                limitTags={2}
                options={externalResponses ?? []}
                label="Select External Remark"
                rules={{ required: false }}
                onSelect={handleSelectExternalChange}
                id="id"
                getOptionLabel={(option) => option?.id}
              />
            </Grid>

            <Grid item xs={12}>
              <FormInputText
                multiline
                control={control}
                rules={{ required: false }}
                label="External Remark"
                name="external_remark"
                sx={{
                  pt: 1,
                  textarea: {
                    minHeight: "130px",
                    maxHeight: "130px",
                    overflow: "auto !important",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleOk}
          disabled={loading} // Disable the button during loading
          startIcon={loading && <CircularProgress size={20} />} // Show loading spinner
        >
          {loading ? "Processing..." : "Ok"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ToolbarApplicationCancelButton);
