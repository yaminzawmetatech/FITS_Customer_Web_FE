import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Skeleton,
  CircularProgress,
  Button,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import FormInputDateTimePicker from "../../../../components/form/FormInputDateTimePicker";
import { useWatch } from "react-hook-form";
import FormInputSelect from "../../../../components/form/FormInputSelect";
import { useParams } from "react-router-dom";
import { get, intersection } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getDealerContactPeople } from "features/dealerContactPerson/dealerContactPersonSlice";
import { syncToGuarantor } from "features/application/applicationDetailSlice";
import { showSuccessToast } from "common/ToastMessage";
import DealerStatusDialog from "./DealerStatusDialog";

const ApplicationInformation = ({
  control,
  categories,
  categoryIsLoading,
  dealers,
  dealerIsLoading,
  CMCO,
  agents,
  creditSchemes,
  isCreditSchemeLoading,
  users,
  user,
  application_fields = {},
  guaranteeCount,
  setValue,
}) => {
  const dispatch = useDispatch();

  const { categoryId, id } = useParams();

  const disabled = useWatch({
    control,
    name: "disabled",
  });
  const credit_scheme_id = useWatch({
    control,
    name: "credit_scheme_id",
  });

  const dealer_id = useWatch({
    control,
    name: "dealer_id",
  });

  const dealer_contact_person_id = useWatch({
    control,
    name: "dealer_contact_person_id",
  });

  const application_id = useWatch({
    control,
    name: "application_id"
  })

  const { dealerContactPeople, isLoading: isContatPeopleLoading } = useSelector(
    (state) => state.dealerContactPeople
  );

  const [contactPeopleState, setContactPeopleState] = useState([]);

  const [showDealerContact, setShowDealerContact] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (credit_scheme_id) {
      const checkGuarnator = creditSchemes?.filter(
        (item) => item.id === credit_scheme_id
      );
      if (checkGuarnator[0]?.dealer_guarantee === "YES") {
        dispatch(
          getDealerContactPeople({
            params: {
              dealer_id: dealer_id,
              type: "Authorized Signer",
              dealer_guarantee: 1,
            },
            allFlag: true,
          })
        );
        setShowDealerContact(true);
      } else {
        setContactPeopleState([]);
        setShowDealerContact(false);
      }
    }
  }, [credit_scheme_id, dealer_id]);

  useEffect(() => {
    if (dealerContactPeople) {
      const tempData = dealerContactPeople.map((item) => ({
        ...item,
        name: `${item.name} (${item.type})`, // Concatenate name and type
      }));
      setContactPeopleState(tempData);
    }
  }, [dealerContactPeople]);

  const subCategories = useMemo(
    () =>
      categories?.find((item) => item.id === parseInt(categoryId))
        ?.sub_categories || [],
    [categories, categoryId]
  );

  const [isSyncing, setIsSyncing] = useState(false);

  const handleSynGuarantor = async () => {
    setIsSyncing(true);
    try {
      const response = await dispatch(
        syncToGuarantor({
          id: dealer_contact_person_id,
          application_id: id,
        })
      );

      // Check if the action was successful
      if (response.payload.success === true) {
        showSuccessToast("Sync Success");
      }
    } catch (e) {
      console.error("Error", e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (dealer_id) {
      const district = dealers
        ?.filter((item) => item.id === dealer_id)
        .map((item) => item?.district?.name)[0];

      setValue("area", district);
    }
  }, [dealer_id, setValue, dealers]);

  const fields = ["credit_scheme_id", "dealer_id", "cmco_id", "agent_id"];
  return (
    <Accordion title="Application Information">
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
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Application ID"
                name="application_id"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDateTimePicker
                control={control}
                label="Applied Date"
                name="applied_date"
                disabled={disabled}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Category"
                name="category.name"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              {categoryIsLoading ? (
                <Skeleton variant="rectangular" height={37.13} />
              ) : (
                <FormInputSelect
                  control={control}
                  options={subCategories}
                  getOptionLabel={(option) => option?.name}
                  id="id"
                  name="sub_category_id"
                  label="Sub Category"
                  disabled={disabled || application_id}
                />
              )}
            </Grid>
            {/* {
              dealer_id && (
                <Grid item xs={12}>
                  <Alert
                    variant="outlined"
                    severity={guaranteeCount?.data?.status === 'Over Limit' ? "error" : "info"}
                    sx={{
                      display: "flex",
                      alignItems: "center", // Align items in a row
                      gap: 2, // Adds spacing between items
                      p: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    <AlertTitle>Dealer Sales Status</AlertTitle>
                    <Grid container alignItems="center" sx={{
                      gap: 1
                    }}>
                      <Grid item>
                        <Typography >Application Stage With Dealer : </Typography>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          flexGrow: 1, // Allows the text to take available space
                        }}
                      >
                        {guaranteeCount?.data?.application_stage_with_dealer}
                      </Grid>

                    </Grid>
                    <Grid container alignItems="center" sx={{
                      gap: 1
                    }}>
                      <Grid item>
                        <Typography >Contract Stage With Dealer : </Typography>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          flexGrow: 1, // Allows the text to take available space
                        }}
                      >
                        {guaranteeCount?.data?.contract_stage_with_dealer}
                      </Grid>

                    </Grid>
                    <Grid container alignItems="center" sx={{
                      gap: 1
                    }}>
                      <Grid item>
                        <Typography >Dealer Guarantee Value : </Typography>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          flexGrow: 1, // Allows the text to take available space
                        }}
                      >
                        {guaranteeCount?.data?.dealer_guarantee_value}
                      </Grid>

                    </Grid>
                  </Alert>
                </Grid>
              )
            } */}
            {dealer_id && guaranteeCount?.data && !Array.isArray(guaranteeCount?.data) && (              
              <Grid item xs={12}>
                <p
                  style={{
                    color:
                      guaranteeCount?.data?.status === "Over Limit"
                        ? "#FF6B6B"
                        : "#64B5F6",
                    fontWeight: "bold",
                    padding: 2,
                  }}
                >
                  ! This dealer's guarantee value is{" "}
                  <strong>
                    {guaranteeCount?.data?.dealer_guarantee_value ?? "-"}
                  </strong>
                  , with application stage at{" "}
                  <strong>
                    {guaranteeCount?.data?.application_stage_with_dealer ?? "-"}
                  </strong>
                  , and contract stage at{" "}
                  <strong>
                    {guaranteeCount?.data?.contract_stage_with_dealer ?? "-"}
                  </strong>
                  .
                </p>
              </Grid>
            )}
            {get(application_fields, "dealer_id") &&
              categoryId !== "6" &&
              categoryId !== "7" && (
                <Grid item xs={12}>
                  {dealerIsLoading ? (
                    <Skeleton variant="rectangular" height={37.13} />
                  ) : (
                    <FormInputSelect
                      control={control}
                      options={dealers}
                      getOptionLabel={(option) => option?.name}
                      id="id"
                      name="dealer_id"
                      label="Dealer"
                      disabled={disabled}
                      rules={{
                        required: application_fields.dealer_id.required, // Set required dynamically
                      }}
                    />
                  )}
                </Grid>
              )}
            {get(application_fields, "credit_scheme_id") && (
              <>
                <Grid item xs={12}>
                  {dealerIsLoading || isCreditSchemeLoading ? (
                    <Skeleton variant="rectangular" height={37.13} />
                  ) : (
                    <>
                      <FormInputSelect
                        control={control}
                        options={creditSchemes}
                        getOptionLabel={(option) => option?.name}
                        id="id"
                        name="credit_scheme_id"
                        label="Scheme"
                        disabled={disabled}
                        rules={{
                          required:
                            application_fields.credit_scheme_id.required, // Set required dynamically
                        }}
                      />
                    </>
                  )}
                </Grid>
                {credit_scheme_id !== null &&
                  credit_scheme_id !== undefined &&
                  credit_scheme_id !== "" &&
                  showDealerContact && (
                    <>
                      <Grid item xs={7} lg={10} sm={7}>
                        {isContatPeopleLoading ? (
                          <Skeleton variant="rectangular" height={37.13} />
                        ) : (
                          <>
                            <FormInputSelect
                              control={control}
                              options={contactPeopleState}
                              getOptionLabel={(option) => option?.name}
                              id="id"
                              name="dealer_contact_person_id"
                              label="Dealer Contact Person"
                              disabled={disabled}
                            />
                          </>
                        )}
                      </Grid>
                      <Grid item xs={2} lg={2} sm={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSynGuarantor}
                          sx={{ width: "80px" }}
                          startIcon={
                            isSyncing && <CircularProgress size={20} />
                          }
                        >
                          Sync
                        </Button>
                      </Grid>
                    </>
                  )}
              </>
            )}
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Status"
                name="status"
                disabled
              />
            </Grid>
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
            {/* <Grid item xs={12}>
                <FormInputSelect
                  control={control}
                  options={users ?? []}
                  getOptionLabel={(option) => option?.user_name}
                  id="id"
                  name="ihco_id"
                  label="IHCO Name"
                  disabled
                />
              </Grid> */}

            {get(application_fields, "cmco_id") && (
              <Grid item xs={12}>
                <FormInputSelect
                  control={control}
                  options={CMCO ?? []}
                  getOptionLabel={(option) => option?.user_name}
                  id="id"
                  name="cmco_id"
                  label="CMCO Name"
                  disabled={user?.user_group === "CMCO" || disabled} // Disable if user.id exists
                  rules={{
                    required: application_fields.cmco_id.required, // Set required dynamically
                  }}
                />
              </Grid>
            )}
            {get(application_fields, "dealer_id") && (
              <Grid item xs={12}>
                <FormInputText
                  control={control}
                  id="id"
                  name="area"
                  label="Area"
                  disabled={true}
                />
              </Grid>
            )}
            {get(application_fields, "agent_id") && (
              <Grid item xs={12}>
                <FormInputSelect
                  control={control}
                  options={agents ?? []}
                  getOptionLabel={(option) => option?.user_name}
                  id="id"
                  name="agent_id"
                  label="Agent Name"
                  disabled={user?.user_group === "Agent" || disabled} // Disable if user.id exists
                  rules={{
                    required: application_fields.agent_id.required, // Set required dynamically
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              {" "}
              <FormInputSelect
                control={control}
                options={users ?? []}
                getOptionLabel={(option) => option?.user_name}
                id="id"
                name="ihco_id"
                label="IHCO Name"
                disabled={
                  disabled ||
                  user?.user_group === "CMCO" ||
                  user?.user_group === "CMCE" ||
                  user?.user_group === "Agent"
                }
              />
            </Grid>

            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Created By"
                name="created_user.user_name"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDateTimePicker
                control={control}
                label="Created Date"
                name="created_at"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputText
                control={control}
                label="Modified By"
                name="modified_user.user_name"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <FormInputDateTimePicker
                control={control}
                label="Modified Date"
                name="updated_at"
                disabled
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Accordion>
  );
};

export default ApplicationInformation;
