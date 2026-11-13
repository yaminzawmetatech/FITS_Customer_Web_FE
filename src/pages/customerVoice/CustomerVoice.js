import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Link, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerVoices } from "../../features/customerUser/customerVoice/customerVoiceSlice";
import serviceIllustration from "../../assets/images/fits-services.svg";

// Theme setup
const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontStyle: "italic" },
    body2: { fontWeight: 500 },
    button: { fontWeight: 700 },
  },
  palette: {
    primary: { main: "#17365d", dark: "#102a49" },
    secondary: { main: "#f46b12", dark: "#bd4705" },
    text: { primary: "#17283d", secondary: "#647386" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "9999px",
          width: "40px",
          height: "40px",
          minWidth: 0,
          padding: 0,
          transition: "all 300ms ease-in-out",
        },
        contained: {
          backgroundColor: "#17365d",
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "#102a49" },
        },
        outlined: {
          backgroundColor: "#fff",
          color: "#17365d",
          borderColor: "#d9e3ef",
          "&:hover": {
            backgroundColor: "#fff1e5",
            borderColor: "#ff9a4d",
          },
        },
      },
    },
  },
});

function CustomerVoice() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);
  const { customerVoices } = useSelector((state) => state.customerVoice);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(getCustomerVoices());
  }, [dispatch]);

  if (!customerVoices.length) return null;

  const current = customerVoices[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? customerVoices.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === customerVoices.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          py: { xs: 6, sm: 7, md: 9, lg: 11 },
          px: { xs: 2, sm: 4, md: 6, lg: 8 },
          display: "flex",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 1280 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: "#17365d",
              mb: { xs: 3, sm: 4, md: 5 },
              fontSize: { xs: "1.4rem", sm: "1.6rem", md: "1.8rem", lg: "2rem" },
              textAlign: { xs: "start", md: "left" },
            }}
          >
            {lang === "en" ? "Customer Voices" : "ဝယ်ယူသူ၏ စကားသံများ"}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 3, sm: 4, md: 5 },
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: { xs: 4, md: 6 },
              bgcolor: "#f4f6f9",
            }}
          >
            {/* Left Section */}
            <Box
              sx={{
                flex: 1,

                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: { xs: 2, sm: 3 },
                p: { xs: 2 }
              }}
            >
              <Link
                href="#"
                sx={{
                  color: "#df5908",
                  fontWeight: 700,
                  letterSpacing: "0.05rem",
                  fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.4rem" },
                  mb: { xs: 1, sm: 2 },
                  display: "block",
                  textAlign: { xs: "left", md: "left" },
                }}
              >
                {current[`title_${lang}`]}
              </Link>
              <Typography
                variant="body1"
                sx={{
                  color: "#405248",
                  mb: { xs: 1, sm: 2 },
                  px: { xs: 1, sm: 2, md: 0 },
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.05rem" },
                  lineHeight: { xs: 1.4, sm: 1.6 },
                  textAlign: { xs: "center" },
                }}
              >
                {current[`description_${lang}`]}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#4B5563",
                  textAlign: { xs: "right", md: "right" },
                  fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
                }}
              >
                {current[`customer_name_${lang}`]}
              </Typography>
            </Box>

            {/* Right Section */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                mt: { xs: 3, md: 0 },
              }}
            >
              <img
                src={
                  current.image || serviceIllustration
                }
                alt="Customer"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "300px",
                  borderRadius: 12,
                  boxShadow:
                    "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>

          {/* Bottom Navigation */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
              mt: { xs: 3, sm: 4, md: 5 },
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                backgroundColor: "#fff1e5",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#ffe0c7" },
              }}
            >
              <ArrowBackIos fontSize="small" />
            </IconButton>

            {customerVoices.length > 3
              ? customerVoices
                .slice(
                  Math.max(0, activeIndex - 1),
                  Math.min(customerVoices.length, activeIndex + 2)
                )
                .map((_, idx) => {
                  const realIndex = Math.max(0, activeIndex - 1) + idx;
                  return (
                    <Button
                      key={realIndex}
                      variant={activeIndex === realIndex ? "contained" : "outlined"}
                      onClick={() => setActiveIndex(realIndex)}
                      sx={{
                        minWidth: { xs: 30, sm: 35 },
                        height: { xs: 30, sm: 35 },
                        padding: 0,
                      }}
                    >
                      <Typography
                        variant="button"
                        sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" } }}
                      >
                        {realIndex + 1}
                      </Typography>
                    </Button>
                  );
                })
              : customerVoices.map((_, index) => (
                <Button
                  key={index}
                  variant={activeIndex === index ? "contained" : "outlined"}
                  onClick={() => setActiveIndex(index)}
                  sx={{
                    minWidth: { xs: 30, sm: 35 },
                    height: { xs: 30, sm: 35 },
                    padding: 0,
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{ fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" } }}
                  >
                    {index + 1}
                  </Typography>
                </Button>
              ))}

            <IconButton
              onClick={handleNext}
              sx={{
                backgroundColor: "#fff1e5",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#ffe0c7" },
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>


        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default CustomerVoice;
