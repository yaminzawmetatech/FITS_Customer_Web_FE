import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ConfirmationDialog = ({
  title,
  content,
  open,
  onOk = (e) => {},
  onClose = (e) => {},
  ...other
}) => {
  const handleCancel = (e) => {
    onClose(e);
  };

  const handleOk = (e) => {
    onClose(e);
    onOk(e);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      <DialogTitle variant="h5" sx={{ color: "#1890ff" }}>
        {title}
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ConfirmationDialog);
