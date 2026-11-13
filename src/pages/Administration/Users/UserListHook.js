import { useEffect, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUser, createUser } from "features/users/usersSlice";
import { showErrorToast, showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";
import { useForm } from "react-hook-form";
import { getDepartments } from "../../../features/department/departmentSlice";
import { getPosition } from "../../../features/position/positionSlice";
import { getNRCStates } from "features/nrc/NRCState/nrcStateSlice";
import { getNRCTownships } from "features/nrc/NRCTownship/nrcTownshipSlice";
import { getNRCRemarks } from "features/blacklistCustomer/NRCRemarkSlice";
import { getUserGroups } from "features/userGroup/userGroupSlice";
import dayjs from "dayjs";
import { getAddressStates } from "features/address/State/addressStateSlice";

const useUserList = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.users);
  const { userGroups } = useSelector((state) => state.userGroups);
  // for NRC State (9/)
  const { nrcStates } = useSelector((state) => state.nrcStates);

  // for NRC Township (/AMaYa)
  const { nrcTownships } = useSelector((state) => state.nrcTownships);

  // for NRC Remark (/N,E,P)
  const { nrcRemarks } = useSelector((state) => state.nrcRemarks);
  const { departments } = useSelector((state) => state.departments);

  const { positions } = useSelector((state) => state.positions);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserGroups());
    dispatch(getDepartments());
    dispatch(getPosition());
    dispatch(getNRCRemarks());
    dispatch(getNRCStates());
    dispatch(getNRCTownships());
    dispatch(getAddressStates());
  }, []);

  const { control, reset, handleSubmit, watch } = useForm({});

  const [editValues, setEditValues] = useState([]); // row values to edit
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    reset(
      {
        ...editValues,
        dob: editValues?.dob && dayjs(editValues?.dob),
      },
      [reset]
    );
  }, [reset, editValues]);

  const onSubmit = useCallback(
    async (body, editFlag ) => {
      try {
        if (editFlag) {
          const responseData = await dispatch(
            updateUser({ id: editValues?.uuid, newData: body })
          );
          if (responseData.payload.success === true) {
            showSuccessToast(
              CommonMessage.MFS00003.replace("%s", "User")
            );
          } else {
            showErrorToast(
              CommonMessage.MFE00009.replace("%s", "updating User")
            );
          }
        } else {
          // const responseData = await dispatch(createUser({ ...body, region: regionIds }));
          const responseData = await dispatch(createUser({ ...body }));
          if (responseData.payload.success === true) {
            showSuccessToast(
              CommonMessage.MFS00001.replace("%s", "User")
            );
          } else {
            showErrorToast(
              CommonMessage.MFE00009.replace("%s", "creating New User")
            );
          }
        }
          reset();
  setEditValues("");
        setCreateModalOpen(false);
        await dispatch(getUsers());
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
      watch,
      reset,
      users,
      userGroups,
      nrcStates,
      nrcTownships,
      nrcRemarks,
      departments,
      positions,
      createModalOpen,
      setCreateModalOpen: (value) => setCreateModalOpen(value),
      setEditValues: (value) => setEditValues(value),
    }),
    [
      isLoading,
      onSubmit,
      handleSubmit,
      control,
      users,
      watch,
      reset,
      userGroups,
      nrcStates,
      nrcTownships,
      nrcRemarks,
      departments,
      positions,
      createModalOpen,
      setCreateModalOpen,
      setEditValues,
    ]
  );
};

export default useUserList;
