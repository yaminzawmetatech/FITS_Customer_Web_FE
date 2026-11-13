import React, { useCallback, useState } from "react";
import { Box, Grid, Button, CircularProgress } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get } from "lodash";
import FormInputSelect from "../../../../components/form/FormInputSelect";
import { useWatch } from "react-hook-form";
import { CUSTOMER_RELATIONS } from "constants/customerRelations";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicationByUuid,
  syncToGuarantorReference,
} from "features/application/applicationDetailSlice";
import { showSuccessToast } from "common/ToastMessage";

const ExtraInformation = ({ control, setValue }) => {
  const dispatch = useDispatch();

  const { application } = useSelector((state) => state.applicationDetail);
  const [disableSelect, setDisableSelect] = useState(false);

  const [isSyncing, setIsSyncing] = useState(false);

  const extra_sync_to = useWatch({
    control,
    name: "extra_sync_to",
  });

  const handleSynGuarantorReference = async () => {
    setIsSyncing(true);
    try {
      const response = await dispatch(
        syncToGuarantorReference({
          type: extra_sync_to,
          id: application?.extra_information?.extra_id,
        })
      );

      // Check if the action was successful
      if (response.payload.success === true) {
        showSuccessToast("Sync Success");
        setValue("extra_sync_to", "");
        setDisableSelect(true);
      }
    } catch (e) {
      console.error("Error", e);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Accordion title="Extra Information">
      <Box sx={{ mt: 1 }}>
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
              <FormInputText
                control={control}
                label="Reference Name"
                name="extra_name"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={CUSTOMER_RELATIONS}
                getOptionLabel={(option) => option?.id}
                id="id"
                name="extra_relation_with_customer"
                label="Relation With Borrower and Reference"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Reference Number (Family or Relative)"
                name="extra_primary_phone"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Reference Number (Anyone)"
                name="extra_secondary_phone"
                disabled
              />
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
              <FormInputText
                control={control}
                label="Name of Business"
                name="extra_name_of_business"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Company Address"
                name="extra_business_address"
                disabled
                multiline
                sx={{
                  pt: 1,
                  textarea: {
                    minHeight: "80px",
                    maxHeight: "80px",
                    overflow: "auto !important",
                  },
                }}
              />
            </Grid>
            <Grid item xs={7} lg={10} sm={7}>
              <FormInputSelect
                control={control}
                options={[
                  { id: "guarantor", name: "Guarantor" },
                  { id: "reference", name: "Reference" },
                ]}
                getOptionLabel={(option) => option?.name}
                id="id"
                name="extra_sync_to"
                label="Sync Extra Info"
                disabled={
                  application?.extra_information?.extra_status === 0
                    ? true
                    : false || disableSelect
                }
              />
            </Grid>
            <Grid item xs={2} lg={2} sm={2}>
              <Button
                variant="contained"
                color="primary"
                disabled={extra_sync_to ? false : true}
                onClick={handleSynGuarantorReference}
                sx={{ width: "80px" }}
                startIcon={isSyncing && <CircularProgress size={20} />}
              >
                Sync
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(ExtraInformation);
