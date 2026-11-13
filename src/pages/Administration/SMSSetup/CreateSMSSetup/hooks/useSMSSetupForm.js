import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CommonMessage from "common/CommonMessage";
import {
  createSMS,
  getSMSByUuid,
  getValues,
  updateSMS,
} from "features/smsSetup/smsSetupSlice";
import { showSuccessToast } from "common/ToastMessage";

const useSMSFormatSetupForm = () => {
  const { mode, uuid } = useParams();

  const dispatch = useDispatch();

  const { control, reset, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      disabled: false,
    },
  });

  const {
    sms,
    isError,
    isLoading: isSubmitting,
  } = useSelector((state) => state.sms);

  const [tableData, setTableData] = useState([]);

  const {
    values,
    isError: valuesError,
    isLoading: valuesLoading,
  } = useSelector((state) => state.values);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (mode === "edit" || mode === "view") {
          await dispatch(getSMSByUuid({ uuid: uuid }));
        }
        await dispatch(getValues());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [mode, uuid, dispatch]);

  const editAbleForm = useMemo(() => {
    if (mode && mode === "view") {
      return false;
    } else {
      return true;
    }
  }, [mode]);

  useEffect(() => {
    reset({
      ...sms,
      disabled: !editAbleForm,
    });
  }, [sms, reset, editAbleForm, mode]);

  const onSubmit = useCallback(
    () => async (body) => {
      const updatedTableData = tableData?.map((data) => {
        values.forEach((item) => {
          if (data.value1 === item.value) data.value1 = item.key;
          if (data.value2 === item.value) data.value2 = item.key;
          if (data.value3 === item.value) data.value3 = item.key;
          if (data.value4 === item.value) data.value4 = item.key;
          if (data.value5 === item.value) data.value5 = item.key;
          if (data.value6 === item.value) data.value6 = item.key;
          if (data.value7 === item.value) data.value7 = item.key;
          if (data.value8 === item.value) data.value8 = item.key;
          if (data.value9 === item.value) data.value9 = item.key;
          if (data.value10 === item.value) data.value10 = item.key;
        });
        return data;
      });
      
      try {
        if (mode === "view") {
          window.close();
        } else if (mode === "edit") {
          await dispatch(
            updateSMS({
              body: { ...body, sms_format_detail: updatedTableData },
              uuid: sms?.uuid,
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00008);
          // setTimeout(() => {
          //   window.close();
          // }, 5000);
        } else {

          await dispatch(
            createSMS({
              ...body,
              sms_format_detail: updatedTableData,
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00007);
          // setTimeout(() => {
          //   window.close();
          // }, 5000);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, sms, tableData]
  );

  return useMemo(
    () => ({
      watch,
      isSubmitting,
      onSubmit,
      handleSubmit,
      control,
      editAbleForm,
      sms,
      tableData,
      setTableData,
      setValue,
      values,
      valuesLoading,
    }),
    [
      watch,
      control,
      handleSubmit,
      isSubmitting,
      onSubmit,
      editAbleForm,
      sms,
      tableData,
      setTableData,
      setValue,
      values,
      valuesLoading,
    ]
  );
};

export default useSMSFormatSetupForm;
