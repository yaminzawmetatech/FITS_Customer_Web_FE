import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getFastServices } from "../../../features/customerUser/fastService/fastServiceSlice";
import serviceIllustration from "../../../assets/images/fits-services.svg";

// Custom MUI theme
const theme = createTheme({
  typography: {
    fontFamily: "Manrope, sans-serif",
    h5: { fontWeight: 700 },
    body1: { color: "#4B5563" },
  },
  palette: {
    primary: { main: "#17365d", dark: "#102a49" },
    secondary: { main: "#f46b12" },
    divider: "#dce3d6",
  },
});

function FirstService() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);
  const { fastServices } = useSelector((state) => state.fastService);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch services
  useEffect(() => {
    dispatch(getFastServices());
  }, [dispatch]);

  // Auto slide
  useEffect(() => {
    if (!fastServices.length) return;
    const lastSlideIndex = Math.ceil(fastServices.length / 2) - 1;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === lastSlideIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [fastServices]);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? Math.ceil(fastServices.length / 2) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === Math.ceil(fastServices.length / 2) - 1 ? 0 : prev + 1
    );
  };

  if (!fastServices.length) return null;

  // Group services in pairs of 2
  const slides = [];
  for (let i = 0; i < fastServices.length; i += 2) {
    const pair = fastServices.slice(i, i + 2);
    if (pair.length === 1) {
      pair.push({ id: `placeholder-${i}`, isPlaceholder: true });
    }
    slides.push(pair);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#f4f6f9",
          p: { xs: 2, sm: 4, md: 6, lg: 8 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 }, position: "relative" }}>
          {/* Slider Container */}
          <Box
            sx={{
              display: "flex",
              overflow: "hidden",
              position: "relative",
              width: "100%",
              height: "auto",
            }}
          >
            {slides.map((pair, index) => (
              <Box
                key={index}
                sx={{
                  flex: "0 0 100%",
                  opacity: index === activeIndex ? 1 : 0,
                  transition: "opacity 0.6s ease-in-out",
                  position: index === activeIndex ? "relative" : "absolute",
                  width: "100%",
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: { xs: 3, sm: 2, md: 4 },
                }}
              >
                {pair.map((item) =>
                  item.isPlaceholder ? (
                    <Box
                      key={item.id}
                      sx={{
                        flex: 1,
                        borderRadius: 2,
                        p: 2,
                        visibility: "hidden",
                      }}
                    />
                  ) : (
                    <Box
                      key={item.id}
                      sx={{
                        flex: 1,
                        width: "100%",
                        textAlign: "center",
                        backgroundColor: "#fff",
                        border: "1px solid rgba(23,54,93,.08)",
                        borderRadius: 4,
                        p: { xs: 3, sm: 4 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                        boxShadow: "0 12px 35px rgba(23,54,93,.06)",
                      }}
                    >
                      {/* Image Section */}
                      <Box
                        sx={{
                          width: "100%",
                          height: { xs: 180, sm: 200, md: 240, lg: 260 },
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                          borderRadius: 2,
                        }}
                      >
                        <img
                          src={item.image || serviceIllustration}
                          alt={lang === "en" ? item.title_en : item.title_mm}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = serviceIllustration;
                          }}
                        />
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          mt: 2,
                          mb: 1,
                          fontSize: {
                            xs: "1rem",
                            sm: "1.1rem",
                            md: "1.25rem",
                          },
                          fontWeight: 700,
                        }}
                      >
                        {lang === "en" ? item.title_en : item.title_mm}
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          color: "#68776d",
                          fontSize: {
                            xs: "0.85rem",
                            sm: "0.9rem",
                            md: "1rem",
                          },
                          px: { xs: 1, sm: 2 },
                        }}
                      >
                        {lang === "en"
                          ? item.description_en
                          : item.description_mm}
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
            ))}
          </Box>

          {/* Navigation Arrows */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: { xs: 3, sm: 4 },
              gap: 2,
            }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                "&:hover": { backgroundColor: "#f1f1f1" },
              }}
            >
              <ArrowBackIos fontSize="small" />
            </IconButton>

            <IconButton
              onClick={handleNext}
              sx={{
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                "&:hover": { backgroundColor: "#f1f1f1" },
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>

          {/* Dots Indicator */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: { xs: 2, sm: 3 },
              gap: 1,
            }}
          >
            {slides.map((_, index) => (
              <Button
                key={index}
                onClick={() => setActiveIndex(index)}
                sx={{
                  width: 10,
                  height: 10,
                  minWidth: 10,
                  borderRadius: "50%",
                  backgroundColor:
                    index === activeIndex ? "#374151" : "#D1D5DB",
                  "&:hover": {
                    backgroundColor:
                      index === activeIndex ? "#374151" : "#9CA3AF",
                  },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default FirstService;
