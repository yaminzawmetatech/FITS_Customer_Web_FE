import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CompanyInfoCardAboutUs from "./companyInfoCardAboutUs";
import FirstService from "./component/FirstService";
import HowToApplyLoan from "../howToApplyLoan/HowToApplyLoan";
import { useDispatch, useSelector } from "react-redux";
import { getOurServices } from "../../features/customerUser/ourService/ourServiceSlice";
import aboutUsIllustration from "../../assets/images/fits-services.svg";
import { useNavigate } from "react-router";

// Custom theme
const theme = createTheme({
  typography: {
    fontFamily: "Manrope, sans-serif",
  },
  palette: {
    primary: { main: "#17365d", dark: "#102a49" },
    secondary: { main: "#f46b12" },
    text: {
      primary: "#1F2937",
      secondary: "#4B5563",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
          fontWeight: 600,
        },
      },
    },
  },
});

function AboutUsPage() {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);
  const { ourServices } = useSelector((state) => state.userOurServices);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getOurServices());
  }, [dispatch]);

  // Auto slide
  useEffect(() => {
    if (ourServices.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) =>
          prev === ourServices.length - 1 ? 0 : prev + 1
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [ourServices]);

  const currentService = ourServices[activeIndex] || [];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ fontFamily: "Manrope, sans-serif", p: 0, m: 0 }}>
        {/* Header Section */}
        <Box
          sx={{
            background: "radial-gradient(ellipse at 76% 10%, rgba(244,107,18,.24), transparent 35%), linear-gradient(130deg, #102a49 12%, #244b76 100%)",
            minHeight: { xs: 250, sm: 310, md: 360 },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: "100%",
            px: { xs: 2, sm: 4, md: 6, lg: 8 },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: "#fff",
              fontWeight: 800,
              letterSpacing: "-.05em",
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem", lg: "3rem" },
              textAlign: "center",
            }}
          >
            {lang === "en" ? "About Us" : "ကျွန်ုပ်တို့အကြောင်း"}
          </Typography>
        </Box>

        {/* Content Section */}
        <Container
          maxWidth="md"
          sx={{
            position: "relative",
            top: { xs: "-80px", sm: "-100px", md: "-120px" },
            px: { xs: 3, sm: 10, md: 2 },
          }}
        >

          <Grid
            container
            spacing={0}
            sx={{
              width: "100%",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 3,
              transition: "all 0.4s ease-in-out",
            }}
          >
            {/* Left: Image (50%) */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                width: "100%",
                height: { xs: 250, sm: 300, md: 450, lg: 500 }, // 👈 responsive height for image section
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f4f6f9",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  aspectRatio: { xs: "16/9", md: "auto" }, // 👈 keeps proper image ratio on smaller screens
                  display: "flex",
                }}
              >
                <img
                  src={aboutUsIllustration}
                  alt="FITS Finance illustration of a clear financial plan"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    flex: 1,
                  }}
                />
              </Box>
            </Grid>

            {/* Right: Text (50%) */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                backgroundColor: "#17365d",
                color: "#fff",
                height: { xs: 250, sm: 300, md: 450, lg: 500 }, // 👈 responsive height for text section
                p: { xs: 3, sm: 4, md: 5 },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: { xs: "start", md: "left" },
              }}
            >
              {/* Title */}
              <Typography
                variant="h5"
                sx={{
                  mb: 1.5,
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.4rem",
                    md: "1.8rem",
                    lg: "2rem",
                  },
                  fontWeight: 600,
                }}
              >
                {currentService?.[`title_${lang}`] || "Service Title"}
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                  color: "rgba(216, 214, 214, 0.9)",
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    md: "1.05rem",
                    lg: "1.1rem",
                  },
                  textAlign: "justify",
                }}
              >
                {currentService?.[`description_${lang}`] ||
                  "Service description text goes here."}
              </Typography>

              {/* Button */}
              <Button
                variant="contained"
                sx={{
                  alignSelf: { xs: "center", sm: "flex-start" },
                  backgroundColor: "#f46b12",
                  "&:hover": { backgroundColor: "#df5908" },
                  px: { xs: 2.5, sm: 3 },
                  py: { xs: 1, sm: 1.2 },
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  borderRadius: 2,
                }}
              >
                Read More
              </Button>
            </Grid>
          </Grid>

          {/* Prev / Next Buttons */}
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? ourServices.length - 1 : prev - 1
                )
              }
              sx={{
                backgroundColor: "rgba(30,58,138,0.9)",
                "&:hover": { backgroundColor: "#df5908" },
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
              }}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === ourServices.length - 1 ? 0 : prev + 1
                )
              }
              sx={{
                backgroundColor: "rgba(30,58,138,0.9)",
                "&:hover": { backgroundColor: "#df5908" },
                fontSize: { xs: "0.8rem", sm: "0.9rem" },
              }}
            >
              Next
            </Button>
          </Box>

          {/* Who Are We Section */}
          <Box
            sx={{
              mt: { xs: 6, sm: 8, md: 10 },
              textAlign: "center",
              px: { xs: 2, sm: 3, md: 5 },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2rem" },
                mb: 2,
              }}
            >
              {lang === "en" ? "Who are we?" : "ကျွန်ုပ်တို့အကြောင်း"}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mb: 4,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                textAlign: "justify",
              }}
            >
              {lang === "en"
                ? "FITS Finance is here to make financing easier to understand and easier to explore. We bring helpful information and considered options together, so you can make a choice that feels right for your plans."
                : "FITS Finance သည် ငွေကြေးဝန်ဆောင်မှုများကို နားလည်ရလွယ်ကူစေရန် ရည်ရွယ်ပါသည်။ သင့်အစီအစဉ်နှင့် ကိုက်ညီသော ရွေးချယ်မှုကို ဆုံးဖြတ်နိုင်ရန် အသုံးဝင်သော အချက်အလက်များနှင့် ရွေးချယ်စရာများကို ပံ့ပိုးပေးပါသည်။"}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/apply-now")}
            >
              {lang === "en" ? "Apply Now" : "လျှောက်ထားရန်"}
            </Button>
          </Box>
        </Container>

        {/* Other Components */}
        <CompanyInfoCardAboutUs />
        <FirstService />
        <HowToApplyLoan />
      </Box>
    </ThemeProvider>
  );
}

export default AboutUsPage;
