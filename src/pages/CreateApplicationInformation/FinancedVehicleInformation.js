import React, { useEffect, useMemo } from "react";
import { Box, Grid, Skeleton, Button } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import FormInputText from "../../../../components/form/FormInputText";
import { get, intersection } from "lodash";
import { useWatch } from "react-hook-form";
import FormInputSelect from "components/form/FormInputSelect";
import FormInputNumber from "components/form/FormInputNumber";
import FormInputRadio from "components/form/FormInputRadio";
import { useDispatch, useSelector } from "react-redux";
import { getInsuranceCompaines } from "features/insuranceCompany/insuranceCompanySlice";
import { getInsurancePremiumFees } from "features/insurancePremiumFee/insurancePremiumFeeSlice";

const FinancedVehicleInformation = ({
  control,
  application_fields = {},
  vehicles,
  vehicleLoading,
  setValue,
}) => {
  const disabled = useWatch({
    control,
    name: "disabled",
  });

  const dispatch = useDispatch();

  const { insuranceCompanies, isLoading: insuranceCompaniesLoading } =
    useSelector((state) => state.insuranceCompanies);

  const { insurancePremiumFees, isLoading: insurancePremiumFeesLoading } =
    useSelector((state) => state.insurancePremiumFees);

  useEffect(() => {
    dispatch(
      getInsuranceCompaines({
        allFlag: true,
      })
    );
  }, [dispatch]);

  const insurance_company = useWatch({
    control,
    name: "insurance_company",
  });

  const selectedBrand = useWatch({
    control,
    name: "brand_id",
  });
  const selectedModel = useWatch({
    control,
    name: "model_id",
  });

  const selectedVehicleId = useMemo(() => {
    const vehicle = vehicles.find(
      (v) => v.brand_id === selectedBrand && v.model_id === selectedModel
    );
    return vehicle ? vehicle.id : null;
  }, [selectedBrand, selectedModel, vehicles]);

  useEffect(() => {
    if (insurance_company && selectedVehicleId) {
      dispatch(
        getInsurancePremiumFees({
          params: {
            vehicle_id: selectedVehicleId,
            insurance_company_id: insurance_company,
          },
          allFlag: true,
        })
      );
    }
  }, [dispatch, insurance_company, selectedVehicleId]);

  useEffect(() => {
    if(insurance_company && selectedVehicleId){
      if (insurancePremiumFees.length > 0) {
        setValue("insurance_premium_fees", insurancePremiumFees[0]?.amount);
      } else {
        setValue("insurance_premium_fees", 0);
      }
    }
  }, [insurancePremiumFees, insurance_company, setValue, selectedVehicleId]);

  const stockAvailabilityOptions = [
    { id: 2, value: "Yes" },
    { id: 1, value: "No" },
  ];

  const parkingAddressOptions = [
    { id: "current", key: "Same with Current Address" },
    { id: "permanent", key: "Same with Permanent Address" },
    { id: "parking", key: "Other" },
  ];

  const OTR_OV = [{ value: "On The Road" }, { value: "Only Vehicle" }];

  // // Deduplicate vehicles array by brand_id
  const uniqueBrandVehicles = useMemo(() => {
    const vehicleMap = new Map();
    vehicles.forEach((vehicle) => {
      if (vehicle?.brand_id) {
        vehicleMap.set(vehicle.brand_id, vehicle);
      }
    });
    return Array.from(vehicleMap.values());
  }, [vehicles]);

  // // Deduplicate vehicles array by model_id
  const uniqueModelVehicles = useMemo(() => {
    const vehicleMap = new Map();
    vehicles.forEach((vehicle) => {
      if (vehicle?.model_id) {
        vehicleMap.set(vehicle.model_id, vehicle);
      }
    });
    return Array.from(vehicleMap.values());
  }, [vehicles]);

  const fields = [
    "insurance_company",
    "insurance_default_rate",
    "insurance_fixed_amount",
    "vehicle_color",
    "brand_id",
    "model_id",
    "engine_power",
    "year_of_manufacture",
    "division",
    "plate_no",
    "chassis_no",
    "engine_no",
    "stock_availability",
    "parking_address",
    "user_of_unit",
    "purpose_of_unit",
    "otr_ov",
  ];
  if (intersection(fields, Object.keys(application_fields)).length) {
    return (
      <Accordion title="Financed Vehicle Information">
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
              {get(application_fields, "insurance_company") && (
                <Grid item xs={12}>
                  {insuranceCompaniesLoading ? (
                    <Skeleton variant="rectangular" height={37.13} />
                  ) : (
                    <FormInputSelect
                      control={control}
                      options={insuranceCompanies}
                      getOptionLabel={(option) => option?.name}
                      id="id"
                      name="insurance_company"
                      label="Insurance Company"
                      disabled={disabled}
                      rules={{
                        required: application_fields.insurance_company.required, // Set required dynamically
                      }}
                    />
                  )}
                </Grid>
              )}
              {get(application_fields, "insurance_default_rate") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Insurance Default Rate"
                    name="insurance_default_rate"
                    disabled={disabled}
                    rules={{
                      required:
                        application_fields.insurance_default_rate.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "insurance_fixed_amount") && (
                <Grid item xs={12}>
                  <FormInputNumber
                    control={control}
                    label="Insurance Fixed Amount"
                    name="insurance_fixed_amount"
                    rules={{
                      required:
                        application_fields.insurance_fixed_amount.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "vehicle_color") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Vehicle Color"
                    name="vehicle_color"
                    disabled={disabled}
                    rules={{
                      required: application_fields.vehicle_color.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "brand_id") && (
                <Grid item xs={12}>
                  {vehicleLoading ? (
                    <Skeleton variant="rectangular" height={37.13} />
                  ) : (
                    <FormInputSelect
                      control={control}
                      options={uniqueBrandVehicles}
                      getOptionLabel={(option) =>
                        option?.brand_name || "Select Brands"
                      }
                      id="brand_id"
                      name="brand_id"
                      label="Brand Code"
                      disabled={disabled}
                      rules={{
                        required: application_fields.brand_id.required, // Set required dynamically
                      }}
                    />
                  )}
                </Grid>
              )}
              {get(application_fields, "model_id") && (
                <Grid item xs={12}>
                  {vehicleLoading ? (
                    <Skeleton variant="rectangular" height={37.13} />
                  ) : (
                    <FormInputSelect
                      control={control}
                      options={uniqueModelVehicles}
                      getOptionLabel={(option) =>
                        option?.model_name || "Select Models"
                      }
                      id="model_id"
                      name="model_id"
                      label="Model Code"
                      disabled={disabled || !selectedBrand}
                      rules={{
                        required: application_fields.model_id.required, // Set required dynamically
                      }}
                    />
                  )}
                </Grid>
              )}
              {get(application_fields, "engine_power") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Engine Power"
                    name="engine_power"
                    disabled={disabled}
                    rules={{
                      required: application_fields.engine_power.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "year_of_manufacture") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Year of Manufacture"
                    name="year_of_manufacture"
                    disabled={disabled}
                    rules={{
                      required: application_fields.year_of_manufacture.required,
                    }}
                  />
                </Grid>
              )}
               {/* {get(application_fields, "manufacturer") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Manufacture"
                    name="manufacturer"
                    disabled={disabled}
                    rules={{
                      required: application_fields.manufacturer.required,
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
              {get(application_fields, "division") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Division"
                    name="division"
                    disabled={disabled}
                    rules={{
                      required: application_fields.division.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "plate_no") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Plate No."
                    name="plate_no"
                    disabled={disabled}
                    rules={{
                      required: application_fields.plate_no.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "chassis_no") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Chassis No."
                    name="chassis_no"
                    disabled={disabled}
                    rules={{
                      required: application_fields.chassis_no.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "engine_no") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Engine No."
                    name="engine_no"
                    disabled={disabled}
                    rules={{
                      required: application_fields.engine_no.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "stock_availability") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={stockAvailabilityOptions}
                    getOptionLabel={(option) => option?.value}
                    id="id"
                    name="stock_availability"
                    label="Stock Availability"
                    disabled={disabled}
                    rules={{
                      required: application_fields.stock_availability.required, // Set required dynamically
                    }}
                  />
                </Grid>
              )}
              {/* <Grid item xs={12} >
                                <Grid>
                                    <label style={{ fontWeight: "bold", paddingRight: "15px" }}>
                                        Parking Address
                                    </label>
                                </Grid>
                                <Grid>
                                    <FormInputCheckbox
                                        control={control}
                                        label="Copy From Current Address?"
                                        name="current_parking_same"
                                        disabled={disabled}
                                    />
                                </Grid>

                                <Grid>
                                    <FormInputCheckbox
                                        control={control}
                                        label="Copy From Permanent Address?"
                                        name="permanent_parking_same"
                                        disabled={disabled}
                                    />
                                </Grid>


                            </Grid>
                            {get(application_fields, "parking_address") && (
                                <Grid item xs={12}>
                                    <FormInputText
                                        control={control}
                                        label="Parking Address"
                                        name="parking_address"
                                        disabled={disabled}
                                        rules={{
                                            required: application_fields.parking_address.required,
                                        }}
                                    />
                                </Grid>
                
                )} */}
              {get(application_fields, "parking_address") && (
                <Grid item xs={12}>
                  <Grid>
                    <label style={{ fontWeight: "bold", paddingRight: "15px" }}>
                      Parking Address
                    </label>
                  </Grid>

                  <Grid>
                    <FormInputRadio
                      control={control}
                      options={parkingAddressOptions}
                      name="parking_address_option"
                      id="id"
                      row
                      disabled={disabled}
                    />
                  </Grid>
                </Grid>
              )}
              {get(application_fields, "parking_address") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Parking Address"
                    name="parking_address"
                    disabled={disabled}
                    rules={{
                      required: application_fields.parking_address.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "user_of_unit") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="User of Unit"
                    name="user_of_unit"
                    disabled={disabled}
                    rules={{
                      required: application_fields.user_of_unit.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "purpose_of_unit") && (
                <Grid item xs={12}>
                  <FormInputText
                    control={control}
                    label="Purpose of Unit"
                    name="purpose_of_unit"
                    disabled={disabled}
                    rules={{
                      required: application_fields.purpose_of_unit.required,
                    }}
                  />
                </Grid>
              )}
              {get(application_fields, "purpose_of_unit") && (
                <Grid item xs={12}>
                  <FormInputSelect
                    control={control}
                    options={OTR_OV}
                    getOptionLabel={(option) => option?.value}
                    id="value"
                    label="On The Road/Only Vehicle"
                    name="otr_ov"
                    disabled={disabled}
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

export default React.memo(FinancedVehicleInformation);
