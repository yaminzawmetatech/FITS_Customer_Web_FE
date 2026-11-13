import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByUuid, updateUser } from "features/users/usersSlice";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useForm } from "react-hook-form";
import { getDepartments } from "../../../features/department/departmentSlice";
import { getPosition } from "../../../features/position/positionSlice";
import { getNRCStates } from "features/nrc/NRCState/nrcStateSlice";
import { getNRCTownships } from "features/nrc/NRCTownship/nrcTownshipSlice";
import { getNRCRemarks } from "features/blacklistCustomer/NRCRemarkSlice";
import dayjs from "dayjs";
import image from "../../../assets/images/users/avatar-3.png";

const UserHook = () => {
  const base_url = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  // for NRC State (9/)
  const { nrcStates } = useSelector((state) => state.nrcStates);

  // for NRC Township (/AMaYa)
  const { nrcTownships } = useSelector((state) => state.nrcTownships);

  // for NRC Remark (/N,E,P)
  const { nrcRemarks } = useSelector((state) => state.nrcRemarks);
  const { departments } = useSelector((state) => state.departments);

  const { positions } = useSelector((state) => state.positions);
  useEffect(() => {
    dispatch(getUserByUuid());
    dispatch(getDepartments());
    dispatch(getPosition());
    dispatch(getNRCRemarks());
    dispatch(getNRCStates());
    dispatch(getNRCTownships());
  }, []);

  const { control, reset, handleSubmit, setValue, watch, errors } = useForm({});

  useEffect(() => {
    reset(
      {
        ...user,
        dob: user?.dob && dayjs(user?.dob),
        // profile_image_link:
        //   user?.profile_image_link !== null
        //     ? `${base_url}${user?.profile_image_link}`
        //     : image,
      },
      [reset]
    );
  }, [reset, user]);

  const onSubmit = useCallback(
    async (body, user_uuid) => {
      try {
        const responseData = await dispatch(
          updateUser({ id: user_uuid, newData: body })
        );
        if (responseData.payload.success === true) {
          showSuccessToast(CommonMessage.MFS00003.replace("%s", "User"));
        } else {
          showErrorToast(CommonMessage.MFE00009.replace("%s", "updating User"));
        }
        dispatch(getUserByUuid());
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      setValue,
      watch,
      errors,
      reset,
      user,
      nrcStates,
      nrcTownships,
      nrcRemarks,
      departments,
      positions,
    }),
    [
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      user,
      setValue,
      watch,
      errors,
      reset,
      nrcStates,
      nrcTownships,
      nrcRemarks,
      departments,
      positions,
    ]
  );
};

export default UserHook;
