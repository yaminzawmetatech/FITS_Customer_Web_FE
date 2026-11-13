import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getOurServices,
  createOurService,
  updateOurService,
} from "../../../features/ourService/ourServiceSlice";
import { showSuccessToast, showErrorToast } from "../../../common/ToastMessage";
import CommonMessage from "../../../common/CommonMessage";

const useOurServiceForm = () => {
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
            updateOurService({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Our Service")
          );
        } else {
          await dispatch(createOurService({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Our Service")
          );
        }
        reset();
        setEditValues({});
        setCreateModalOpen(false);
        await dispatch(getOurServices());
      } catch (error) {
        console.error("Error", error);
        showErrorToast(
          CommonMessage.MFE00001.replace("%s", "Our Service")
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

export default useOurServiceForm;
