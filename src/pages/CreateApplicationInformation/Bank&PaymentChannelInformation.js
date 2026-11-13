import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get, intersection } from "lodash";
import FormInputSelect from "components/form/FormInputSelect";

const BankPaymentChannelInformation = ({ control, application_fields = {}, customerBanks }) => {
  const fields = ["bank_payment_channel", "account_name", "account_no"];

  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title="Bank/Payment Channel Information">
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
              {get(application_fields, "bank_payment_channel") && (
                <Grid item xs={12}>
                  {/* <FormInputText
                    control={control}
                    label="Bank/ Payment Channel"
                    name="bank_payment_channel_id"
                    rules={{
                      required:
                        application_fields.bank_payment_channel.required,
                    }}
                  /> */}
                  <FormInputSelect
                    control={control}
                    options={customerBanks}
                    getOptionLabel={(option) => option?.name}
                    id="id"
                    name="customer_bank_payment_channel_id"
                    label="Bank/ Payment Channel"
                  // disabled={disabled}
                  />
                </Grid>

              )}
              {get(application_fields, "account_name") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Account Name"
                    name="account_name"
                    rules={{
                      required: application_fields.account_name.required,
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
              {get(application_fields, "account_no") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Account No."
                    name="account_no"
                    rules={{
                      required: application_fields.account_no.required,
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

export default BankPaymentChannelInformation;
