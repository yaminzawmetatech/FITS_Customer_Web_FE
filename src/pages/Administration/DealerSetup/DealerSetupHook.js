import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { showSuccessToast, showErrorToast } from "../../../common/ToastMessage";
import CommonMessage from "../../../common/CommonMessage";
import {
  createDealer,
  getDealers,
  getDealersWebSys,
  updateDealer,
} from "../../../features/dealerSetup/dealerSetupSlice";

const useDealerForm = () => {
  const dispatch = useDispatch();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editValues, setEditValues] = useState({});
  const { control, reset, handleSubmit, watch } = useForm({});

  const { dealersWebSys } = useSelector((state) => state.dealersWebSys);

  useEffect(() => {
    dispatch(getDealersWebSys());
  }, [dispatch]);

  useEffect(() => {
    reset({
      ...editValues,
    });
  }, [reset, editValues]);

  const dealerId = watch("web_sys_dealer_table_id");

  const onSubmit = useCallback(
    async (body, editFlag) => {
      const selectedDealer = dealersWebSys?.find((d) => d.id === dealerId);
      try {
        if (editFlag) {
          await dispatch(
            updateDealer({
              id: editValues?.uuid,
              newData: { ...body, name: selectedDealer?.name },
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "Dealer"));
        } else {
          await dispatch(
            createDealer({ ...body, name: selectedDealer?.name })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "Dealer"));
        }
        reset();
        setEditValues({});
        setCreateModalOpen(false);
        await dispatch(getDealers());
      } catch (error) {
        console.error("Error", error);
      }
    },
    [dispatch, reset, editValues, dealerId]
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
      dealersWebSys,
    }),
    [control, onSubmit, handleSubmit, createModalOpen, reset, dealersWebSys]
  );
};

export default useDealerForm;
