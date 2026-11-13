import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { set } from "lodash";
import { useParams } from "react-router";
import { getNRCStates } from "../../../../../features/nrcState/nrcStateSlice";
import { getRegions } from "../../../../../features/regionSetup/regionSetupSlice";
import { getDealers } from "../../../../../features/dealerSetup/dealerSetupSlice";
import { getVehicles } from "../../../../../features/vehicleSetup/vehicleSetupSlice";
import { getVehiclesModal } from "../../../../../features/vehicleSetup/vehicleSetupSlice";
import { getCustomerBanks } from "../../../../../features/customerBank/customerBankSlice";
import { showSuccessToast } from "../../../../../common/ToastMessage";
import { getApplicationByUUID, updateApplication } from "../../../../../features/application/applicationSlice";
import { getUsers } from "../../../../../features/users/usersSlice";


const useApplicationForm = () => {
  const dispatch = useDispatch();
  const { categoryName, selectedProductId, uuid, id, mode } = useParams();
  const [openMediatorModal, setOpenMediatorModal] = useState(false);
  const [selectedMediator, setSelectedMediator] = useState("");

  const { control, reset, watch, handleSubmit, setValue, getValues, register } = useForm({
    defaultValues: {
      disabled: false,
    },
  });
  const { user } = useSelector((state) => state.auth);

  const { applications } = useSelector((state) => state.applications);

  const { users, isLoading: mediatorLoading } = useSelector((state) => state.users);


  useEffect(() => {
    dispatch(getApplicationByUUID(uuid));
  }, [dispatch, selectedProductId, uuid, id, mode]);

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && applications) {
      reset({
        ...applications,
        date_of_birth: applications?.date_of_birth ? dayjs(applications?.date_of_birth) : null,
        commencement_date: applications?.commencement_date ? dayjs(applications?.commencement_date) : null,
        guarantor_dob: applications?.guarantor?.dob ? dayjs(applications?.guarantor?.dob) : null,
        reference_dob: applications?.reference?.dob ? dayjs(applications?.reference?.dob) : null,
        joint_dob: applications?.joint_applicant?.dob ? dayjs(applications?.joint_applicant?.dob) : null,
        guarantor_full_name: applications?.guarantor?.full_name || "",
        guarantor_nrc_state_id: applications?.guarantor?.nrc_state_id || null,
        guarantor_nrc_township_id: applications?.guarantor?.nrc_township_id || null,
        guarantor_nrc_remark: applications?.guarantor?.nrc_remark || "",
        guarantor_nrc_number: applications?.guarantor?.nrc_number || "",
        guarantor_nrc: applications?.guarantor?.nrc || "",
        guarantor_relation_with_customer: applications?.guarantor?.relation_with_customer || "",
        guarantor_primary_phone_no: applications?.guarantor?.primary_phone_no || "",
        guarantor_secondary_phone_no: applications?.guarantor?.secondary_phone_no || "",
        guarantor_father_name: applications?.guarantor?.father_name || "",
        reference_full_name: applications?.reference?.full_name || "",
        reference_nrc_state_id: applications?.reference?.nrc_state_id || null,
        reference_nrc_township_id: applications?.reference?.nrc_township_id || null,
        reference_nrc_remark: applications?.reference?.nrc_remark || "",
        reference_nrc_number: applications?.reference?.nrc_number || "",
        reference_nrc: applications?.reference?.nrc || "",
        reference_father_name: applications?.reference?.father_name || "",
        reference_primary_phone_no: applications?.reference?.primary_phone_no || "",
        reference_secondary_phone_no: applications?.reference?.secondary_phone_no || "",
        reference_relation_with_customer: applications?.reference?.relation_with_customer || "",
        joint_full_name: applications?.joint_applicant?.full_name || "",
        joint_nrc_state_id: applications?.joint_applicant?.nrc_state_id || null,
        joint_nrc_township_id: applications?.joint_applicant?.nrc_township_id || null,
        joint_nrc_remark: applications?.joint_applicant?.nrc_remark || "",
        joint_nrc_number: applications?.joint_applicant?.nrc_number || "",
        joint_nrc: applications?.joint_applicant?.nrc || "",
        joint_father_name: applications?.joint_applicant?.father_name || "",
        joint_primary_phone_no: applications?.joint_applicant?.primary_phone_no || "",
        joint_secondary_phone_no: applications?.joint_applicant?.secondary_phone_no || "",
        joint_relation_with_customer: applications?.joint_applicant?.relation_with_customer || "",
        disabled: true,
        brand_id: applications?.vehicle?.web_sys_brand_id || "",
        model_id: applications?.vehicle?.web_sys_model_id || "",
        processing_fees: applications?.processing_fees || "",
        stamp_duty_fees: applications?.stamp_duty_fees || "",
      });
      // Populate previously uploaded attachments
      if (applications.application_attachments && Array.isArray(applications.application_attachments)) {
        setUploadedFiles(
          applications.application_attachments.map((a, index) => ({
            id: a.id || index + 1,
            name: a.document_type || `Document ${index + 1}`,
            fileName: a.file_name || a.document_type,
            base64: a.base64 || "",
            server_url: a.server_url || "",
          }))
        );
      }
    }
  }
    , [mode, applications, id, reset]);



  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { nrcStates, isLoading: nrcStateLoading } = useSelector((state) => state.nrcUserStates);

  const { regions, isLoading: regionLoading } = useSelector((state) => state.regionUserSetup);

  const { vehicles, vehicleModal } = useSelector(
    (state) => state.vehicles
  );

  const { dealers } = useSelector(
    (state) => state.dealers
  );

  const { customerBanks } = useSelector(
    (state) => state.customerBanks
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

    dispatch(getUsers({ role_name: "Mediator" }));

    dispatch(getCustomerBanks());
  }, [dispatch, selectedBrand, selectedProductId]);

  const onSubmit = useCallback(
    async (data) => {

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
          net_disbursed_amount: data?.net_disbursed_amount || null,
          guarantor: {
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
          } || null,
          reference: {
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
          } || null,
          joint_applicant: {
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
          } || null,
          attachments: attachments || [],
        };

        try {
          if (mode === "edit" && uuid) {
            await dispatch(updateApplication({ uuid, applicationData: requestData })).unwrap();
            showSuccessToast("Application updated successfully");
            reset();
            setUploadedFiles([]);
            await dispatch(getApplicationByUUID(uuid)).unwrap();
          }
        } catch (error) {
          console.error("Form submission failed:", error);
        }
        reset();
      } catch (error) {
        console.error("Error submitting form:", error);
        // showErrorToast("Failed to create application. Please try again.");
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
      setOpenMediatorModal,
      openMediatorModal,
      users,
      mediatorLoading,
      selectedMediator,
      setSelectedMediator,
      uuid,
      applications
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
      setOpenMediatorModal,
      openMediatorModal,
      users,
      mediatorLoading,
      selectedMediator,
      setSelectedMediator,
      uuid,
      applications
    ]
  );
};

export default useApplicationForm;
