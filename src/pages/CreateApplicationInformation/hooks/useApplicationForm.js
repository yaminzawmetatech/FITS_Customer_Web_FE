import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getNRCStates } from "../../../features/customerUser/nrcState/nrcStateSlice";
import { getRegions } from "../../../features/customerUser/regionSetup/regionSetupSlice";
import { getVehicles, getVehiclesModal } from "../../../features/customerUser/vehicleSetup/vehicleSetupSlice";
import { getDealers } from "../../../features/customerUser/dealerSetup/dealerSetupSlice";
import { getCustomerBanks } from "../../../features/customerUser/customerBank/customerBankSlice";
import { current } from "@reduxjs/toolkit";
import { createApplication } from "../../../features/customerUser/application/applicationSlice";
import { showSuccessToast } from "../../../common/ToastMessage";
import { set } from "lodash";

const useApplicationForm = () => {
  const dispatch = useDispatch();

  const { control, reset, watch, handleSubmit, setValue, getValues, register } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { nrcStates, isLoading: nrcStateLoading } = useSelector((state) => state.nrcUserStates);

  const { regions, isLoading: regionLoading } = useSelector((state) => state.regionUserSetup);

  const { vehicles, vehicleModal } = useSelector(
    (state) => state.userVehicles
  );

  const { dealers } = useSelector(
    (state) => state.userDealers
  );

  const { customerBanks } = useSelector(
    (state) => state.userCustomerBanks
  );

  const selectedBrand = useWatch({
    control,
    name: "brand_id",
  });
  const selectedModel = useWatch({
    control,
    name: "model_id",
  });
  const selectedProductId = useWatch({
    control,
    name: 'selectedProduct',
  });

  const selectedVehicleId = useMemo(() => {
    const vehicle = vehicles.find(
      (v) => v.web_sys_brand_id === selectedBrand && v.web_sys_model_id === selectedModel
    );
    return vehicle ? vehicle : null;
  }, [selectedBrand, selectedModel, vehicles]);

  // // Deduplicate vehicles array by brand_id
  const uniqueBrandVehicles = useMemo(() => {
    const vehicleMap = new Map();
    vehicles.forEach((vehicle) => {
      if (vehicle?.web_sys_brand_id) {
        vehicleMap.set(vehicle.web_sys_brand_id, vehicle);
      }
    });
    return Array.from(vehicleMap.values());
  }, [vehicles]);


  // // Deduplicate vehicles array by model_id
  const uniqueModelVehicles = useMemo(() => {
    const vehicleMap = new Map();
    vehicles.forEach((vehicle) => {
      if (vehicle?.web_sys_model_id) {
        vehicleMap.set(vehicle.web_sys_model_id, vehicle);
      }
    });
    return Array.from(vehicleMap.values());
  }, [vehicles]);

  useEffect(() => {
    dispatch(getNRCStates());

    if (selectedProductId) {
      dispatch(getRegions({ category_id: selectedProductId }));
      dispatch(getDealers({ category_id: selectedProductId }));
      dispatch(getVehicles({
        category_id: selectedProductId
      }));
      if (selectedBrand) {
        dispatch(getVehiclesModal({
          category_id: selectedProductId,
          web_sys_brand_id: selectedBrand
        }));
      }
    }
    dispatch(getCustomerBanks());
  }, [dispatch, selectedBrand, selectedProductId]);

  const onSubmit = useCallback(
    async (data) => {
      setLoading(true);
      const attachments = uploadedFiles.map((file) => ({
        base64: file.base64,
        document_type: file.name, // can customize based on your backend requirement
      }));

      try {
        const requestData = {
          category_id: selectedProductId || null,
          applicant_name: data?.applicant_name || "",
          nrc_state_id: data?.nrc_state_id || null,
          nrc_township_id: data?.nrc_township_id || null,
          nrc_number: data?.nrc_number || "",
          nrc_remark: data?.nrc_remark || "",
          nrc: data?.nrc || "",
          date_of_birth: data?.date_of_birth
            ? dayjs(data?.date_of_birth).format("YYYY-MM-DD")
            : null,
          gender: data?.gender || "",
          father_name: data?.father_name || "",
          living_phone_number: data?.living_phone_number || "",
          secondary_phone_number: data?.secondary_phone_number || "",
          viber_number: data?.viber_number || "",
          region_id: data?.region_id || null,
          current_address: data?.current_address || "",
          title_position: data?.title_position || "",
          department: data?.department || "",
          name_of_emp_or_business: data?.name_of_emp_or_business || "",
          employment_address: data?.employment_address || "",
          monthly_income: data?.monthly_income || null,
          total_amount: data?.total_amount || null,
          vehicle_down_payment_ratio: data?.vehicle_down_payment_ratio || null,
          vehicle_down_payment_amount: data?.vehicle_down_payment_amount || null,
          commencement_date: data?.commencement_date
            ? dayjs(data?.commencement_date).format("YYYY-MM-DD")
            : null,
          loan_term_duration: data?.loan_term_duration || null,
          dealer_id: data?.dealer_id || null,
          school_name: data?.school_name || "",
          yearly_school_fees: data?.yearly_school_fees || null,
          processing_fees: data?.processing_fees || null,
          processing_percentage: data?.processing_percentage || null,
          stamp_duty_percentage: data?.stamp_duty_percentage || null,
          stamp_duty_fees: data?.stamp_duty_fees || null,
          monthly_installment: data?.monthly_installment || null,
          customer_bank_id: data?.customer_bank_id || null,
          account_name: data?.account_name || "",
          account_no: data?.account_no || "",
          purpose_of_loan: data?.purpose_of_loan || "",
          vehicle_id: selectedVehicleId ? selectedVehicleId.id : null,
          vehicle_color: data?.vehicle_color || "",
          loan_amount: data?.loan_amount || null,
          employment_period_years: data?.employment_period_years || null,
          pro_rata_interest: data?.pro_rata_interest || null,
          interest_rate: data?.interest_rate || null,
          down_payment_amount: data?.down_payment_amount || null,
          net_disbursement_amount: data?.net_disbursement_amount || null,
          attachments: attachments || [],
        };

        // 🧩 Optional sections (only add if fields exist)
        const guarantor = {
          full_name: data?.guarantor_full_name || "",
          nrc_state_id: data?.guarantor_nrc_state_id,
          nrc_township_id: data?.guarantor_nrc_township_id,
          nrc_remark: data?.guarantor_nrc_remark || "",
          nrc_number: data?.guarantor_nrc_number || "",
          nrc: data?.guarantor_nrc || "",
          relation_with_customer: data?.guarantor_relation_with_customer || "",
          primary_phone_no: data?.guarantor_primary_phone_no,
          secondary_phone_no: data?.guarantor_secondary_phone_no,
          father_name: data?.guarantor_father_name || "",
          dob: data?.guarantor_dob
            ? dayjs(data?.guarantor_dob).format("YYYY-MM-DD")
            : null,
          type: "guarantor"
        };
        const reference = {
          full_name: data?.reference_full_name || "",
          nrc_state_id: data?.reference_nrc_state_id,
          nrc_township_id: data?.reference_nrc_township_id,
          nrc_remark: data?.reference_nrc_remark || "",
          nrc_number: data?.reference_nrc_number || "",
          nrc: data?.reference_nrc || "",
          father_name: data?.reference_father_name || "",
          primary_phone_no: data?.reference_primary_phone_no,
          secondary_phone_no: data?.reference_secondary_phone_no,
          relation_with_customer: data?.reference_relation_with_customer || "",
          dob: data?.reference_dob
            ? dayjs(data?.reference_dob).format("YYYY-MM-DD")
            : null,
          type: "reference"
        };
        const joint_applicant = {
          full_name: data?.joint_full_name || "",
          nrc_state_id: data?.joint_nrc_state_id,
          nrc_township_id: data?.joint_nrc_township_id,
          nrc_remark: data?.joint_nrc_remark || "",
          nrc_number: data?.joint_nrc_number || "",
          nrc: data?.joint_nrc || "",
          father_name: data?.joint_father_name || "",
          primary_phone_no: data?.joint_primary_phone_no,
          secondary_phone_no: data?.joint_secondary_phone_no,
          relation_with_customer: data?.joint_relation_with_customer || "",
          dob: data?.joint_dob
            ? dayjs(data?.joint_dob).format("YYYY-MM-DD")
            : null,
          type: "joint applicant"
        };

        // ✅ Only attach non-empty sections
        if (guarantor.full_name || guarantor.primary_phone_no) {
          requestData.guarantor = guarantor;
        }
        if (reference.full_name || reference.primary_phone_no) {
          requestData.reference = reference;
        }
        if (joint_applicant.full_name || joint_applicant.primary_phone_no) {
          requestData.joint_applicant = joint_applicant;
        }

        // 🔥 Submit
        await dispatch(createApplication(requestData)).unwrap();
        showSuccessToast("Application created successfully");
        reset();
        setUploadedFiles([]);
        setLoading(false)
      } catch (error) {
        console.error("Error submitting form:", error);
        setLoading(false)
      } finally{
        setLoading(false)
      }
    },
    [selectedVehicleId, dispatch, selectedProductId, reset, uploadedFiles]
  );





  return useMemo(
    () => ({
      watch,
      control,
      reset,
      handleSubmit,
      setValue,
      getValues,
      register,
      nrcStates,
      nrcStateLoading,
      regions,
      regionLoading,
      uniqueBrandVehicles,
      uniqueModelVehicles,
      vehicleModal,
      selectedVehicleId,
      selectedProductId,
      dealers,
      customerBanks,
      onSubmit,
      setUploadedFiles,
      uploadedFiles,
      loading
    }),
    [
      watch,
      control,
      reset,
      handleSubmit,
      setValue,
      getValues,
      register,
      nrcStates,
      nrcStateLoading,
      regions,
      regionLoading,
      uniqueBrandVehicles,
      uniqueModelVehicles,
      vehicleModal,
      selectedVehicleId,
      selectedProductId,
      dealers,
      customerBanks,
      onSubmit,
      setUploadedFiles,
      uploadedFiles,
      loading
    ]
  );
};

export default useApplicationForm;
