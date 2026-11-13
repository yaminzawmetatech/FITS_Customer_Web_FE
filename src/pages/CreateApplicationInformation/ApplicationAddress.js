import React, { useEffect, useState, useRef } from "react";
import { Box, Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import ApplicationCurrentAddressV2 from "./ApplicationCurrentAddress";
import ApplicationPermanentAddressV2 from "./ApplicationPermanentAddress";
import { useDispatch, useSelector } from "react-redux";
import { useController, useWatch } from "react-hook-form";
import {
  getAddressDistricts,
  getAddressDistrictsForPermanentAddress,
  getDistrictByStateAndTownship,
  getPermanentDistrictByStateAndTownship,
  resetAddressDistricts,
  resetPermanentAddressDistricts,
} from "../../../../features/address/District/addressDistrictSlice";
import {
  getAddressCities,
  getAddressCitiesForPermanentAddress,
  resetAddressCities,
  resetPermanentAddressCities,
} from "../../../../features/address/City/addressCitySlice";
import {
  getAddressWards,
  getAddressWardsForPermanentAddress,
  resetAddressWards,
  resetPermanentAddressWards,
} from "../../../../features/address/Ward/addressWardSlice";
import {
  getAddressVillageTracts,
  getAddressVillageTractsForPermanentAddress,
  resetAddressVillageTracts,
  resetPermanentAddressVillageTracts,
} from "../../../../features/address/VillageTract/addressVillageTractSlice";
import {
  getAddressVillages,
  getAddressVillagesForPermanentAddress,
  resetAddressVillages,
  resetPermanentAddressVillages,
} from "../../../../features/address/Village/addressVillageSlice";
import {
  getAddressTownships,
  getAddressTownshipsForPermanentAddress,
} from "../../../../features/address/Township/addressTownshipSlice";

const ApplicationAddressV2 = ({ control, setValue }) => {
  const dispatch = useDispatch();

  const { addressStates, isLoading: addressStateLoading } = useSelector(
    (state) => state.addressStates
  );

  const { addressTownships, isLoading: addressTownshipLoading } = useSelector(
    (state) => state.addressTownships
  );

  const { addressWards, isLoading: addressWardsLoading } = useSelector(
    (state) => state.addressWards
  );

  const { addressVillages, isLoading: addressVillageLoading } = useSelector(
    (state) => state.addressVillages
  );

  const { addressCities, isLoading: addressCitiesLoading } = useSelector(
    (state) => state.addressCities
  );

  const { addressVillageTracts, isLoading: addressVillageTractsLoading } =
    useSelector((state) => state.addressVillageTracts);

  const { addressDistricts, isLoading: addressDistrictsLoading } = useSelector(
    (state) => state.addressDistricts
  );

  // permanent selector

  const {
    addressTownships: addressTownshipsForPermanentAddress,
    isLoading: addressTownshipsForPermanentAddressLoading,
  } = useSelector(
    (state) => state.addressTownships.addressTownshipsForPermanentAddress
  );

  const {
    addressWards: addressWardsForPermanentAddress,
    isLoading: addressWardsForPermanentAddressLoading,
  } = useSelector(
    (state) => state.addressWards.addressWardsForPermanentAddress
  );

  const {
    addressVillages: addressVillagesForPermanentAddress,
    isLoading: addressVillagesForPermanentAddressLoading,
  } = useSelector(
    (state) => state.addressVillages.addressVillagesForPermanentAddress
  );

  const {
    addressCities: addressCitiesForPermanentAddress,
    isLoading: addressCitiesForPermanentAddressLoading,
  } = useSelector(
    (state) => state.addressCities.addressCitiesForPermanentAddress
  );

  const {
    addressVillageTracts: addressVillageTractsForPermanentAddress,
    isLoading: addressVillageTractsForPermanentAddressLoading,
  } = useSelector(
    (state) =>
      state.addressVillageTracts.addressVillageTractsForPermanentAddress
  );

  const {
    addressDistricts: addressDistrictsForPermanentAddress,
    isLoading: addressDistrictsForPermanentAddressLoading,
  } = useSelector(
    (state) => state.addressDistricts.addressDistrictsForPermanentAddress
  );

  // permanent address

  const [permanentAddressTownshipsArr, setPermanentAddressTownshipsArr] =
    useState([]);

  const { field: permanent_field } = useController({
    name: "permanent_address_full_address",
    control,
  });

  const permanent_address_district_id = useWatch({
    control,
    name: "permanent_address_district_id",
  });
  const permanent_address_state_id = useWatch({
    control,
    name: "permanent_address_state_id",
  });
  const permanent_address_township_id = useWatch({
    control,
    name: "permanent_address_township_id",
  });
  const permanent_address_city_id = useWatch({
    control,
    name: "permanent_address_city_id",
  });

  const permanent_address_village_tract_id = useWatch({
    control,
    name: "permanent_address_village_tract_id",
  });

  const permanent_address_ward_id = useWatch({
    control,
    name: "permanent_address_ward_id",
  });

  const permanent_address_village_id = useWatch({
    control,
    name: "permanent_address_village_id",
  });

  const permanent_address_road_street = useWatch({
    control,
    name: "permanent_address_road_street",
  });

  useEffect(() => {
   
    if (permanent_address_state_id === null) {
      dispatch(resetPermanentAddressDistricts());
      setPermanentAddressTownshipsArr([]);
      dispatch(resetPermanentAddressCities());
      dispatch(resetPermanentAddressWards());
      dispatch(resetPermanentAddressVillageTracts());
      dispatch(resetPermanentAddressVillages());
    } else if (permanent_address_district_id === null) {
      const townshipsArr = addressStates
        .filter((state) => state.id === permanent_address_state_id)
        .map((state) => state.townships)
        .flat();
      setPermanentAddressTownshipsArr(townshipsArr);

      dispatch(resetPermanentAddressCities());
      dispatch(resetPermanentAddressWards());
      dispatch(resetPermanentAddressVillageTracts());
      dispatch(resetPermanentAddressVillages());
    } else if (permanent_address_township_id === null) {
      dispatch(resetPermanentAddressCities());
      dispatch(resetPermanentAddressWards());
      dispatch(resetPermanentAddressVillageTracts());
      dispatch(resetPermanentAddressVillages());
    } else if (permanent_address_city_id === null) {
      dispatch(resetPermanentAddressWards());
      dispatch(resetPermanentAddressVillageTracts());
      dispatch(resetPermanentAddressVillages());
    } else if (permanent_address_ward_id === null) {
      dispatch(resetPermanentAddressVillageTracts());
      dispatch(resetPermanentAddressVillages());
    } else if (permanent_address_village_tract_id === null) {
      dispatch(resetPermanentAddressVillages());
    }

  }, [
    dispatch,
    permanent_address_state_id,
    permanent_address_district_id,
    permanent_address_township_id,
    permanent_address_city_id,
    permanent_address_ward_id,
    permanent_address_village_tract_id,
  ]);

  useEffect(() => {
    if (permanent_address_state_id) {
      dispatch(
        getAddressDistrictsForPermanentAddress({address_state_id: permanent_address_state_id})
      );
    }
  }, [dispatch, permanent_address_state_id]);

  useEffect(() => {
    if (
      permanent_address_state_id &&
      permanent_address_township_id &&
      permanent_address_district_id === null
    ) {
      dispatch(
        getPermanentDistrictByStateAndTownship({
          addressStateId: permanent_address_state_id,
          addressTownshipId: permanent_address_township_id,
        })
      );
    } else if (
        (permanent_address_township_id === null || !permanent_address_township_id) &&

      permanent_address_state_id
    ) {
      dispatch(
        getAddressDistrictsForPermanentAddress({ address_state_id: permanent_address_state_id })
      );
    }
  }, [
    dispatch,
    permanent_address_township_id,
    permanent_address_state_id,
    permanent_address_district_id,
  ]);

  useEffect(() => {
    if (permanent_address_state_id && permanent_address_township_id) {
      let district_id = permanentAddressTownshipsArr.find(
        (township) => township.id === permanent_address_township_id
      )?.address_district_id;
      let temp_address_district_id = addressDistrictsForPermanentAddress.find(
        (district) => district.id === district_id
      )?.id;
      setValue("permanent_address_district_id", temp_address_district_id);
    }
  }, [
    permanent_address_township_id,
    permanent_address_state_id,
    addressDistrictsForPermanentAddress,
    permanentAddressTownshipsArr,
  ]);

  useEffect(() => {
    if (permanent_address_state_id) {
      const townshipsArr = addressStates
        .filter((state) => state.id === permanent_address_state_id)
        .map((state) => state.townships)
        .flat();
      setPermanentAddressTownshipsArr(townshipsArr);
    }
  }, [permanent_address_state_id, addressStates]);

  useEffect(() => {
    if (permanent_address_district_id && !permanent_address_township_id) {
      dispatch(
        getAddressTownshipsForPermanentAddress({
            address_district_id: permanent_address_district_id,
        })
      );
    }
  }, [dispatch, permanent_address_district_id, permanent_address_township_id]);

  useEffect(() => {
    setPermanentAddressTownshipsArr(addressTownshipsForPermanentAddress);
  }, [addressTownshipsForPermanentAddress]);

  useEffect(() => {
    if (permanent_address_township_id) {
      dispatch(
        getAddressCitiesForPermanentAddress({ address_township_id: permanent_address_township_id })
      );
    }
  }, [dispatch, permanent_address_township_id]);

  useEffect(() => {
    if (permanent_address_city_id) {
      dispatch(
        getAddressWardsForPermanentAddress({ address_city_id: permanent_address_city_id })
      );
    }
  }, [dispatch, permanent_address_city_id]);

  useEffect(() => {
    if (permanent_address_township_id) {
      dispatch(
        getAddressVillageTractsForPermanentAddress({
            address_township_id: permanent_address_township_id,
        })
      );
    }
  }, [dispatch, permanent_address_township_id]);

  useEffect(() => {
    if (permanent_address_village_tract_id) {
      dispatch(
        getAddressVillagesForPermanentAddress({
            address_village_tract_id: permanent_address_village_tract_id,
        })
      );
    }
  }, [dispatch, permanent_address_village_tract_id]);

  useEffect(() => {
    const permanentState = addressStates.find(
      (item) => item.id === permanent_address_state_id
    );
    const permanentDistrict = addressDistrictsForPermanentAddress.find(
      (item) => item.id === permanent_address_district_id
    );
    const permanentTownship = addressTownshipsForPermanentAddress.find(
      (item) => item.id === permanent_address_township_id
    );
    const permanentCity = addressCitiesForPermanentAddress.find(
      (item) => item.id === permanent_address_city_id
    );
    const permanentWard = addressWardsForPermanentAddress.find(
      (item) => item.id === permanent_address_ward_id
    );
    const permanentVillageTract = addressVillagesForPermanentAddress.find(
      (item) => item.id === permanent_address_village_tract_id
    );
    const permanentVillage = addressVillagesForPermanentAddress.find(
      (item) => item.id === permanent_address_village_id
    );

    const permanent_full_address =
      (permanentState ? permanentState.name : "") +
      (permanentDistrict ? `/${permanentDistrict.name}` : "") +
      (permanentTownship ? `/${permanentTownship.name}` : "") +
      (permanentCity ? `/${permanentCity.name}` : "") +
      (permanentWard ? `/${permanentWard.name}` : "") +
      (permanentVillageTract ? `/${permanentVillageTract.name}` : "") +
      (permanentVillage ? `/${permanentVillage.name}` : "") +
      (permanent_address_road_street
        ? `/${permanent_address_road_street}`
        : "" || "");

    permanent_field.onChange(permanent_full_address);
  }, [
    permanent_field,
    addressStates,
    addressDistrictsForPermanentAddress,
    addressTownshipsForPermanentAddress,
    addressCitiesForPermanentAddress,
    addressWardsForPermanentAddress,
    addressVillageTractsForPermanentAddress,
    // addressVillages.address_state_id,
    addressVillagesForPermanentAddress,
    permanent_address_state_id,
    permanent_address_district_id,
    permanent_address_township_id,
    permanent_address_city_id,
    permanent_address_ward_id,
    permanent_address_village_tract_id,
    permanent_address_village_id,
    permanent_address_road_street,
  ]);

  // end ======

  // current address

  const [addressTownshipsArr, setAddressTownshipsArr] = useState([]);

  const { field } = useController({
    name: "address_full_address",
    control,
  });

  const address_district_id = useWatch({
    control,
    name: "address_district_id",
  });
  const address_state_id = useWatch({
    control,
    name: "address_state_id",
  });
  const address_township_id = useWatch({
    control,
    name: "address_township_id",
  });
  const address_city_id = useWatch({
    control,
    name: "address_city_id",
  });

  const address_village_tract_id = useWatch({
    control,
    name: "address_village_tract_id",
  });

  const address_ward_id = useWatch({
    control,
    name: "address_ward_id",
  });

  const address_village_id = useWatch({
    control,
    name: "address_village_id",
  });

  const address_road_street = useWatch({
    control,
    name: "address_road_street",
  });

  const disabled = useWatch({
    control,
    name: "disabled",
  });

  useEffect(() => {
    if (address_state_id === null) {
      dispatch(resetAddressDistricts());
      setAddressTownshipsArr([]);
      dispatch(resetAddressCities());
      dispatch(resetAddressWards());
      dispatch(resetAddressVillageTracts());
      dispatch(resetAddressVillages());
    } else if (address_district_id === null) {
      const townshipsArr = addressStates
        .filter((state) => state.id === address_state_id)
        .map((state) => state.townships)
        .flat();
      setAddressTownshipsArr(townshipsArr);

      dispatch(resetAddressCities());
      dispatch(resetAddressWards());
      dispatch(resetAddressVillageTracts());
      dispatch(resetAddressVillages());
    } else if (address_township_id === null) {
      dispatch(resetAddressCities());
      dispatch(resetAddressWards());
      dispatch(resetAddressVillageTracts());
      dispatch(resetAddressVillages());
    } else if (address_city_id === null) {
      dispatch(resetAddressWards());
      dispatch(resetAddressVillageTracts());
      dispatch(resetAddressVillages());
    } else if (address_ward_id === null) {
      dispatch(resetAddressVillageTracts());
      dispatch(resetAddressVillages());
    } else if (address_village_tract_id === null) {
      dispatch(resetAddressVillages());
    }
  }, [
    dispatch,
    address_state_id,
    address_district_id,
    address_township_id,
    address_city_id,
    address_ward_id,
    address_village_tract_id,
  ]);

  useEffect(() => {
    if (address_state_id) {
      dispatch(getAddressDistricts({ address_state_id:address_state_id }));
    }
  }, [dispatch, address_state_id]);

  useEffect(() => {
    if (
      address_state_id &&
      address_township_id &&
      address_district_id === null
    ) {
      dispatch(
        getDistrictByStateAndTownship({
          addressStateId: address_state_id,
          addressTownshipId: address_township_id,
        })
      );
    } else if (!address_township_id && address_state_id) {
      dispatch(getAddressDistricts({ address_state_id:address_state_id }));
    }
  }, [dispatch, address_township_id, address_state_id, address_district_id]);

  useEffect(() => {
    if (address_state_id && address_township_id) {
      let district_id = addressTownshipsArr.find(
        (township) => township.id === address_township_id
      )?.address_district_id;
      let temp_address_district_id = addressDistricts.find(
        (district) => district.id === district_id
      )?.id;
      setValue("address_district_id", temp_address_district_id);
    }
  }, [
    address_township_id,
    address_state_id,
    addressDistricts,
    addressTownshipsArr,
  ]);

  useEffect(() => {
    if (address_state_id) {
      const townshipsArr = addressStates
        .filter((state) => state.id === address_state_id)
        .map((state) => state.townships)
        .flat();
      setAddressTownshipsArr(townshipsArr);
    }
  }, [address_state_id, addressStates]);

  useEffect(() => {
    if (address_district_id && !address_township_id) {
      dispatch(getAddressTownships({ address_district_id }));
    }
  }, [dispatch, address_district_id, address_township_id]);

  useEffect(() => {
    setAddressTownshipsArr(addressTownships);
  }, [addressTownships]);

  useEffect(() => {
    if (address_township_id) {
      dispatch(getAddressCities({ address_township_id }));
    }
  }, [dispatch, address_township_id]);

  useEffect(() => {
    if (address_city_id) {
      dispatch(getAddressWards({ address_city_id }));
    }
  }, [dispatch, address_city_id]);

  useEffect(() => {
    if (address_township_id) {
      dispatch(getAddressVillageTracts({ address_township_id }));
    }
  }, [dispatch, address_township_id]);

  useEffect(() => {
    if (address_village_tract_id) {
      dispatch(getAddressVillages({ address_village_tract_id }));
    }
  }, [dispatch, address_village_tract_id]);

  useEffect(() => {
    const state = addressStates.find((item) => item.id === address_state_id);
    const district = addressDistricts.find(
      (item) => item.id === address_district_id
    );
    const township = addressTownships.find(
      (item) => item.id === address_township_id
    );
    const city = addressCities.find((item) => item.id === address_city_id);
    const ward = addressWards.find((item) => item.id === address_ward_id);
    const village_tract = addressVillageTracts.find(
      (item) => item.id === address_village_tract_id
    );
    const village = addressVillages.find(
      (item) => item.id === address_village_id
    );

    const address_full_address =
      (state ? state.name : "") +
      (district ? `/${district.name}` : "") +
      (township ? `/${township.name}` : "") +
      (city ? `/${city.name}` : "") +
      (ward ? `/${ward.name}` : "") +
      (village_tract ? `/${village_tract.name}` : "") +
      (village ? `/${village.name}` : "") +
      (address_road_street ? `/${address_road_street}` : "" || "");

    field.onChange(address_full_address);
  }, [
    field,
    addressStates,
    addressDistricts,
    addressTownships,
    addressCities,
    addressWards,
    addressVillageTracts,
    addressVillages,
    address_state_id,
    address_district_id,
    address_township_id,
    address_city_id,
    address_ward_id,
    address_village_tract_id,
    address_village_id,
    address_road_street,
  ]);

  // end

  return (
    <Accordion title="Applicant Address" disabled>
      <Box sx={{ mt: 1 }}>
        <Grid
          container
          spacing={2}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <ApplicationCurrentAddressV2
            disabled={disabled}
            control={control}
            setValue={setValue}
            addressStates={addressStates}
            addressStateLoading={addressStateLoading}
            addressTownships={addressTownships}
            addressTownshipLoading={addressTownshipLoading}
            addressWards={addressWards}
            addressWardsLoading={addressWardsLoading}
            addressVillages={addressVillages}
            addressVillageLoading={addressVillageLoading}
            addressCities={addressCities}
            addressCitiesLoading={addressCitiesLoading}
            addressVillageTracts={addressVillageTracts}
            addressVillageTractsLoading={addressVillageTractsLoading}
            addressDistricts={addressDistricts}
            addressDistrictsLoading={addressDistrictsLoading}
            addressTownshipsArr={addressTownshipsArr}
          />
          <ApplicationPermanentAddressV2
            disabled={disabled}
            control={control}
            setValue={setValue}
            addressStates={addressStates}
            addressStateLoading={addressStateLoading}
            addressTownships={addressTownshipsForPermanentAddress}
            addressTownshipLoading={addressTownshipsForPermanentAddressLoading}
            addressWards={addressWardsForPermanentAddress}
            addressWardsLoading={addressWardsForPermanentAddressLoading}
            addressVillages={addressVillagesForPermanentAddress}
            addressVillageLoading={addressVillagesForPermanentAddressLoading}
            addressCities={addressCitiesForPermanentAddress}
            addressCitiesLoading={addressCitiesForPermanentAddressLoading}
            addressVillageTracts={addressVillageTractsForPermanentAddress}
            addressVillageTractsLoading={
              addressVillageTractsForPermanentAddressLoading
            }
            addressDistricts={addressDistrictsForPermanentAddress}
            addressDistrictsLoading={addressDistrictsForPermanentAddressLoading}
            permanentAddressTownshipsArr={permanentAddressTownshipsArr}
            permanent_field={permanent_field}
          />
        </Grid>
      </Box>
    </Accordion>
  );
};

export default React.memo(ApplicationAddressV2);
