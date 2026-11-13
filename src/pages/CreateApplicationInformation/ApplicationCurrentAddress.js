import React from "react";
import { Grid, Skeleton } from "@mui/material";
import FormInputText from "../../../../components/form/FormInputText";
import FormInputSelect from "components/form/FormInputSelect";

const ApplicationCurrentAddressV2 = ({
  disabled,
  control,
  setValue,
  addressCities,
  addressCitiesLoading,
  addressDistricts,
  addressDistrictsLoading,
  addressStateLoading,
  addressStates,
  addressTownshipLoading,
  addressVillageLoading,
  addressVillages,
  addressVillageTracts,
  addressVillageTractsLoading,
  addressWards,
  addressWardsLoading,
  addressTownshipsArr,
}) => {
  return (
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
        {" "}
        <label style={{ fontWeight: "bold" }}>Current Address</label>
      </Grid>
      <Grid item xs={12} />
      <Grid item xs={12}>
        {addressStateLoading ? (
          <Skeleton variant="rectangular" height={37.13} />
        ) : (
          <FormInputSelect
            control={control}
            options={addressStates}
            getOptionLabel={(option) => option?.name}
            id="id"
            name="address_state_id"
            label="State"
            disabled={disabled}
            onSelect={(value) => {
              setValue("address_district_id", "");
              setValue("address_township_id", "");
              setValue("address_city_id", "");
              setValue("address_ward_id", "");
              setValue("address_village_tract_id", "");
              setValue("address_village_id", "");
            }}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        {addressDistrictsLoading ? (
          <Skeleton variant="rectangular" height={37.13} />
        ) : (
          <FormInputSelect
            control={control}
            options={addressDistricts}
            getOptionLabel={(option) => option?.name}
            id="id"
            name="address_district_id"
            label="District"
            disabled={disabled}
            onSelect={(value) => {
              setValue("address_township_id", "");
              setValue("address_city_id", "");
              setValue("address_ward_id", "");
              setValue("address_village_tract_id", "");
              setValue("address_village_id", "");
            }}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        {addressTownshipLoading ? (
          <Skeleton variant="rectangular" height={37.13} />
        ) : (
          <FormInputSelect
            control={control}
            options={addressTownshipsArr}
            getOptionLabel={(option) => option?.name}
            id="id"
            name="address_township_id"
            label="Township"
            disabled={disabled}
            onSelect={(value) => {
              setValue("address_city_id", "");
              setValue("address_ward_id", "");
              setValue("address_village_tract_id", "");
              setValue("address_village_id", "");
            }}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        {addressCitiesLoading ? (
          <Skeleton variant="rectangular" height={37.13} />
        ) : (
          <FormInputSelect
            control={control}
            options={addressCities}
            getOptionLabel={(option) => option?.name}
            id="id"
            name="address_city_id"
            label="City"
            disabled={disabled}
            onSelect={(value) => {
              setValue("address_ward_id", "");
              setValue("address_village_tract_id", "");
              setValue("address_village_id", "");
            }}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        {addressWardsLoading ? (
          <Skeleton variant="rectangular" height={37.13} />
        ) : (
          <FormInputSelect
            control={control}
            options={addressWards}
            getOptionLabel={(option) => option?.name}
            id="id"
            name="address_ward_id"
            label="Ward"
            disabled={disabled}
            onSelect={(value) => {
              setValue("address_village_tract_id", "");
              setValue("address_village_id", "");
            }}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        {addressVillageTractsLoading ? (
          <Skeleton variant="rectangular" height={37.13} />
        ) : (
          <FormInputSelect
            control={control}
            options={addressVillageTracts}
            getOptionLabel={(option) => option?.name}
            id="id"
            name="address_village_tract_id"
            label="Village Tract"
            disabled={disabled}
            onSelect={(value) => {
              setValue("address_village_id", "");
              setValue("address_city_id", "");
              setValue("address_ward_id", "");
            }}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        {addressVillageLoading ? (
          <Skeleton variant="rectangular" height={37.13} />
        ) : (
          <FormInputSelect
            control={control}
            options={addressVillages}
            getOptionLabel={(option) => option?.name}
            id="id"
            name="address_village_id"
            label="Village"
            disabled={disabled}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <FormInputText
          multiline
          control={control}
          label="Street/Road"
          name="address_road_street"
          disabled={disabled}
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
      <Grid item xs={12}>
        <FormInputText
          multiline
          control={control}
          label="Full Address"
          name="address_full_address"
          disabled
          sx={{
            pt: 1,
            textarea: {
              minHeight: "100px",
              maxHeight: "100px",
              overflow: "auto !important",
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(ApplicationCurrentAddressV2);
