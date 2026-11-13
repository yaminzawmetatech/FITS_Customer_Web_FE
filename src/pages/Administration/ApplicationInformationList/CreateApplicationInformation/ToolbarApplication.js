import React, { useCallback, useEffect, useState } from "react";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SyncOutlinedIcon from "@mui/icons-material/SyncOutlined";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "../../../../components/Toolbar";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../../common/ToastMessage";
import {
  cancelApplication,
  getApplicationByUUID,
  syncApplication,
} from "../../../../features/application/applicationSlice";

const ToolbarApplication = () => {
  const dispatch = useDispatch();
  const { id, selectedProductId, categoryName, uuid, mode } = useParams();

  const { applications } = useSelector((state) => state.applications);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [loadingSync, setLoadingSync] = useState(false);

  // --- Fetch Application ---
  useEffect(() => {
    if (uuid) {
      dispatch(getApplicationByUUID(uuid));
    }
  }, [dispatch, selectedProductId, uuid, id, mode]);

  // --- Cancel Application Handler ---
  const handleCancelConfirm = async () => {
    if (!remark.trim()) {
      showErrorToast("Please enter a remark before cancelling.");
      return;
    }

    setLoadingCancel(true);
    try {
      await dispatch(cancelApplication({ uuid, data: { remark } })).unwrap();
      showSuccessToast("Application cancelled successfully.");
      setCancelModalOpen(false);
      setRemark("");
      await dispatch(getApplicationByUUID(uuid)).unwrap();
    } catch (error) {
      console.error(error);
      showErrorToast("Error while cancelling application.");
    } finally {
      setLoadingCancel(false);
    }
  };

  // --- Sync Application Handler ---
  const handleSyncApplication = async (application) => {
    setLoadingSync(true);
    try {
      await dispatch(syncApplication([application])).unwrap();
      showSuccessToast("Application synced successfully.");
      await dispatch(getApplicationByUUID({uuid})).unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSync(false);
    }
  };

  // --- Disable Conditions ---
  const isCanceled =
    applications?.status?.toLowerCase() === "canceled" ||
    applications?.status?.toLowerCase() === "cancelled";
  const isSynced = applications?.is_synced === 1;
  const mediator = applications?.mediator_id === null;

  const disableCancel = isCanceled || isSynced || loadingCancel;
  const disableSync = isCanceled || isSynced || loadingSync || mediator;

  // --- Toolbar Buttons ---
  const toolbarData = [
    {
      title: "HOME",
      children: [
        {
          title: "Cancel",
          type: "multiple",
          children: [
            {
              icon: (
                <CancelOutlinedIcon
                  color={disableCancel ? "disabled" : "error"}
                />
              ),
              title: loadingCancel ? "Cancelling..." : "Cancel",
              disabled: disableCancel,
              onClick: () => !disableCancel && setCancelModalOpen(true),

            },
          ],
        },
        {
          title: "Sync Application",
          type: "multiple",
          children: [
            {
              icon: (
                <SyncOutlinedIcon
                  color={disableSync ? "disabled" : "primary"}
                />
              ),
              title: loadingSync ? "Syncing..." : "Sync Application",
              disabled: disableSync,
              onClick: () =>
                !disableSync && handleSyncApplication(applications),

            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <Toolbar data={toolbarData} />

      {/* --- Cancel Modal --- */}
      <Dialog
        open={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 600, textAlign: "center" }}>
          Cancel Application
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Please enter a remark for cancelling this application:
          </Typography>
          <TextField
            autoFocus
            fullWidth
            multiline
            minRows={3}
            label="Remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </DialogContent>

        <DialogActions sx={{ p: 2, justifyContent: "space-between" }}>
          <Button
            onClick={() => setCancelModalOpen(false)}
            variant="outlined"
            color="secondary"
            disabled={loadingCancel}
          >
            Close
          </Button>
          <Button
            onClick={handleCancelConfirm}
            variant="contained"
            color="error"
            disabled={loadingCancel}
          >
            {loadingCancel ? "Cancelling..." : "Confirm Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default React.memo(ToolbarApplication);
