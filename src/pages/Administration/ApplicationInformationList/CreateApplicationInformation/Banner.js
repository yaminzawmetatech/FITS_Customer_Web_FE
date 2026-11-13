import React from "react";
import { Box, Typography } from "@mui/material";
import backgroundImage from "../../assets/images/apply-now.png"; // adjust path

const Banner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "300px", sm: "300px", md: "350px" },
        backgroundImage: `
          linear-gradient(rgba(0, 51, 102, 0.6), rgba(0, 51, 102, 0.6)),
          url(${backgroundImage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: { xs: "center", sm: "flex-start" },
        color: "#fff",
        textAlign: { xs: "center", sm: "left" },
        px: { xs: 2, sm: 6, md: 12, lg: 20 },
        py: { xs: 4, sm: 0 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 600,
          mb: 1,
          textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
          fontSize: {
            xs: "1rem", // mobile
            sm: "1.5rem", // tablet
            md: "2rem",   // small desktop
            lg: "2.5rem", // large screen
          },
        }}
      >
        Mo Mo Venture Finance Co.Ltd
      </Typography>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 300,
          textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
          fontSize: {
            xs: "0.8rem",
            sm: "1rem",
            md: "1.2rem",
            lg: "1.5rem",
          },
          maxWidth: { xs: "90%", sm: "70%", md: "60%" },
        }}
      >
        Your trusted partner in financial solutions across Myanmar
      </Typography>
    </Box>
  );
};

export default Banner;
