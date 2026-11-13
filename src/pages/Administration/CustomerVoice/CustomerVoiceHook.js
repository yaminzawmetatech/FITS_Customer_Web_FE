import { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { showSuccessToast } from "../../../common/ToastMessage";
import CommonMessage from "../../../common/CommonMessage";
import { createCustomerVoice, getCustomerVoices, updateCustomerVoice } from "../../../features/customerVoice/customerVoiceSlice";

const useCustomerVoiceForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]);
  const { control, reset, handleSubmit, setValue  } = useForm({});

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
            updateCustomerVoice({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Customer Voice")
          );
        } else {
          await dispatch(createCustomerVoice({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Customer Voice")
          );
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getCustomerVoices());
      } catch (error) {
        console.error("Error", error);
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
      setValue 
    }),
    [
      control,
      onSubmit,
      handleSubmit,
      createModalOpen,
      setEditValues,
      editValues,
      reset,
      setValue 
    ]
  );
};

export default useCustomerVoiceForm;
