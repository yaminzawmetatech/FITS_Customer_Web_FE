import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getFAQQuestions,
  createFAQQuestion,
  updateFAQQuestion,
} from "../../../features/faqQuestion/faqQuestionSlice";
import { showSuccessToast, showErrorToast } from "../../../common/ToastMessage";
import CommonMessage from "../../../common/CommonMessage";

const useFAQQuestionForm = () => {
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
            updateFAQQuestion({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "FAQ Question")
          );
        } else {
          await dispatch(createFAQQuestion({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "FAQ Question")
          );
        }
        reset();
        setEditValues({});
        setCreateModalOpen(false);
        await dispatch(getFAQQuestions());
      } catch (error) {
        console.error("Error", error);
        showErrorToast(
          CommonMessage.MFE00001.replace("%s", "FAQ Question")
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

export default useFAQQuestionForm;
