import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import { createApplication } from "../../../../features/application/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import openNewWindow from "../../../../utils/windowUtils";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const ApplicationListAppBarNewButton = ({category}) => {
  const { categoryName, categoryId } = useParams();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    const res = await dispatch(
      createApplication({
        body: {
          category_id: categoryId,
          mob_status : category?.mob_status
        },
      })
    );
    if (res.type.endsWith("fulfilled")) {
      showSuccessToast(CommonMessage.MFS00007);
      openNewWindow(
        `/CreditManagement/CreateApplicationInformation/${categoryName}/${categoryId}/${res.payload.data.uuid}/${res.payload.data.id}`
      );
    }
  };

  return (
    <>
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        onOk={handleOk}
        title="Confirm New Application Information"
        content="Are you sure you want to create this Application Information?"
      />
      <Button
        variant="contained"
        onClick={handleClickOpen}
      >
        Create New
      </Button>
    </>
  );
};

export default React.memo(ApplicationListAppBarNewButton);
