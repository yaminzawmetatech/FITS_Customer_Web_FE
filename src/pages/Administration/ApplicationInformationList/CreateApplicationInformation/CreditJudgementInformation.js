import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get, intersection } from "lodash";
import FormInputDateTimePicker from "../../../../components/form/FormInputDateTimePicker";
import FormInputNumber from "../../../../components/form/FormInputNumber";

const CreditJudgementInformation = ({ control, application_fields = {} }) => {
  const fields = [
    "approved_amount",
    "credit_assessment_date",
    "credit_assessment_result",
    "approved_by",
    "reason",
  ];
  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title="Credit Judgement Information">
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
              {get(application_fields, "approved_amount") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Approved Amount"
                    name="approved_amount"
                    disabled
                  />
                </Grid>
              )}
              {get(application_fields, "credit_assessment_date") && (
                <Grid item xs={12}>
                  <FormInputDateTimePicker
                    control={control}
                    label="Credit Assessment Date "
                    name="credit_assessment_date"
                    disabled
                  />
                </Grid>
              )}
              
              {get(application_fields, "reason") && (
                  <Grid item xs={12}>
                    <FormInputText
                      multiline
                      control={control}
                      label="Internal Remark"
                      name="internal_remark"
                      disabled
                      sx={{
                        pt: 1,
                        textarea: {
                            minHeight: "200px",
                            maxHeight: "200px",
                            overflow: "auto !important",
                        },
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
              {get(application_fields, "credit_assessment_result") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Credit Assessment Result"
                    name="credit_assessment_result"
                    disabled
                  />
                </Grid>
              )}
              {get(application_fields, "approved_by") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Approved By"
                    disabled
                    name="approved_user.user_name"
                  />
                </Grid>
              )}

              {get(application_fields, "reason") && (
                // <Grid item xs={12}>
                //   <FormInputText
                //     multiline
                //     control={control}
                //     label="Remark"
                //     name="reason"
                //     disabled
                //     sx={{
                //       pt: 1,
                //       textarea: {
                //           minHeight: "200px",
                //           maxHeight: "200px",
                //           overflow: "auto !important",
                //       },
                //     }}
                //   />
                // </Grid>
                  <Grid item xs={12}>
                    <FormInputText
                      multiline
                      control={control}
                      label="External Remark"
                      name="external_remark"
                      disabled
                      sx={{
                        pt: 1,
                        textarea: {
                            minHeight: "200px",
                            maxHeight: "200px",
                            overflow: "auto !important",
                        },
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

export default React.memo(CreditJudgementInformation);
