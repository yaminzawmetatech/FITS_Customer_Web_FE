import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  getPosition,
  createPosition,
  updatePosition,
} from "features/position/positionSlice";

const usePositionForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit, setValue } = useForm({});

  const { positions, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.positions
  );

  useEffect(() => {
    dispatch(getPosition());
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
            updatePosition({ id: editValues?.uuid, newData: body })
          ).unwrap();
          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Position"));
        } else {
          await dispatch(createPosition({ ...body })).unwrap();
          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Position"));
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getPosition());
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
      positions,
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
      positions,
      setValue,
      createModalOpen,
      setCreateModalOpen,
      reset,
      setEditValues,
      editValues,
    ]
  );
};

export default usePositionForm;
