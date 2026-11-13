import React, { useCallback, useState } from "react";
import { Box, Grid, Button, CircularProgress } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import FormInputSelect from "../../../../components/form/FormInputSelect";
import { useWatch } from "react-hook-form";
import FormInputDatePicker from "../../../../components/form/FormInputDatePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicationByUuid,
  syncToGuarantorReference,
} from "features/application/applicationDetailSlice";
import { showSuccessToast } from "common/ToastMessage";

const CustomerInformation = ({ control, setValue }) => {
  const dispatch = useDispatch();

  const { application } = useSelector((state) => state.applicationDetail);

  const [isSyncing, setIsSyncing] = useState(false);
  const [disableSelect, setDisableSelect] = useState(false);

  const customer_sync_to = useWatch({
    control,
    name: "customer_sync_to",
  });

  const handleSynGuarantorReference = async () => {
    setIsSyncing(true);
    try {
      const response = await dispatch(
        syncToGuarantorReference({
          type: customer_sync_to,
          id: application?.customer?.customer_id,
        })
      );

      // Check if the action was successful
      if (response.payload.success === true) {
        showSuccessToast("Sync Success");
        setValue("customer_sync_to", "");
        setDisableSelect(true);
      }
    } catch (e) {
      console.error("Error", e);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Accordion title="Customer Information">
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
                label="Customer ID"
                name="customer_mnet_id"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Customer Name"
                name="customer_name"
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="NRC"
                name="customer_full_nrc"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Address"
                name="customer_address"
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
              <FormInputDatePicker
                control={control}
                label="Internet Registration Date"
                name="internet_service_registration_date"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Phone"
                name="customer_primary_phone"
                disabled
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
                name="customer_sync_to"
                label="Sync Customer Info"
                disabled={
                  application?.customer?.customer_status === 0
                    ? true
                    : false || disableSelect
                }
              />
            </Grid>
            <Grid item xs={2} lg={2} sm={2}>
              <Button
                variant="contained"
                color="primary"
                disabled={customer_sync_to ? false : true}
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

export default React.memo(CustomerInformation);
