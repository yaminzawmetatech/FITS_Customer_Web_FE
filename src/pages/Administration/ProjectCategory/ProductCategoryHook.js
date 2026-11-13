import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { showSuccessToast, showErrorToast } from "../../../common/ToastMessage";
import CommonMessage from "../../../common/CommonMessage";
import { createProjectCategory, getProjectCategory, updateProjectCategory } from "../../../features/projectcategory/projectcategorySlice";

const useProductCategoryForm = () => {
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
          // Update product category
          await dispatch(
            updateProjectCategory({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Product Category")
          );
        } else {
          // Create new product category
          await dispatch(createProjectCategory({ ...body })).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Product Category")
          );
        }

        reset();
        setEditValues({});
        setCreateModalOpen(false);
        await dispatch(getProjectCategory()).unwrap();
      } catch (error) {
        console.error("Error", error);
        showErrorToast(
          CommonMessage.MFE00001.replace("%s", "Product Category")
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

export default useProductCategoryForm;
