import React from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get, intersection } from "lodash";
import { useWatch } from "react-hook-form";
import FormInputSelect from "../../../../components/form/FormInputSelect";

const CurrentResidenceInformation = ({ control, application_fields = {} }) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const fields = [
    "residence_status",
    "number_of_family_members",
    "living_with_whom",
  ];
  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title="Information of Current Residence">
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
              {get(application_fields, "residence_status") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={[
                      { value: "Own" },
                      { value: "Rent" },
                      { value: "Mortgage" },
                      { value: "Government Housing" },
                      { value: "Hostel" },
                      { value: "Dormitory" },
                      { value: "Other" },
                    ]}
                    getOptionLabel={(option) => option?.value}
                    id="value"
                    name="residence_status"
                    label="Residence Status"
                    disabled={disabled}
                    rules={{
                      required: application_fields.residence_status.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "number_of_family_members") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Numbers of Family Members"
                    name="number_of_family_members"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.number_of_family_members.required, // Set required dynamically
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
              {get(application_fields, "living_with_whom") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={[
                      { value: "Spouse" },
                      { value: "Parents" },
                      { value: "Relatives" },
                      { value: "Friends" },
                      { value: "Other" },
                    ]}
                    getOptionLabel={(option) => option?.value}
                    id="value"
                    name="living_with_whom"
                    label="Living With Whom"
                    disabled={disabled}
                    rules={{
                      required: application_fields.living_with_whom.required, // Set required dynamically
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

export default React.memo(CurrentResidenceInformation);
