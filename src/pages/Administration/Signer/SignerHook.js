import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getSigners, updateSigner } from "features/signer/signerSlice";
import { createSigner } from "features/signer/signerSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { SIGNERTYPES } from "constants/signerTypes";

const useSignerForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, watch, handleSubmit, setValue } = useForm({});

  const { signers, isLoading } = useSelector((state) => state.signers);

  useEffect(() => {
    dispatch(getSigners());
  }, [dispatch]);

  useEffect(() => {
    const foundSigner = SIGNERTYPES.find(
      (signer) => signer.value === editValues?.signer_type
    );

    reset({
      ...editValues,
      signer_type: foundSigner?.key,
    });
  }, [reset, editValues]);

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateSigner({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Signer"));
        } else {
          await dispatch(createSigner({ ...body })).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Signer"));
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getSigners());
      } catch (error) {
        console.error("Error:", error);
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
      signers,
      setValue,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      reset,
    }),
    [
      control,
      handleSubmit,
      isLoading,
      onSubmit,
      signers,
      setValue,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setEditValues,
      editValues,
    ]
  );
};

export default useSignerForm;
