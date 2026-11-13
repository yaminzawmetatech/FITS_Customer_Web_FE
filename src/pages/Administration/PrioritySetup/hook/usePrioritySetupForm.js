import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getPriorities,
  getPriorityProperties,
  createPriority,
  updatePriority,
} from "../../../../features/prioritySetup/prioritySlice";
import { getProjectCategory } from "features/projectcategory/projectcategorySlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const usePrioritySetupForm = () => {
  const dispatch = useDispatch();
  const { control, reset, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]);

  const { priorities, isLoading, isError } = useSelector(
    (state) => state.priorities
  );
  const { projectCategories } = useSelector((state) => state.projectCategories);
  const { priorityProperties } = useSelector(
    (state) => state.priorityProperties
  );

  useEffect(() => {
    dispatch(getPriorities());
    dispatch(getPriorityProperties());
    dispatch(getProjectCategory());
  }, [dispatch]);

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
            updatePriority({ uuid: editValues?.uuid, body: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Priority Setup")
          );
        } else {
          await dispatch(createPriority({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Priority Setup")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getPriorities());
      } catch (error) {
        console.error("Error", error);
      }
    },
    [dispatch, editValues, reset]
  );
  return useMemo(
    () => ({
      control,
      onSubmit,
      handleSubmit,
      priorities,
      priorityProperties,
      projectCategories,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      editValues,
      isLoading,
      isError,
      reset,
      watch,
      setValue,
    }),
    [
      control,
      onSubmit,
      handleSubmit,
      priorities,
      priorityProperties,
      projectCategories,
      createModalOpen,
      editValues,
      isError,
      isLoading,
      reset,
      watch,
      setValue,
    ]
  );
};

export default usePrioritySetupForm;
