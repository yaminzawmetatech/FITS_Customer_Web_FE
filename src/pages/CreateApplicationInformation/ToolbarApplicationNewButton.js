import * as React from "react";
import { useParams } from "react-router";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import { createApplication } from "../../../../features/application/applicationSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import openNewWindow from "../../../../utils/windowUtils";
import { showSuccessToast } from "common/ToastMessage";
import CommonMessage from "common/CommonMessage";

const ToolbarApplicationNewButton = ({ open, handleClose }) => {
  const { categoryId, categoryName } = useParams();
  const dispatch = useDispatch();

  const handleOk = async () => {
    const res = await dispatch(
      createApplication({
        body: {
          category_id: categoryId,
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
    <ConfirmationDialog
      open={open}
      onClose={handleClose}
      onOk={handleOk}
      title="Confirm New Application Information"
      content="Are you sure you want to create this Application Information?"
    />
  );
};

export default React.memo(ToolbarApplicationNewButton);
