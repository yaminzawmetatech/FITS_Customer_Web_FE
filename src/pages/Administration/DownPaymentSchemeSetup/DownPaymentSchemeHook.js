import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { getProjectCategory } from "../../../features/projectcategory/projectcategorySlice";
import { createDownPayments, getDownPayment, updateDownPayment } from "../../../features/downPaymentSchemeSetup/downPaymentSchemeSetupSlice";
import { showSuccessToast } from "../../../common/ToastMessage";
import CommonMessage from "../../../common/CommonMessage";

const useAccountCodeForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit, setValue } = useForm({});

  const { downPaymentSetups, isLoading } = useSelector(
    (state) => state.downPaymentSetups
  );
  const { projectCategories } = useSelector((state) => state.projectCategories);

  useEffect(() => {
    dispatch(getProjectCategory());
    dispatch(getDownPayment());
  }, [dispatch]);

  useEffect(() => {
    reset({
      ...editValues,
      stamp_duty_fee:
        editValues.stamp_duty_fee === "---"
          ? ""
          : editValues.stamp_duty_fee ===
            "stamp_duty_fee_percent_on_loan_amount"
            ? "stamp_duty_fee_percent_on_loan_amount"
            : "stamp_duty_fee_percent_on_net_amount",
      stamp_duty: editValues.stamp_duty_fee_percentage
        ? "Stamp Duty Percentage"
        : editValues.stamp_duty_fee_fixed_amount
          ? "Stamp Duty Fixed Amount"
          : "",
      processing_fee:
        editValues.processing_fee === "---"
          ? ""
          : editValues.processing_fee ===
            "processing_fee_percent_on_loan_amount"
            ? "processing_fee_percent_on_loan_amount"
            : "processing_fee_percent_on_net_amount",
      processing: editValues.processing_fee_percentage
        ? "Processing Fee Percentage"
        : editValues.processing_fee_fixed_amount
          ? "Processing Fee Fixed Amount"
          : "",
      way_to_calculate:
        editValues.way_to_calculate === "---"
          ? ""
          : editValues.way_to_calculate === "add_on_loan_amount"
            ? "add_on_loan_amount"
            : editValues.way_to_calculate === "deduct_from_loan_amount"
              ? "deduct_from_loan_amount"
              : "paid_advanced_by_customer",
    });
  }, [reset, editValues]);

  const onSubmit = useCallback(
    async (newData, editFlag) => {
      try {
        // Ensure both fields are not null (default to 0 or another safe value)
        const payload = {
          ...newData,
          interest_before_first_installment_prorata_interest:
            newData.interest_before_first_installment_prorata_interest ?? 0,
          insurance: newData.insurance ?? 0,
        };

        if (editFlag) {
          await dispatch(
            updateDownPayment({ id: editValues?.uuid, newData: payload })
          ).unwrap();
          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Down Payment Scheme")
          );
        } else {
          await dispatch(createDownPayments(payload)).unwrap();
          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Down Payment Scheme")
          );
        }

        reset();
        setCreateModalOpen(false);
        await dispatch(getDownPayment());
      } catch (error) {
        console.error("Error", error);
      }
    },
    [dispatch, reset, editValues]
  );


  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      downPaymentSetups,
      projectCategories,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      reset,
      setValue,
      editValues,
    }),
    [
      control,
      handleSubmit,
      isLoading,
      onSubmit,
      downPaymentSetups,
      projectCategories,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setEditValues,
      setValue,
      editValues,
    ]
  );
};

export default useAccountCodeForm;
