import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get, intersection } from "lodash";
import FormInputDatePicker from "../../../../components/form/FormInputDatePicker";
import { useWatch } from "react-hook-form";
import FormInputNumber from "../../../../components/form/FormInputNumber";

const WaveMoneyInformation = ({ control, application_fields = {} }) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const fields = [
    "customer_loan_id",
    "mnet_applied_date",
    "wave_pay_id_mobile",
    "wave_pay_account_name",
    "mobile_operator_type",
    "length_of_wave_amount_mth",
    "length_of_kyc2_mth",
    "mnet_applicant_nrc",
    "mnet_current_address",
  ];

  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title="Wave Money Information">
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
              {get(application_fields, "customer_loan_id") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Customer Loan ID"
                    name="customer_loan_id"
                    disabled={disabled}
                    rules={{
                      required: application_fields.customer_loan_id.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "mnet_applied_date") && (
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Wave Money Applied Date"
                    name="mnet_applied_date"
                    disabled={disabled}
                    rules={{
                      required: application_fields.mnet_applied_date.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "wave_pay_id_mobile") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="WavePayID Mobile"
                    name="wave_pay_id_mobile"
                    disabled={disabled}
                    rules={{
                      required: application_fields.wave_pay_id_mobile.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "wave_pay_account_name") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="WavePay Account Name"
                    disabled={disabled}
                    name="wave_pay_account_name"
                    rules={{
                      required:
                        application_fields.wave_pay_account_name.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "mobile_operator_type") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Mobile Operator Type"
                    name="mobile_operator_type"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.mobile_operator_type.required,
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
              {get(application_fields, "length_of_wave_amount_mth") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Length of Wave Account (Mth)"
                    name="length_of_wave_amount_mth"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.length_of_wave_amount_mth.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "length_of_kyc2_mth") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Length of KYC2(Mth)"
                    name="length_of_kyc2_mth"
                    disabled={disabled}
                    rules={{
                      required: application_fields.length_of_kyc2_mth.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "mnet_applicant_nrc") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KYC POI"
                    name="mnet_applicant_nrc"
                    disabled={disabled}
                    rules={{
                      required: application_fields.mnet_applicant_nrc.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "mnet_current_address") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Current Address"
                    name="mnet_current_address"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.mnet_current_address.required,
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

export default React.memo(WaveMoneyInformation);
