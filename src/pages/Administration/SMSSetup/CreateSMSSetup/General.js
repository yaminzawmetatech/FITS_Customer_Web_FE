import React, { useEffect, useMemo, useState } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import Accordion from "components/Accordion";
import FormInputText from "components/form/FormInputText";
import { useWatch } from "react-hook-form";
import FormInputCheckbox from "components/form/FormInputCheckbox";
import { useDispatch, useSelector } from "react-redux";
import FormInputSelect from "components/form/FormInputSelect";
import { getReminders } from "features/reminderSetup/reminderSetupSlice";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";

const General = ({ control, setValue }) => {
  
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const sms_type = useWatch({
    control,
    name: "sms_type",
  });

  const APPLICATION_STATUS = [
    { key: "approved", value: "Approved" },
    { key: "rejected", value: "Rejected" },
  ];

  const CONTRACT_STATUS = [
    { key: "overdue", value: "Overdue" },
    { key: "normal", value: "Normal" },
    { key: "both", value: "Both" },
  ];

  const INITIAL_PAYMENT_CALC_STATUS = [
    // { key: "pending", value: "Pending" },
    { key: "completed", value: "Complete" },
  ];

  const SMS_TYPE = [
    { key: "application", value: "Application" },
    { key: "contract", value: "Contract" },
    { key: "disbursement", value: "Disbursement" },
    { key: "disbursement-dealer", value: "Disbursement Dealer" },
    { key: "disbursement-customer", value: "Disbursement Customer" },
  ];

  const dispatch = useDispatch();

  const { projectCategories, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.projectCategories);

  const { reminders } = useSelector((state) => state.reminders);

  const category_id = useWatch({
    control,
    name: "category_id",
  });

    const subCategories = useMemo(
      () =>
        projectCategories?.find((item) => item.id === parseInt(category_id))
          ?.sub_categories || [],
      [projectCategories, category_id]
    );

  useEffect(() => {
    dispatch(getProjectCategory());
    dispatch(getReminders());
  }, [dispatch]);

  return (
    <Accordion title="General">
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
                label="Code"
                name="code"
                disabled={disabled}
                //rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={projectCategories ?? []}
                getOptionLabel={(option) => option?.name || ""}
                id="id"
                label="Category"
                name="category_id"
                disabled={disabled}
                //rules={{ required: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={subCategories ?? []}
                getOptionLabel={(option) => option?.name || ""}
                id="id"
                label="Sub Category"
                name="sub_category_id"
                disabled={disabled}
                //rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={reminders ?? []}
                getOptionLabel={(option) => option?.reminder_code || ""}
                id="id"
                label="Reminder Code"
                name="reminder_code"
                disabled={disabled}
                //rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: "14px" }}>
              <FormInputCheckbox
                control={control}
                label="Active"
                name="active"
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
              <FormInputSelect
                control={control}
                options={SMS_TYPE ?? []}
                getOptionLabel={(option) => option?.value || ""}
                id="key"
                label="SMS Type"
                name="sms_type"
                disabled={disabled}
                onSelect={(value) => {
                  setValue("application_status", "");
                  setValue("contract_status", "");
                }}
                //rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={APPLICATION_STATUS ?? []}
                getOptionLabel={(option) => option?.value || ""}
                id="key"
                label="Application Status"
                name="application_status"
                disabled={disabled || sms_type === "contract"}
                //rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={CONTRACT_STATUS ?? []}
                getOptionLabel={(option) => option?.value || ""}
                id="key"
                label="Contract Status"
                name="contract_status"
                disabled={disabled || sms_type === "application" || sms_type === "disbursement"}
                //rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="checkbox"
                style={{
                  width: "22px",
                  height: "15px",
                  marginBottom: "13px",
                  marginTop: "10px",
                }}
                disabled
                checked={
                  (projectCategories &&
                    projectCategories.find((item) => item.id === category_id)
                      ?.user_insurance) ||
                  false
                }
              />
              Use Insurance
            </Grid>
            <Grid item xs={12}>
              <input
                type="checkbox"
                style={{
                  width: "22px",
                  height: "15px",
                  marginBottom: "13px",
                  marginTop: "10px",
                }}
                disabled
                checked={
                  (projectCategories &&
                    projectCategories.find((item) => item.id === category_id)
                      ?.insurance_inspection_require) ||
                  false
                }
              />
              Insurance Inspection Require
            </Grid>
            <Grid item xs={12}>
              <FormInputSelect
                control={control}
                options={INITIAL_PAYMENT_CALC_STATUS ?? []}
                getOptionLabel={(option) => option?.value || ""}
                id="key"
                label="Initial Payment Calc. Status"
                name="initial_payment_calc_status"
                disabled={disabled}
                //rules={{ required: true }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(General);
