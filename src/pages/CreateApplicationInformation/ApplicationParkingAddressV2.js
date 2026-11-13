// import React from "react";
// import { Grid, Skeleton } from "@mui/material";
// import FormInputText from "../../../../components/form/FormInputText";
// import FormInputSelect from "components/form/FormInputSelect";
// import FormInputCheckbox from "components/form/FormInputCheckbox";

// const ApplicationParkingAddressV2 = ({
//   disabled,
//   control,
//   setValue,
//   addressCities,
//   addressCitiesLoading,
//   addressDistricts,
//   addressDistrictsLoading,
//   addressStateLoading,
//   addressStates,
//   addressTownshipLoading,
//   addressTownships,
//   addressVillageLoading,
//   addressVillages,
//   addressVillageTracts,
//   addressVillageTractsLoading,
//   addressWards,
//   addressWardsLoading,
//   parkingAddressTownshipsArr,
//   parking_field,
// }) => {
//   return (
//     <Grid
//       container
//       item
//       spacing={2}
//       xs={12}
//       sm={6}
//       justifyContent="flex-start"
//       alignItems="flex-start"
//     >
//       <Grid item xs={12}>
//         <Grid
//           container
//           spacing={2}
//           justifyContent="flex-start"
//           alignItems="flex-start"
//         >
//           <Grid item xs={12}>
//             <label style={{ fontWeight: "bold", paddingRight: "15px" }}>
//               Parking Address
//             </label>
//             <FormInputCheckbox
//               control={control}
//               label="Copy From Current Address?"
//               name="current_parking_same"
//               disabled={disabled}
//             />
//           </Grid>
//         </Grid>
//       </Grid>
//       <Grid item xs={12}>
//         {addressStateLoading ? (
//           <Skeleton variant="rectangular" height={37.13} />
//         ) : (
//           <FormInputSelect
//             control={control}
//             options={addressStates}
//             getOptionLabel={(option) => option?.name}
//             id="id"
//             name="parking_address_state_id"
//             label="State"
//             disabled={disabled}
//             onSelect={(value) => {
//               setValue("parking_address_district_id", "");
//               setValue("parking_address_township_id", "");
//               setValue("parking_address_city_id", "");
//               setValue("parking_address_ward_id", "");
//               setValue("parking_address_village_tract_id", "");
//               setValue("parking_address_village_id", "");
//             }}
//           />
//         )}
//       </Grid>
//       <Grid item xs={12}>
//         {addressDistrictsLoading ? (
//           <Skeleton variant="rectangular" height={37.13} />
//         ) : (
//           <FormInputSelect
//             control={control}
//             options={addressDistricts}
//             getOptionLabel={(option) => option?.name}
//             id="id"
//             name="parking_address_district_id"
//             label="District"
//             disabled={disabled}
//             onSelect={(value) => {
//               setValue("parking_address_township_id", "");
//               setValue("parking_address_city_id", "");
//               setValue("parking_address_ward_id", "");
//               setValue("parking_address_village_tract_id", "");
//               setValue("parking_address_village_id", "");
//             }}
//           />
//         )}
//       </Grid>
//       <Grid item xs={12}>
//         {addressTownshipLoading ? (
//           <Skeleton variant="rectangular" height={37.13} />
//         ) : (
//           <FormInputSelect
//             control={control}
//             options={parkingAddressTownshipsArr}
//             getOptionLabel={(option) => option?.name}
//             id="id"
//             name="parking_address_township_id"
//             label="Township"
//             disabled={disabled}
//             onSelect={(value) => {
//               setValue("parking_address_city_id", "");
//               setValue("parking_address_ward_id", "");
//               setValue("parking_address_village_tract_id", "");
//               setValue("parking_address_village_id", "");
//             }}
//           />
//         )}
//       </Grid>
//       <Grid item xs={12}>
//         {addressCitiesLoading ? (
//           <Skeleton variant="rectangular" height={37.13} />
//         ) : (
//           <FormInputSelect
//             control={control}
//             options={addressCities}
//             getOptionLabel={(option) => option?.name}
//             id="id"
//             name="parking_address_city_id"
//             label="City"
//             disabled={disabled}
//             onSelect={(value) => {
//               setValue("parking_address_ward_id", "");
//               setValue("parking_address_village_tract_id", "");
//               setValue("parking_address_village_id", "");
//             }}
//           />
//         )}
//       </Grid>
//       <Grid item xs={12}>
//         {addressWardsLoading ? (
//           <Skeleton variant="rectangular" height={37.13} />
//         ) : (
//           <FormInputSelect
//             control={control}
//             options={addressWards}
//             getOptionLabel={(option) => option?.name}
//             id="id"
//             name="parking_address_ward_id"
//             label="Ward"
//             onSelect={(value) => {
//               setValue("parking_address_village_tract_id", "");
//               setValue("parking_address_village_id", "");
//             }}
//           />
//         )}
//       </Grid>
//       <Grid item xs={12}>
//         {addressVillageTractsLoading ? (
//           <Skeleton variant="rectangular" height={37.13} />
//         ) : (
//           <FormInputSelect
//             control={control}
//             options={addressVillageTracts}
//             getOptionLabel={(option) => option?.name}
//             id="id"
//             name="parking_address_village_tract_id"
//             label="Village Tract"
//             disabled={disabled}
//             onSelect={(value) => {
//               setValue("parking_address_village_id", "");
//             }}
//           />
//         )}
//       </Grid>
//       <Grid item xs={12}>
//         {addressVillageLoading ? (
//           <Skeleton variant="rectangular" height={37.13} />
//         ) : (
//           <FormInputSelect
//             control={control}
//             options={addressVillages}
//             getOptionLabel={(option) => option?.name}
//             id="id"
//             name="parking_address_village_id"
//             label="Village"
//             disabled={disabled}
//           />
//         )}
//       </Grid>
//       <Grid item xs={12}>
//         <FormInputText
//           multiline
//           control={control}
//           label="Street/Road"
//           name="parking_address_road_street"
//           disabled={disabled}
//           sx={{
//             pt: 1,
//             textarea: {
//               minHeight: "80px",
//               maxHeight: "80px",
//               overflow: "auto !important",
//             },
//           }}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <FormInputText
//           multiline
//           control={control}
//           label="Full Address"
//           name="parking_address_full_address"
//           disabled
//           sx={{
//             pt: 1,
//             textarea: {
//               minHeight: "100px",
//               maxHeight: "100px",
//               overflow: "auto !important",
//             },
//           }}
//         />
//       </Grid>
//     </Grid>
//   );
// };

// export default React.memo(ApplicationParkingAddressV2);
