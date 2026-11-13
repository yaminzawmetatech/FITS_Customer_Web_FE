import React, { useEffect, useState } from "react";
import { Box, Grid, Skeleton, Button } from "@mui/material";
import { get, intersection } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useController, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import FormInputText from "../../../../components/form/FormInputText";
import FormInputSelect from "../../../../components/form/FormInputSelect";
import FormInputDatePicker from "../../../../components/form/FormInputDatePicker";
import Accordion from "../../../../components/Accordion";
import { CUSTOMER_RELATIONS } from "../../../../constants/customerRelations";
import { getNRCTownships } from "../../../../features/nrcTownship/nrcTownshipSlice";

const FormInputNrc = React.memo(
  ({
    control,
    application_fields = {},
    // handleCheckExistingCustomer,
    nrcStates,
    nrcStateLoading,
    lang
    // application,
  }) => {

    const { field } = useController({
      name: "reference_nrc",
      control,
    });

    const dispatch = useDispatch();

    const nrc_state_id = useWatch({
      control,
      name: "reference_nrc_state_id",
    });

    const nrc_township_id = useWatch({
      control,
      name: "reference_nrc_township_id",
    });
    const nrc_number = useWatch({
      control,
      name: "reference_nrc_number",
    });

    const nrc_remark = useWatch({
      control,
      name: "reference_nrc_remark",
    });

    const nrc = useWatch({
      control,
      name: "nrc",
    });

    const old_nrc = useWatch({
      control,
      name: "old_nrc",
    });

    const { field: nrcTownshipField } = useController({
      name: "reference_nrc_township_id",
      control,
    });

    const highestEduBackgroundOptions = [
      { value: "High School", label: "High School" },
      { value: "Diploma", label: "Diploma" },
      { value: "Bachelor's Degree", label: "Bachelor's Degree" },
      { value: "Master's Degree", label: "Master's Degree" },
      { value: "Ph.D.", label: "Ph.D." },
      { value: "Other", label: "Other" },
    ];

    const nrcRemarks = [
      { key: "n", value: "N" },
      { key: "e", value: "E" },
      { key: "p", value: "P" },
      { key: "c", value: "C" }
    ];


    const [localTownships, setLocalTownships] = useState([]);
    const [loadingTownships, setLoadingTownships] = useState(false);

    useEffect(() => {
      if (nrc_state_id) {
        setLoadingTownships(true);

        dispatch(getNRCTownships({ n_r_c_state_id: nrc_state_id }))
          .unwrap()
          .then((res) => {
            setLocalTownships(res.data || []);
          })
          .catch(() => {
            setLocalTownships([]);
          })
          .finally(() => {
            setLoadingTownships(false);
          });
      } else {
        setLocalTownships([]);
      }
    }, [dispatch, nrc_state_id]);

    useEffect(() => {
      const nrc_state = nrcStates.find((item) => item.id === nrc_state_id);
      const nrc_township = localTownships.find(
        (item) => item.id === nrc_township_id
      );
      const nrc =
        nrc_state?.state_code &&
          nrc_township?.township_nrc_code &&
          nrc_remark &&
          nrc_number
          ? `${nrc_state?.state_code || ""}/${nrc_township?.township_nrc_code || ""
          }(${nrc_remark || ""})${nrc_number || ""}`
          : "";
      field.onChange(nrc);
    }, [
      field,
      nrcStates,
      localTownships,
      nrc_number,
      nrc_remark,
      nrc_state_id,
      nrc_township_id,
    ]);

    const disabled = useWatch({
      control,
      name: "disabled",
    });

    return (
      <>
        <Grid item xs={12}>
          {nrcStateLoading ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={nrcStates}
              getOptionLabel={(option) => option?.state_code}
              id="id"
              name="reference_nrc_state_id"
              label="NRC State/Division"
              disabled={disabled}
              rules={{
                required:  application_fields.reference_nrc.required,
              }}
              onSelect={(value) => {
                nrcTownshipField.onChange("");
              }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {loadingTownships ? (
            <Skeleton variant="rectangular" height={37.13} />
          ) : (
            <FormInputSelect
              control={control}
              options={localTownships}
              getOptionLabel={(option) => option?.township_nrc_code}
              id="id"
              name="reference_nrc_township_id"
              label="NRC District/Township"
              disabled={disabled}
              rules={{
                required:  application_fields.reference_nrc.required,
              }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <FormInputSelect
            control={control}
            options={nrcRemarks}
            getOptionLabel={(option) => option?.value}
            id="value"
            name="reference_nrc_remark"
            label="NRC Remark"
            disabled={disabled}
            rules={{
              required:  application_fields.reference_nrc.required,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText
            control={control}
            label="NRC Number"
            name="reference_nrc_number"
            disabled={disabled}
            rules={{
              required: application_fields.reference_nrc.required,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText control={control} label="NRC" disabled name="reference_nrc" />
        </Grid>
        {/* <Grid item xs={2} lg={2} sm={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCheckExistingCustomer(nrc)}
            sx={{ width: "80px" }}
            disabled={application.status !== "New" || nrc === "" || nrc === null}
          >
            Check
          </Button>
        </Grid> */}
        {/* </Grid> */}
        {/* <Grid item xs={12}>
          <FormInputText
            control={control}
            label="Old NRC"
            name="old_nrc"
            disabled={disabled}
            rules={{
              required: !!!nrc && application_fields.nrc.required,
            }}
          />
        </Grid> */}
      </>
    );
  }
);



const ReferenceInformation = ({
  control,
  application_fields = {},
  handleCheckExistingCustomer,
  nrcStates,
  nrcStateLoading,
}) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const { field } = useController({
    name: "reference_age",
    control,
  });

  const date_of_birth = useWatch({
    control,
    name: "reference_dob",
  });

  useEffect(() => {
    if (date_of_birth) {
      const dob = new Date(date_of_birth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();

      field.onChange(age);
      if (age < 18 || age > 60) {
        toast.warning("Applicant age is " + age + " years.");
      }
    }
  }, [date_of_birth, field]);

  const fields = [
    "reference_full_name",
    "reference_nrc",
    "reference_father_name",
    "reference_dob",
    "reference_primary_phone_no",
    "reference_secondary_phone_no",
    "reference_relation_with_customer",
    
  ];
  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title="Reference Information">
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
              {get(application_fields, "reference_full_name") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label={application_fields?.reference_full_name?.value}
                    name="reference_full_name"
                    disabled={disabled}
                    rules={{
                      required: application_fields.reference_full_name.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "reference_nrc") && (
                <FormInputNrc
                  control={control}
                  application_fields={application_fields}
                  handleCheckExistingCustomer={handleCheckExistingCustomer}
                  nrcStates={nrcStates}
                  nrcStateLoading={nrcStateLoading}
                />
              )}

              {/* {get(application_fields, "facebook_account") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Facebook Account"
                    disabled={disabled}
                    name="facebook_account"
                    rules={{
                      required: application_fields.facebook_account.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "tiktok_account") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="TikTok Account"
                    disabled={disabled}
                    name="tiktok_account"
                    rules={{
                      required: application_fields.tiktok_account.required,
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
              {get(application_fields, "reference_father_name") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Father's Name"
                    name="reference_father_name"
                    disabled={disabled}
                    rules={{
                      required: application_fields.reference_father_name.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {/* {get(application_fields, "other") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Other"
                    name="other"
                    disabled={disabled}
                  />
                </Grid>
              )} */}
              {get(application_fields, "reference_relation_with_customer") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={CUSTOMER_RELATIONS}
                    getOptionLabel={(option) => option?.id}
                    id="id"
                    name="reference_relation_with_customer"
                    label="Relation with Customer"
                    disabled={disabled}
                    rules={{
                      required: application_fields.reference_relation_with_customer.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "reference_dob") && (
                <Grid item xs={12}>
                  <FormInputDatePicker
                    control={control}
                    label="Date of Birth"
                    name="reference_dob"
                    disabled={disabled}
                    rules={{
                      required: application_fields.reference_dob.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "reference_primary_phone_no") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Primary Phone Number"
                    name="reference_primary_phone_no"
                    disabled={disabled}
                    rules={{
                      required: application_fields.reference_primary_phone_no.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "reference_secondary_phone_no") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Secondary Phone Number"
                    disabled={disabled}
                    name="reference_secondary_phone_no"
                    rules={{
                      required:
                        application_fields.reference_secondary_phone_no.required,
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

export default React.memo(ReferenceInformation);
