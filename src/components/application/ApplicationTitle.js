import React, { useMemo } from "react";
import { Box, Typography, Button } from "@mui/material";
import PlaylistRemoveOutlinedIcon from '@mui/icons-material/PlaylistRemoveOutlined';
import { useSelector } from "react-redux";

const ApplicationTitle = ({ title, application, sx, sxTypography, handleModalOpen, isTabletView }) => {
  const { black_list_customer } = useSelector(
    (state) => state.applicationDetail
  );

  const { existing_customer } = useSelector((state) => state.applicationDetail);
  const Title = useMemo(
    () =>
      application
        ? [
          application?.application_id,
          application?.application_info?.mnet_application_id,
          application?.application_info?.customer_loan_id,
          title || application?.status,
        ]
          .filter(Boolean)
          .join(" - ")
        : null,
    [application, title]
  );

  return (
    <Box
      sx={{
        px: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...sx,
      }}
    >
      <Typography
        sx={{ color: "#1890ff", ...sxTypography }}
        variant="h5"
        gutterBottom
      >
        {Title}
      </Typography>
      {
        isTabletView ? (
          <Typography
            sx={{ display: "flex", alignItems: "center", cursor: "pointer", color: black_list_customer?.black_list_customer_name ? 'red' : existing_customer?.application?.category?.name ? 'blue' : "#1890ff" }}
            gutterBottom
            onClick={handleModalOpen}
          >
            <PlaylistRemoveOutlinedIcon sx={{ mr: 1 }} />
            CustomerStatistics
          </Typography>
        ) : null
      }
    </Box>

  );
};

export default React.memo(ApplicationTitle);
