import React, { useCallback, useEffect, useMemo } from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import FormInputSelect from "../../../../components/form/FormInputSelect";
import FormInputNumber from "components/form/FormInputNumber";
import { useWatch } from "react-hook-form";
import { get, intersection } from "lodash";
import { useParams } from "react-router-dom";

const EducationInformation = ({
  setValue,
  control,
  application_fields = {},
  dealersByType,
}) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const { categoryId } = useParams();

  // Watch the selected dealer to dynamically fetch grades
  const selectedDealer = useWatch({
    control,
    name: "dealer_id",
  });

  const package_id = useWatch({
    control,
    name: "package_id",
  });

  useEffect(() => {
    if (selectedDealer) {
      const district = dealersByType
        ?.filter((item) => item.id === selectedDealer)
        .map((item) => item?.district?.name)[0];

      setValue("area", district);
    }
  }, [selectedDealer, setValue, dealersByType]);

  // Filter dealer packages based on the selected dealer
  const filteredPackages = useMemo(() => {
    const dealer = dealersByType.find((dealer) => dealer.id === selectedDealer);
    return dealer?.dealer_packages || [];
  }, [dealersByType, selectedDealer]);

  useEffect(() => {
    // Find the selected package based on grade
    const selectedPackage = filteredPackages?.find(
      (pkg) => pkg.id === package_id
    );

    // Update the package_fees field if a matching package is found
    if (selectedPackage) {
      setValue("package_fees", selectedPackage.fees || 0);
    }
  }, [package_id, filteredPackages, setValue]);

  const relationShipWithApplicant = [
    { id: 1, name: "Parent" },
    { id: 2, name: "Sibling" },
    { id: 3, name: "Spouse" },
    { id: 4, name: "Guardian" },
    { id: 5, name: "Friend" },
    { id: 6, name: "Colleague" },
    { id: 7, name: "Other" },
  ];

  const fields = [
    "school_name",
    "student_name",
    "pacjkage_id",
    "relationship_with_applicant",
    "package_fees",
  ];
  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title={categoryId === "7" ? "Education Information" : "Package Information" }>
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
              {get(application_fields, "dealer_id") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={dealersByType}
                    getOptionLabel={(option) => option?.name}
                    id="id"
                    name="dealer_id"
                    label={categoryId === "7" ? "School Name" : "Travel Agency"}
                    disabled={disabled}
                    rules={{
                      required: application_fields.dealer_id.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "student_name") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Student Name"
                    name="student_name"
                    disabled={disabled}
                    rules={{
                      required: application_fields.student_name.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "package_id") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={filteredPackages}
                    getOptionLabel={(option) => option?.grade}
                    id="id"
                    name="package_id"
                    label={categoryId === "7" ? "Grade" : "Package"}
                    disabled={disabled}
                    rules={{
                      required: application_fields.package_id.required, // Set required dynamically
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
              {get(application_fields, "relationship_with_applicant") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={relationShipWithApplicant}
                    getOptionLabel={(option) => option?.name}
                    id="name"
                    name="relationship_with_applicant"
                    label="Relationship With Applicant"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.relationship_with_applicant.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "package_fees") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label={categoryId === "7" ? "School Fees" : "Package Fees"}
                    name="package_fees"
                    disabled
                    rules={{
                      required: application_fields.package_fees.required, // Set required dynamically
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

export default EducationInformation;
