import { useCallback, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getDocumentAccessSetups,
  createDocumentAccessSetup,
  updateDocumentAccessSetup,
  getDocumentTypes,
} from "../../../features/documentAccessSetup/documentAccessSetupSlice";
import { showSuccessToast, showErrorToast } from "../../../common/ToastMessage";
import CommonMessage from "../../../common/CommonMessage";
import { use } from "react";

const useDocumentAccessForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState({});
  const { control, reset, handleSubmit } = useForm({});

  const { documentTypes } = useSelector((state) => state.documentAccessSetups);

  useEffect(() => {
    reset({
      ...editValues,
    });
  }, [reset, editValues]);

  useEffect(() => {
    dispatch(getDocumentTypes());
  }, [dispatch]);

  // ✅ Submit handler
  const onSubmit = useCallback(
    async (formData, editFlag) => {
      try {
        // ✅ Find selected document type from documentTypes array
        const selectedDocType = documentTypes?.find(
          (doc) => doc.id === formData.web_sys_table_id
        );

        // ✅ Construct API body directly here (no need for form state)
        const body = {
          category_id: formData.category_id,
          web_sys_table_id: formData.web_sys_table_id,
          web_sys_code: selectedDocType?.code || "",
          web_sys_name_en: selectedDocType?.name || "",
          name_mm: formData.name_mm,
        };

        if (editFlag) {
          await dispatch(
            updateDocumentAccessSetup({ id: editValues?.uuid, newData: body })
          ).unwrap();

          showSuccessToast(
            CommonMessage.MFS00003.replace("%s", "Document Access Setup")
          );
        } else {
          await dispatch(createDocumentAccessSetup(body)).unwrap();

          showSuccessToast(
            CommonMessage.MFS00001.replace("%s", "Document Access Setup")
          );
        }

        reset();
        setEditValues({});
        setCreateModalOpen(false);
        await dispatch(getDocumentAccessSetups());
      } catch (error) {
        console.error("Error", error);
        showErrorToast(
          CommonMessage.MFE00001.replace("%s", "Document Access Setup")
        );
      }
    },
    [dispatch, reset, editValues, documentTypes]
  );

  return useMemo(
    () => ({
      control,
      onSubmit,
      handleSubmit,
      createModalOpen,
      setCreateModalOpen,
      setEditValues,
      reset,
      documentTypes,
    }),
    [control, onSubmit, handleSubmit, createModalOpen, reset, documentTypes]
  );
};

export default useDocumentAccessForm;
