import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get, intersection } from "lodash";
import FormInputDatePicker from "../../../../components/form/FormInputDatePicker";
import { useController, useWatch } from "react-hook-form";
import FormInputNumber from "../../../../components/form/FormInputNumber";
import FormInputSelect from "../../../../components/form/FormInputSelect";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const MyanmarNetInformation = ({ control, application_fields = {}, application }) => {

  const prev_id = application.prev_application_id;
  const prev_uuid = application.prev_application_uuid;
  const url = prev_id ? `/CreditManagement/CreateApplicationInformation/Project F/1/${prev_uuid}/${prev_id}/view` : undefined;
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const { field } = useController({
    name: "usage_period",
    control,
  });

  const internet_service_registration_date = useWatch({
    control,
    name: "internet_service_registration_date",
  });

  const mnet_applied_date = useWatch({
    control,
    name: "mnet_applied_date",
  });

  const fields = [
    "mnet_application_id",
    "mnet_applicant_name",
    "mnet_customer_id",
    "mnet_applicant_nrc",
    "mnet_applied_date",
    "mnet_applied_amount",
    "mnet_township",
    "mnet_verified_date",
    "mnet_customer_category",
    "mnet_customer_account_type",
    "internet_service_registration_date",
    "usage_period",
    "current_internet_plan",
  ];

  useEffect(() => {
    // const duration = dayjs(mnet_applied_date).diff(
    //   dayjs(internet_service_registration_date)
    // );
    // const difference = Math.ceil(duration / (1000 * 60 * 60 * 24));
    // // const difference = Math.ceil(duration / (1000 * 60 * 60 * 24));
    //
    // const years = Math.floor(difference??0 / 365);
    // const months = Math.floor((difference??0 % 365) / 30);
    // const remainingDays = difference??0 - (years * 365 + months * 30);
    // const period = (remainingDays ?? 0) + 'days' + (months ?? 0) + 'month(s)' + (years ?? 0) + 'year(s)';
    field.onChange(0);

    const date1 = dayjs(mnet_applied_date);
    const date2 = dayjs(internet_service_registration_date);
    const duration = date1.diff(date2, "year month day");
    if (duration < 0) {
      toast.warning(
        "Internet Service Registration Date must be smaller than Mnet Applied Date"
      );
    } else {
      const years = Math.floor(duration / (365 * 24 * 60 * 60 * 1000)) ?? 0;
      const remainingDuration =
        duration - years * (365 * 24 * 60 * 60 * 1000) ?? 0;
      const months =
        Math.floor(remainingDuration / (30 * 24 * 60 * 60 * 1000)) ?? 0;
      const remainingDays =
        Math.floor(
          (remainingDuration - months * (30 * 24 * 60 * 60 * 1000)) /
            (24 * 60 * 60 * 1000)
        ) ?? 0;

      const period =
        (remainingDays ?? 0) +
        "days" +
        (months ?? 0) +
        "month(s)" +
        (years ?? 0) +
        "year(s)";
      // if(isNaN(remainingDays)) {
      //   field.onChange('usage_period' ?? 0);
      // } else {
      field.onChange(period);
      // }
    }
  }, [internet_service_registration_date, mnet_applied_date, field]);
  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title="Myanmar Net Information">
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
              {get(application_fields, "mnet_application_id") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Mnet Application ID"
                    name="mnet_application_id"
                    disabled={disabled}
                    rules={{
                      required: application_fields.mnet_application_id.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "mnet_customer_id") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Mnet Customer ID"
                    name="mnet_customer_id"
                    disabled={disabled}
                    rules={{
                      required: application_fields.mnet_customer_id.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "mnet_applicant_name") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Mnet Customer Name"
                    disabled={disabled}
                    name="mnet_applicant_name"
                    rules={{
                      required: application_fields.mnet_applicant_name.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "mnet_applicant_nrc") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Mnet Applicant NRC"
                    name="mnet_applicant_nrc"
                    disabled={disabled}
                    rules={{
                      required: application_fields.mnet_applicant_nrc.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "mnet_applied_date") && (
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Mnet Applied Date"
                    name="mnet_applied_date"
                    disabled={disabled}
                    rules={{
                      required: application_fields.mnet_applied_date.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "mnet_applied_amount") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="MN Applied Amount"
                    name="mnet_applied_amount"
                    disabled={disabled}
                    rules={{
                      required: application_fields.mnet_applied_amount.required,
                    }}
                  />
                </Grid>
              )}
               {get(application_fields, "mnet_current_address") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="MNet Current Address"
                    name="mnet_current_address"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.mnet_current_address?.required,
                    }}
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
              )}
              {get(application_fields, "mnet_permanent_address") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="MNet Permanent Address"
                    name="mnet_permanent_address"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.mnet_permanent_address?.required,
                    }}
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
                )}
                {get(application_fields, "prev_mnet_application_id") && (url !== undefined) &&  (
                <Grid item xs={12}>
                
                <a href={url}>
                  <FormInputText
                    control={control}
                    label="Previous Mnet Application Id" // with Link
                    name="prev_mnet_application_id"
                    disabled={true}
                    rules={{
                      required: application_fields.prev_mnet_application_id?.required,
                    }}
                  />
                </a>
                </Grid>
                )}
                {get(application_fields, "prev_mnet_application_id") && (url === undefined ) && (
                <Grid item xs={12}>
                
                  <FormInputText
                    control={control}
                    label="Previous Mnet Application Id"
                    name="prev_mnet_application_id"
                    disabled={disabled}
                    rules={{
                      required: application_fields.prev_mnet_application_id?.required,
                    }}
                  />
                </Grid>
                )}
                {get(application_fields, "mnet_loan_term") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Mnet Loan Term"
                    name="mnet_loan_term"
                    disabled={true}
                    rules={{
                      required: application_fields.mnet_loan_term?.required,
                    }}
                  />
                </Grid>
                )}
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
              {get(application_fields, "mnet_township") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="MN Township"
                    name="mnet_township"
                    disabled={disabled}
                    rules={{
                      required: application_fields.mnet_township.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "mnet_verified_date") && (
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="MN Verified Date"
                    name="mnet_verified_date"
                    disabled={disabled}
                    rules={{
                      required: application_fields.mnet_verified_date.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "mnet_customer_category") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={[
                      { value: "Prime" },
                      { value: "Prime Lite" },
                      { value: "Ace Prime" },
                    ]}
                    getOptionLabel={(option) => option?.value}
                    id="value"
                    name="mnet_customer_category"
                    label="Credit Category ( Customer Category )"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.mnet_customer_category.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "mnet_customer_account_type") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={[
                      { value: "Normal Account" },
                      { value: "Child Account" },
                    ]}
                    getOptionLabel={(option) => option?.value}
                    id="value"
                    name="mnet_customer_account_type"
                    label="MN Customer Account Type"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.mnet_customer_account_type.required,
                    }}
                  />
                </Grid>
              )}

              {get(
                application_fields,
                "internet_service_registration_date"
              ) && (
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Internet Service Registration Date"
                    name="internet_service_registration_date"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.internet_service_registration_date
                          .required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "usage_period") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Usage Period"
                    name="usage_period"
                    disabled={disabled}
                    rules={{
                      required: application_fields.usage_period.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "current_internet_plan") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Current Internet Plan"
                    name="current_internet_plan"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.current_internet_plan.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "mnet_is_joint_customer") && ( 
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={[
                      { id: "Yes", name: "Yes" },
                      { id: "No", name: "No" },
                  ]}
                    getOptionLabel={(option) => option?.name}
                    id="id"
                    label="Is Joint Customer?"
                    name="mnet_is_joint_customer"
                    disabled={disabled}
                    rules={{
                      required: application_fields.mnet_is_joint_customer.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
               {get(application_fields, "mnet_consumer_type") && ( 
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Consumer Type"
                    name="mnet_consumer_type"
                    disabled={disabled}
                    rules={{
                      required: application_fields.mnet_consumer_type.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "mnet_interest_rate") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Mnet Interest Rate"
                    name="mnet_interest_rate"
                    disabled={true}
                    rules={{
                      required: application_fields.mnet_interest_rate?.required,
                    }}
                  />
                </Grid>
                )}
            </Grid>
          </Grid>
        </Box>
      </Accordion>
    );
  }
  return <></>;
};

export default React.memo(MyanmarNetInformation);
