import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get, intersection } from "lodash";

const PreviousLoanInformation = ({ control, application_fields = {} }) => {
  const fields = [
    "previous_interest_rate",
    "previous_loan_term",
    "previous_applied_loan_amount",
    "previous_approved_Loan_amount",
    "previous_credit_assessment_result",
    "previous_loan_applied_id",
    "previous_repayment_status",
  ];
  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title="Previous Loan Information">
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
              {get(application_fields, "previous_interest_rate") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Interest Rate"
                    name="previous_interest_rate"
                    disabled
                  />
                </Grid>
              )}

              {get(application_fields, "previous_loan_term") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Loan Term"
                    name="previous_loan_term"
                    disabled
                  />
                </Grid>
              )}

              {get(application_fields, "previous_applied_loan_amount") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Previous Applied Loan Amount"
                    name="previous_applied_loan_amount"
                    disabled
                  />
                </Grid>
              )}

              {get(application_fields, "previous_approved_Loan_amount") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Previous Approved Loan Amount"
                    name="previous_approved_Loan_amount"
                    disabled
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
              {get(application_fields, "previous_credit_assessment_result") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Previous Credit Assessment Result"
                    name="previous_credit_assessment_result"
                    disabled
                  />
                </Grid>
              )}

              {get(application_fields, "previous_loan_applied_id") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Previous Loan Applied Id"
                    name="previous_loan_applied_id"
                    disabled
                  />
                </Grid>
              )}

              {get(application_fields, "previous_repayment_status") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Previous Repayment Status"
                    name="previous_repayment_status"
                    disabled
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

export default React.memo(PreviousLoanInformation);
