import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get, intersection } from "lodash";
import { useWatch } from "react-hook-form";
import { APPLY_BY_YOURSELF } from "constants/loanInformation";
import FormInputSelect from "components/form/FormInputSelect";

const KPayInformation = ({ control, application_fields = {} }) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const fields = [
    "kpay_registered_address",
    "kpay_permanent_address",
    "kpay_current_address",
    "kpay_nrc",
    "kpay_main_business_category",
    "kpay_sub_business_category",
    "kpay_type_of_business",
    "kpay_occupation",
    "kpay_purpose_of_loan",
    "kpay_remark_for_debt_from_other_financing",
    "kpay_type_of_employment",
  ];

  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title="KPay Information">
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
              {get(application_fields, "kpay_id") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KPay ID"
                    name="kpay_id"
                    disabled={disabled}
                    rules={{
                      required: application_fields.kpay_id?.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "kpay_nrc") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KPay NRC"
                    name="kpay_nrc"
                    disabled={disabled}
                    rules={{
                      required: application_fields.kpay_nrc?.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "kpay_registered_address") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KPay Registered Address"
                    name="kpay_registered_address"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.kpay_registered_address?.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "kpay_current_address") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KPay Current Address"
                    name="kpay_current_address"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.kpay_current_address?.required,
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
              {get(application_fields, "kpay_permanent_address") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KPay Permanent Address"
                    name="kpay_permanent_address"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.kpay_permanent_address?.required,
                    }}
                  />
                </Grid>
              )}
              {/* {get(application_fields, "kpay_purpose_of_loan") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KPay Purpose of Loan"
                    name="kpay_purpose_of_loan"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.kpay_purpose_of_loan?.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "debt_from_other_financing") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Debt From Other Financing"
                    name="debt_from_other_financing"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.debt_from_other_financing?.required,
                    }}
                  />
                </Grid>
              )}
              {get(
                application_fields,
                "kpay_remark_for_debt_from_other_financing"
              ) && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Remark for Debt From Other Financing"
                    name="kpay_remark_for_debt_from_other_financing"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields
                          .kpay_remark_for_debt_from_other_financing?.required,
                    }}
                  />
                </Grid>
              )} */}
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
               {get(application_fields, "kpay_purpose_of_loan") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KPay Purpose of Loan"
                    name="kpay_purpose_of_loan"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.kpay_purpose_of_loan?.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "debt_from_other_financing") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Debt From Other Financing"
                    name="debt_from_other_financing"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.debt_from_other_financing?.required,
                    }}
                  />
                </Grid>
              )}
              {get(
                application_fields,
                "kpay_remark_for_debt_from_other_financing"
              ) && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Remark for Debt From Other Financing"
                    name="kpay_remark_for_debt_from_other_financing"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields
                          .kpay_remark_for_debt_from_other_financing?.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "kpay_main_business_category") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KPay Main Business Category"
                    name="kpay_main_business_category"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.kpay_main_business_category
                          ?.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "kpay_sub_business_category") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KPay Sub Business Category"
                    name="kpay_sub_business_category"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.kpay_sub_business_category?.required,
                    }}
                  />
                </Grid>
              )}

              {get(application_fields, "kpay_occupation") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KPay Occupation"
                    name="kpay_occupation"
                    disabled={disabled}
                    rules={{
                      required: application_fields.kpay_occupation?.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "kpay_type_of_employment") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KPay Type of Employment"
                    name="kpay_type_of_employment"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.kpay_type_of_employment?.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "kpay_type_of_business") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="KPay Type of Business"
                    name="kpay_type_of_business"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.kpay_type_of_business?.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "repayment_method") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={[{ id: "Auto Debt" }, { id: "Qucik Pay" }]}
                    getOptionLabel={(option) => option?.id}
                    id="id"
                    label="Repayment Method"
                    name="repayment_method"
                    disabled={disabled}
                    rules={{
                      required: application_fields.repayment_method.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "apply_by_yourself") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={APPLY_BY_YOURSELF}
                    getOptionLabel={(option) => option?.name}
                    id="id"
                    label="Apply By Yourself"
                    name="apply_by_yourself"
                    disabled={disabled}
                    rules={{
                      required: application_fields.apply_by_yourself.required, // Set required dynamically
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

export default React.memo(KPayInformation);
