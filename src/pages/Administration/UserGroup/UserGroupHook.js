import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserGroup,
  getUserGroupByUuid,
  updateUserGroup,
} from "features/userGroup/userGroupSlice";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useParams } from "react-router-dom";

const useUserGroupForm = () => {
  const dispatch = useDispatch();

  const { mode, uuid } = useParams();

  const { control, reset , handleSubmit, setValue } = useForm({});

  const { userGroups, isLoading } = useSelector((state) => state.userGroups);

  useEffect(() => {
    if (mode === "edit") {
      dispatch(getUserGroupByUuid(uuid));
    }
  }, [dispatch, mode]);

  useEffect(() => {
    if (mode === "edit" && userGroups) {
      const transformedData = {
        name: userGroups.name || "",
        description: userGroups.description || "",
      };

      userGroups?.permissions?.forEach((permission) => {
        transformedData[permission.name] = true;
      });

      reset({
        ...transformedData,
      });
    }
  }, [reset, userGroups, mode]);

  const onSubmit = useCallback(
    async (body) => {
      const permissionArr = [];
      Object.entries(body).forEach(([key, value]) => {
        if (value === true) {
          permissionArr.push(key);
        }
      });
      try {
        if (mode === "edit") {
          await dispatch(
            updateUserGroup({
              id: uuid,
              newData: {
                name: body.name,
                description: body.description,
                permissions: permissionArr,
              },
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00003.replace("%s", "User Group"));
          setTimeout(() => {
            window.close();
          }, 5000);
        } else {
          await dispatch(
            createUserGroup({
              name: body.name,
              description: body.description,
              permissions: permissionArr,
            })
          ).unwrap();

          showSuccessToast(CommonMessage.MFS00001.replace("%s", "User Group"));
          setTimeout(() => {
            window.close();
          }, 5000);
        }
        reset();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch, reset, mode]
  );

  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      setValue,
      reset,
    }),
    [control, handleSubmit, isLoading, onSubmit, setValue, reset]
  );
};

export default useUserGroupForm;
