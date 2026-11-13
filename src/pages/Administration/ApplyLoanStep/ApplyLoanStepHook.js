import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getApplyLoanSteps,
  createApplyLoanStep,
  updateApplyLoanStep,
} from "../../../features/applyLoanStep/applyLoanStepSlice";
import { showSuccessToast, showErrorToast } from "../../../common/ToastMessage";
import CommonMessage from "../../../common/CommonMessage";

const useApplyLoanStepForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]);
  const { control, reset, handleSubmit } = useForm({});

  useEffect(() => {
    reset({
      ...editValues,
    });
  }, [reset, editValues]);

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateApplyLoanStep({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Apply Loan Step")
          );
        } else {
          await dispatch(createApplyLoanStep({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Apply Loan Step")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getApplyLoanSteps());
      } catch (error) {
        console.error("Error", error);
        showErrorToast(
          CommonMessage.MFE00001.replace("%s", "Apply Loan Step")
        );
      }
    },
    [dispatch, reset, editValues]
  );

  return useMemo(
    () => ({
      control,
      onSubmit,
      handleSubmit,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      reset,
    }),
    [
      control,
      onSubmit,
      handleSubmit,
      createModalOpen,
      setEditValues,
      editValues,
      reset,
    ]
  );
};

export default useApplyLoanStepForm;
