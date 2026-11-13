import React, { useEffect, useMemo } from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import { get, intersection } from "lodash";
import { useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  OCCUPATIONS,
  TYPE_OF_EMPLOYMENT,
  TYPE_OF_PROOF_OF_INCOME,
} from "../../../../constants/occupationalInformation";
import Accordion from "../../../../components/Accordion";
import FormInputSelect from "../../../../components/form/FormInputSelect";
import FormInputText from "../../../../components/form/FormInputText";
import FormInputNumber from "../../../../components/form/FormInputNumber";

const OccupationalInformation = ({
  control,
  application_fields = {},
}) => {
  const dispatch = useDispatch();

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const fields = [
    "title_position",
    "department",
    "employment_address",
    "employment_period_years",
    "name_of_emp_or_business",
    "monthly_income",
  ];

  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title="Occupational Information">
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
              {get(application_fields, "title_position") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Title/Position"
                    name="title_position"
                    disabled={disabled}
                    rules={{
                      required: application_fields.title_position.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "monthly_income") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Monthly Income"
                    name="monthly_income"
                    disabled={disabled}
                    rules={{
                      required: application_fields.monthly_income.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "department") ? (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Department"
                    name="department"
                    disabled={disabled}
                    rules={{
                      required: application_fields.department.required, // Set required dynamically
                    }}
                  />
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Skeleton variant="rectangular" width="100%" height={56} />
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
              {get(application_fields, "name_of_emp_or_business") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Name of Employer/Business"
                    name="name_of_emp_or_business"
                    disabled={disabled}
                    rules={{
                      required: application_fields.name_of_emp_or_business.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "employment_period_years") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Employment Period (Years)"
                    name="employment_period_years"
                    disabled={disabled}
                    rules={{
                      required: application_fields.employment_period_years.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "employment_address") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Employment Address"
                    name="employment_address"
                    disabled={disabled}
                    rules={{
                      required: application_fields.employment_address.required, // Set required dynamically
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

export default React.memo(OccupationalInformation);
