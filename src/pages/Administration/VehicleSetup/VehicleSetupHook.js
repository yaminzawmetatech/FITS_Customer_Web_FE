import { useCallback, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { getWebVehicle, getWebVehicleBrand, createVehicle, updateVehicle, getVehicles } from "../../../features/vehicleSetup/vehicleSetupSlice";
import { showSuccessToast, showErrorToast } from "../../../common/ToastMessage";
import CommonMessage from "../../../common/CommonMessage";

const useVehicleSetupForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState({});
  const { control, reset, handleSubmit, watch } = useForm({});

  const { webVehicles, webVehicleBrands } = useSelector(
    (state) => state.vehicles
  );

  const selectedBrand = useWatch({
    control,
    name: "brand_id",
  });
  const selectedModel = useWatch({
    control,
    name: "model_id",
  });

  const selectedVehicleId = useMemo(() => {
    const vehicle = webVehicles?.find(
      (v) => v.brand_id === selectedBrand && v.model_id === selectedModel
    );
    return vehicle ? vehicle : null;
  }, [selectedBrand, selectedModel, webVehicles]);

  // // Deduplicate vehicles array by brand_id
  const uniqueBrandVehicles = useMemo(() => {
    const vehicleMap = new Map();
    webVehicles?.forEach((vehicle) => {
      if (vehicle?.brand_id) {
        vehicleMap.set(vehicle.brand_id, vehicle);
      }
    });
    return Array.from(vehicleMap.values());
  }, [webVehicles]);

  // // Deduplicate vehicles array by model_id
  const uniqueModelVehicles = useMemo(() => {
    const vehicleMap = new Map();
    webVehicles?.forEach((vehicle) => {
      if (vehicle?.model_id) {
        vehicleMap.set(vehicle.model_id, vehicle);
      }
    });
    return Array.from(vehicleMap.values());
  }, [webVehicles]);


  useEffect(() => {
    reset({
      ...editValues,
      brand_id: editValues?.web_sys_brand_id || "",
      model_id: editValues?.web_sys_model_id || "",

    });
  }, [reset, editValues]);

  // ✅ load dropdown data
  useEffect(() => {
    dispatch(getWebVehicle());
    if (selectedBrand) {
      dispatch(getWebVehicleBrand({ brand_id: selectedBrand }));
    }
  }, [dispatch, selectedBrand]);

  // ✅ Submit handler
  const onSubmit = useCallback(
    async (formData, editFlag) => {
      try {

        // ✅ Construct API body
        if (selectedVehicleId === null) {
          showErrorToast("Please select a valid vehicle brand and model.");
          return;
        }

        const body = {
          category_id: formData.category_id,
          web_sys_vehicle_table_id: selectedVehicleId.id,
          web_sys_brand_id: formData.brand_id,
          web_sys_model_id: formData.model_id,
          brand_name: selectedVehicleId.brand_name,
          model_name: selectedVehicleId.model_name,

        };

        if (editFlag) {
          await dispatch(
            updateVehicle({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Vehicle Setup")
          );
        } else {
          await dispatch(createVehicle(body)).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Vehicle Setup")
          );
        }

        reset();
        setEditValues({});
        setCreateModalOpen(false);
        await dispatch(getVehicles());
      } catch (error) {
        console.error("Error", error);
        showErrorToast(CommonMessage.MFE00001.replace("%s", "Vehicle Setup"));
      }
    },
    [dispatch, reset, editValues, webVehicles, webVehicleBrands, selectedVehicleId]
  );

  return useMemo(
    () => ({
      control,
      onSubmit,
      handleSubmit,
      createModalOpen,
      setCreateModalOpen,
      setEditValues,
      reset,
      webVehicles,
      webVehicleBrands,
      uniqueBrandVehicles,
      uniqueModelVehicles,
      webVehicleBrands
    }),
    [
      control,
      onSubmit,
      handleSubmit,
      createModalOpen,
      reset,
      uniqueBrandVehicles,
      uniqueModelVehicles,
      webVehicleBrands
    ]
  );
};

export default useVehicleSetupForm;
