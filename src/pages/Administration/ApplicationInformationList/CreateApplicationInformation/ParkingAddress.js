// import React, { useEffect, useState } from "react";
// import { Box, Grid } from "@mui/material";
// import Accordion from "../../../../components/Accordion";
// import ApplicationPermanentAddressV2 from "./ApplicationPermanentAddress";
// import { useDispatch, useSelector } from "react-redux";
// import { useController, useWatch } from "react-hook-form";
// import {
//     getAddressDistrictsForParkingAddress,
//     getParkingDistrictByStateAndTownship,
//     resetParkingAddressDistricts,
// } from "../../../../features/address/District/addressDistrictSlice";
// import {
//     getAddressCitiesForParkingAddress,
//     resetParkingAddressCities,
// } from "../../../../features/address/City/addressCitySlice";
// import {
//     getAddressWardsForParkingAddress,
//     resetParkingAddressWards,
// } from "../../../../features/address/Ward/addressWardSlice";
// import {
//     getAddressVillageTractsForParkingAddress,
//     resetParkingAddressVillageTracts,
// } from "../../../../features/address/VillageTract/addressVillageTractSlice";
// import {
//     getAddressVillagesForParkingAddress,
//     resetParkingAddressVillages,
// } from "../../../../features/address/Village/addressVillageSlice";
// import {
//     getAddressTownshipsForParkingAddress,
// } from "../../../../features/address/Township/addressTownshipSlice";
// import ApplicationParkingAddressV2 from "./ApplicationParkingAddressV2";

// const ParkingAddress = ({ control, setValue }) => {
//     const dispatch = useDispatch();

//     const { addressStates, isLoading: addressStateLoading } = useSelector(
//         (state) => state.addressStates
//     );

//     // parking selector

//     const {
//         addressTownships: addressTownshipsForParkingAddress,
//         isLoading: addressTownshipsForParkingAddressLoading,
//     } = useSelector(
//         (state) => state.addressTownships.addressTownshipsForParkingAddress
//     );

//     const {
//         addressWards: addressWardsForParkingAddress,
//         isLoading: addressWardsForParkingAddressLoading,
//     } = useSelector(
//         (state) => state.addressWards.addressWardsForParkingAddress
//     );

//     const {
//         addressVillages: addressVillagesForParkingAddress,
//         isLoading: addressVillagesForParkingAddressLoading,
//     } = useSelector(
//         (state) => state.addressVillages.addressVillagesForParkingAddress
//     );

//     const {
//         addressCities: addressCitiesForParkingAddress,
//         isLoading: addressCitiesForParkingAddressLoading,
//     } = useSelector(
//         (state) => state.addressCities.addressCitiesForParkingAddress
//     );

//     const {
//         addressVillageTracts: addressVillageTractsForParkingAddress,
//         isLoading: addressVillageTractsForParkingAddressLoading,
//     } = useSelector(
//         (state) =>
//             state.addressVillageTracts.addressVillageTractsForParkingAddress
//     );

//     const {
//         addressDistricts: addressDistrictsForParkingAddress,
//         isLoading: addressDistrictsForParkingAddressLoading,
//     } = useSelector(
//         (state) => state.addressDistricts.addressDistrictsForParkingAddress
//     );

//     // permanent address

//     const [parkingAddressTownshipsArr, setParkingAddressTownshipsArr] =
//         useState([]);

//     const { field: parking_field } = useController({
//         name: "parking_address_full_address",
//         control,
//     });

//     const parking_address_district_id = useWatch({
//         control,
//         name: "parking_address_district_id",
//     });
//     const parking_address_state_id = useWatch({
//         control,
//         name: "parking_address_state_id",
//     });
//     const parking_address_township_id = useWatch({
//         control,
//         name: "parking_address_township_id",
//     });
//     const parking_address_city_id = useWatch({
//         control,
//         name: "parking_address_city_id",
//     });

//     const parking_address_village_tract_id = useWatch({
//         control,
//         name: "parking_address_village_tract_id",
//     });

//     const parking_address_ward_id = useWatch({
//         control,
//         name: "parking_address_ward_id",
//     });

//     const parking_address_village_id = useWatch({
//         control,
//         name: "parking_address_village_id",
//     });

//     const parking_address_road_street = useWatch({
//         control,
//         name: "parking_address_road_street",
//     });

//     const disabled = useWatch({
//         control,
//         name: "disabled",
//     });

//     useEffect(() => {
//         if (parking_address_state_id === null) {
//             dispatch(resetParkingAddressDistricts());
//             setParkingAddressTownshipsArr([]);
//             dispatch(resetParkingAddressCities());
//             dispatch(resetParkingAddressWards());
//             dispatch(resetParkingAddressVillageTracts());
//             dispatch(resetParkingAddressVillages());
//         } else if (parking_address_district_id === null) {
//             const townshipsArr = addressStates
//                 .filter((state) => state.id === parking_address_state_id)
//                 .map((state) => state.townships)
//                 .flat();
//             setParkingAddressTownshipsArr(townshipsArr);

//             dispatch(resetParkingAddressCities());
//             dispatch(resetParkingAddressWards());
//             dispatch(resetParkingAddressVillageTracts());
//             dispatch(resetParkingAddressVillages());
//         } else if (parking_address_township_id === null) {
//             dispatch(resetParkingAddressCities());
//             dispatch(resetParkingAddressWards());
//             dispatch(resetParkingAddressVillageTracts());
//             dispatch(resetParkingAddressVillages());
//         } else if (parking_address_city_id === null) {
//             dispatch(resetParkingAddressWards());
//             dispatch(resetParkingAddressVillageTracts());
//             dispatch(resetParkingAddressVillages());
//         } else if (parking_address_ward_id === null) {
//             dispatch(resetParkingAddressVillageTracts());
//             dispatch(resetParkingAddressVillages());
//         } else if (parking_address_village_tract_id === null) {
//             dispatch(resetParkingAddressVillages());
//         }
//     }, [
//         dispatch,
//         parking_address_state_id,
//         parking_address_district_id,
//         parking_address_township_id,
//         parking_address_city_id,
//         parking_address_ward_id,
//         parking_address_village_tract_id,
//     ]);

//     useEffect(() => {
//         if (parking_address_state_id) {
//             dispatch(
//                 getAddressDistrictsForParkingAddress({ address_state_id: parking_address_state_id })
//             );
//         }
//     }, [dispatch, parking_address_state_id]);

//     useEffect(() => {
//         if (
//             parking_address_state_id &&
//             parking_address_township_id &&
//             parking_address_district_id === null
//         ) {
//             dispatch(
//                 getParkingDistrictByStateAndTownship({
//                     addressStateId: parking_address_state_id,
//                     addressTownshipId: parking_address_township_id,
//                 })
//             );
//         } else if (
//             (parking_address_township_id === null || !parking_address_township_id) &&

//             parking_address_state_id
//         ) {
//             dispatch(
//                 getAddressDistrictsForParkingAddress({ address_state_id: parking_address_state_id })
//             );
//         }
//     }, [
//         dispatch,
//         parking_address_township_id,
//         parking_address_state_id,
//         parking_address_district_id,
//     ]);

//     useEffect(() => {
//         if (parking_address_state_id && parking_address_township_id) {
//             let district_id = parkingAddressTownshipsArr.find(
//                 (township) => township.id === parking_address_township_id
//             )?.address_district_id;
//             let temp_address_district_id = addressDistrictsForParkingAddress.find(
//                 (district) => district.id === district_id
//             )?.id;
//             setValue("parking_address_district_id", temp_address_district_id);
//         }
//     }, [
//         parking_address_township_id,
//         parking_address_state_id,
//         addressDistrictsForParkingAddress,
//         parkingAddressTownshipsArr,
//     ]);

//     useEffect(() => {
//         if (parking_address_state_id) {
//             const townshipsArr = addressStates
//                 .filter((state) => state.id === parking_address_state_id)
//                 .map((state) => state.townships)
//                 .flat();
//             setParkingAddressTownshipsArr(townshipsArr);
//         }
//     }, [parking_address_state_id, addressStates]);

//     useEffect(() => {
//         if (parking_address_district_id && !parking_address_township_id) {
//             dispatch(
//                 getAddressTownshipsForParkingAddress({
//                     address_district_id: parking_address_district_id,
//                 })
//             );
//         }
//     }, [dispatch, parking_address_district_id, parking_address_township_id]);

//     useEffect(() => {
//         setParkingAddressTownshipsArr(addressTownshipsForParkingAddress);
//     }, [addressTownshipsForParkingAddress]);

//     useEffect(() => {
//         if (parking_address_township_id) {
//             dispatch(
//                 getAddressCitiesForParkingAddress({ address_township_id: parking_address_township_id })
//             );
//         }
//     }, [dispatch, parking_address_township_id]);

//     useEffect(() => {
//         if (parking_address_city_id) {
//             dispatch(
//                 getAddressWardsForParkingAddress({ address_city_id: parking_address_city_id })
//             );
//         }
//     }, [dispatch, parking_address_city_id]);

//     useEffect(() => {
//         if (parking_address_township_id) {
//             dispatch(
//                 getAddressVillageTractsForParkingAddress({
//                     address_township_id: parking_address_township_id,
//                 })
//             );
//         }
//     }, [dispatch, parking_address_township_id]);

//     useEffect(() => {
//         if (parking_address_village_tract_id) {
//             dispatch(
//                 getAddressVillagesForParkingAddress({
//                     address_village_tract_id: parking_address_village_tract_id,
//                 })
//             );
//         }
//     }, [dispatch, parking_address_village_tract_id]);

//     useEffect(() => {
//         const parkingState = addressStates.find(
//             (item) => item.id === parking_address_state_id
//         );
//         const parkingDistrict = addressDistrictsForParkingAddress.find(
//             (item) => item.id === parking_address_district_id
//         );
//         const parkingTownship = addressTownshipsForParkingAddress.find(
//             (item) => item.id === parking_address_township_id
//         );
//         const parkingCity = addressCitiesForParkingAddress.find(
//             (item) => item.id === parking_address_city_id
//         );
//         const parkingWard = addressWardsForParkingAddress.find(
//             (item) => item.id === parking_address_ward_id
//         );
//         const parkingVillageTract = addressVillagesForParkingAddress.find(
//             (item) => item.id === parking_address_village_tract_id
//         );
//         const parkingVillage = addressVillagesForParkingAddress.find(
//             (item) => item.id === parking_address_village_id
//         );

//         const parking_full_address =
//             (parkingState ? parkingState.name : "") +
//             (parkingDistrict ? `/${parkingDistrict.name}` : "") +
//             (parkingTownship ? `/${parkingTownship.name}` : "") +
//             (parkingCity ? `/${parkingCity.name}` : "") +
//             (parkingWard ? `/${parkingWard.name}` : "") +
//             (parkingVillageTract ? `/${parkingVillageTract.name}` : "") +
//             (parkingVillage ? `/${parkingVillage.name}` : "") +
//             (parking_address_road_street
//                 ? `/${parking_address_road_street}`
//                 : "" || "");

//         parking_field.onChange(parking_full_address);
//     }, [
//         parking_field,
//         addressStates,
//         addressDistrictsForParkingAddress,
//         addressTownshipsForParkingAddress,
//         addressCitiesForParkingAddress,
//         addressWardsForParkingAddress,
//         addressVillageTractsForParkingAddress,
//         // addressVillages.address_state_id,
//         addressVillagesForParkingAddress,
//         parking_address_state_id,
//         parking_address_district_id,
//         parking_address_township_id,
//         parking_address_city_id,
//         parking_address_ward_id,
//         parking_address_village_tract_id,
//         parking_address_village_id,
//         parking_address_road_street,
//     ]);

//     // end ======

//     // end

//     return (
//         <Accordion title="Applicant Address" disabled>
//             {/* <Box sx={{ mt: 1 }}> */}
//                 {/* <Grid
//                     container
//                     spacing={2}
//                     justifyContent="flex-start"
//                     alignItems="flex-start"
//                 > */}
//                     <ApplicationParkingAddressV2
//                         disabled={disabled}
//                         control={control}
//                         setValue={setValue}
//                         addressStates={addressStates}
//                         addressStateLoading={addressStateLoading}
//                         addressTownships={addressTownshipsForParkingAddress}
//                         addressTownshipLoading={addressTownshipsForParkingAddressLoading}
//                         addressWards={addressWardsForParkingAddress}
//                         addressWardsLoading={addressWardsForParkingAddressLoading}
//                         addressVillages={addressVillagesForParkingAddress}
//                         addressVillageLoading={addressVillagesForParkingAddressLoading}
//                         addressCities={addressCitiesForParkingAddress}
//                         addressCitiesLoading={addressCitiesForParkingAddressLoading}
//                         addressVillageTracts={addressVillageTractsForParkingAddress}
//                         addressVillageTractsLoading={
//                             addressVillageTractsForParkingAddressLoading
//                         }
//                         addressDistricts={addressDistrictsForParkingAddress}
//                         addressDistrictsLoading={addressDistrictsForParkingAddressLoading}
//                         parkingAddressTownshipsArr={parkingAddressTownshipsArr}
//                         parking_field={parking_field}
//                     />
//                 {/* </Grid> */}
//             {/* </Box> */}
//         </Accordion>
//     );
// };

// export default React.memo(ParkingAddress);
