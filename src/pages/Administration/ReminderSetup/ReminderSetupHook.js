import { useState, useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import {
  createReminder,
  getReminders,
  updateReminder,
} from "features/reminderSetup/reminderSetupSlice";
import dayjs from "dayjs";

const useReminderSetupForm = () => {
  const dispatch = useDispatch();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState([]); // row values to edit

  const { control, reset, handleSubmit } = useForm({});

  const { reminders, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.reminders
  );

  useEffect(() => {
    dispatch(getReminders());
  }, [dispatch]);

  useEffect(() => {
    reset({
      ...editValues,
      system_reminder_date:
        editValues?.system_reminder_date && dayjs(editValues?.system_reminder_date),
    });
  }, [reset, editValues]);

  const onSubmit = useCallback(
    async (body, editFlag) => {
      try {
        if (editFlag) {
          await dispatch(
            updateReminder({
              id: editValues?.uuid,
              newData: {
                ...body,
                system_reminder_date:
                  (body?.system_reminder_date &&
                    body?.system_reminder_date.format("YYYY-MM-DD HH:mm:ss")) ||
                  null,
              },
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Reminder"));
        } else {
          await dispatch(
            createReminder({
              ...body,
              system_reminder_date:
                (body?.system_reminder_date &&
                  body?.system_reminder_date.format("YYYY-MM-DD HH:mm:ss")) ||
                null,
            })
          ).unwrap();
          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Reminder"));
        }
        reset();
        setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getReminders());
      } catch (error) {
        console.error("Error", error);
      }
    },
    [dispatch, editValues, reset]
  );
  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      reminders,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
      reset,
    }),
    [
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      reminders,
      createModalOpen,
      setCreateModalOpen,
      setEditValues,
      reset,
    ]
  );
};

export default useReminderSetupForm;
