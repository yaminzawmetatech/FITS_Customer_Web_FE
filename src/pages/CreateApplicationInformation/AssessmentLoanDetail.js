import React from "react";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get } from "lodash";
import FormInputDatePicker from "components/form/FormInputDatePicker";
import FormInputNumber from "../../../../components/form/FormInputNumber";
import { Box, Grid } from "@mui/material";
import FormInputSelect from "../../../../components/form/FormInputSelect";
import FormInputDecimal from "components/form/FormInputDecimal";

const AssessmentLoanDetail = ({
  assessment,
  control,
  application_fields = {},
}) => {
  return (
    <Accordion title="Assessment Loan Detail">
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
            {/*{get(assessment, "assessment_approved_amount") && (*/}
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Loan Amount"
                name="assessment_approved_amount"
                disabled
              />
            </Grid>
            {/*)}*/}
            {/*{get(assessment, "loan_term_type") && (*/}
            <>
              <Grid item xs={12}>
                <FormInputSelect
                  control={control}
                  options={[{ id: "D" }, { id: "M" }]}
                  getOptionLabel={(option) => option?.id}
                  id="id"
                  label="Tenor/Loan Term Type"
                  name="loan_term_type"
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <FormInputNumber
                  control={control}
                  label="Tenor/Loan Term Duration"
                  name="assessment_tenor"
                  disabled
                />
              </Grid>
            </>
            {/*)}*/}
            {/*{get(assessment, "assessment_interest_rate") && (*/}
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Interest Rate"
                name="assessment_interest_rate"
                disabled
              />
            </Grid>
            {get(application_fields, "assessment_dealer_disbursed_ratio") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Dealer Disbursed Ratio"
                  name="assessment_dealer_disbursed_ratio"
                  disabled={true}
                />
              </Grid>
            )}
            {get(application_fields, "assessment_dealer_disbursed_amount") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Dealer Disbursed Amount"
                  name="assessment_dealer_disbursed_amount"
                  disabled={true}
                />
              </Grid>
            )}
            {get(application_fields, "assessment_customer_disbursed_ratio") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Customer Disbursed Ratio"
                  name="assessment_customer_disbursed_ratio"
                  disabled={true}
                />
              </Grid>
            )}
            {get(
              application_fields,
              "assessment_customer_disbursed_amount"
            ) && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Customer Disbursed Amount"
                  name="assessment_customer_disbursed_amount"
                  disabled={true}
                />
              </Grid>
            )}
            {get(
              application_fields,
              "assessment_vehicle_down_payment_ratio"
            ) && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Assessment Vehicle Down Payment Ratio"
                  name="assessment_vehicle_down_payment_ratio"
                  disabled={true}
                />
              </Grid>
            )}
            {get(
              application_fields,
              "assessment_vehicle_down_payment_amount"
            ) && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Assessment Vehicle Down Payment Amount"
                  name="assessment_vehicle_down_payment_amount"
                  disabled={true}
                />
              </Grid>
            )}
            {get(application_fields, "assessment_down_payment_amount") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  label="Assessment Down Payment Amount"
                  name="assessment_down_payment_amount"
                  disabled={true}
                />
              </Grid>
            )}
            {/*)}*/}
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
            {/*{get(assessment, "assessment_monthly_installment_amount") && (*/}
            <Grid item xs={12}>
              <FormInputText
                multiline
                control={control}
                label="Monthly Installment Amount"
                name="assessment_monthly_installment_amount"
                disabled
              />
            </Grid>
            {/*)}*/}
            {/*{get(assessment, "assessment_stamp_duty_percentage") && (*/}
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Stamp Duty %"
                name="assessment_stamp_duty_percentage"
                disabled
              />
            </Grid>
            {/*)}*/}
            {/*{get(assessment, "assessment_stamp_duty_fees") && (*/}
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Stamp Duty Fee"
                name="assessment_stamp_duty_fees"
                disabled
              />
            </Grid>
            {/*)}*/}

            {/*{get(assessment, "assessment_processing_percentage") && (*/}
            <Grid item xs={12}>
              <FormInputDecimal
                control={control}
                label="Processing %"
                name="assessment_processing_percentage"
                disabled
              />
            </Grid>
            {/*)}*/}
            {/*{get(assessment, "assessment_processing_fees") && (*/}
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Processing Fee"
                name="assessment_processing_fees"
                disabled
              />
            </Grid>
            {/*)}*/}
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="Commencement Date"
                name="assessment_commencement_date"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDatePicker
                control={control}
                label="First Due Date"
                name="assessment_first_due_date"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Prorata Interest"
                name="assessment_prorata_interest"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputNumber
                control={control}
                label="Net Disbursement Amount"
                name="assessment_net_disbursed_amount"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(AssessmentLoanDetail);
