import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getFastServices,
  createFastService,
  updateFastService,
} from "../../../features/fastService/fastServiceSlice";
import { showSuccessToast, showErrorToast } from "../../../common/ToastMessage";
import CommonMessage from "../../../common/CommonMessage";

const useFastServiceForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState({});
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
            updateFastService({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Fast Service")
          );
        } else {
          await dispatch(createFastService({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Fast Service")
          );
        }
        reset();
        setEditValues({});
        setCreateModalOpen(false);
        await dispatch(getFastServices());
      } catch (error) {
        console.error("Error", error);
        showErrorToast(
          CommonMessage.MFE00001.replace("%s", "Fast Service")
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
    [control, onSubmit, handleSubmit, createModalOpen, reset]
  );
};

export default useFastServiceForm;
