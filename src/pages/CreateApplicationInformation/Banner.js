import React from "react";
import { ArrowForward, InsightsOutlined } from "@mui/icons-material";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import heroImage from "../../assets/images/fits-finance-dashboard-user.png";

const Banner = () => {
  const lang = useSelector((state) => state.language.lang);
  const isEnglish = lang === "en";
  const myanmarFont =
    '"Myanmar Text", "Noto Sans Myanmar", "Padauk", sans-serif';

  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 75% 35%, rgba(84,151,232,.16), transparent 34%), linear-gradient(120deg, #fff 0%, #f6f9ff 53%, #eaf3ff 100%)",
        py: { xs: 3, sm: 4, md: 5 },
      }}
    >
      <Container maxWidth="xl">
        <Grid container alignItems="center" spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <Stack spacing={{ xs: 1.5, sm: 2 }} sx={{ maxWidth: 620 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  alignSelf: "flex-start",
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 99,
                  bgcolor: "#fff0e4",
                  color: "#e95f00",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  fontFamily: isEnglish ? "inherit" : myanmarFont,
                  lineHeight: isEnglish ? 1.4 : 1.8,
                }}
              >
                <InsightsOutlined sx={{ fontSize: 18 }} />
                FITS FINANCE
              </Box>

              <Typography
                component="h1"
                sx={{
                  color: "#102a49",
                  fontSize: isEnglish
                    ? { xs: "2rem", sm: "2.7rem", lg: "3.25rem" }
                    : { xs: "1.65rem", sm: "2.15rem", lg: "2.65rem" },
                  fontWeight: 850,
                  letterSpacing: isEnglish ? "-.055em" : 0,
                  lineHeight: isEnglish
                    ? { xs: 1.12, md: 1.08 }
                    : { xs: 1.75, md: 1.7 },
                  fontFamily: isEnglish ? "inherit" : myanmarFont,
                }}
              >
                {isEnglish
                  ? "Start your application with confidence."
                  : "ယုံကြည်မှုဖြင့် လျှောက်လွှာစတင်ပါ။"}
              </Typography>

              <Typography
                sx={{
                  maxWidth: 550,
                  color: "#52647b",
                  fontSize: isEnglish ? { xs: ".95rem", sm: "1.05rem" } : ".98rem",
                  lineHeight: isEnglish ? 1.8 : 2,
                  fontFamily: isEnglish ? "inherit" : myanmarFont,
                }}
              >
                {isEnglish
                  ? "Choose a financing option and provide the requested information. Submitting an application does not guarantee approval."
                  : "သင့်တော်သော ငွေကြေးဝန်ဆောင်မှုကို ရွေးချယ်ပြီး လိုအပ်သောအချက်အလက်များကို ဖြည့်သွင်းပါ။ လျှောက်လွှာတင်သွင်းခြင်းသည် ခွင့်ပြုချက်ရရှိမည်ဟု အာမခံခြင်းမဟုတ်ပါ။"}
              </Typography>

              <Button
                component={Link}
                to="#select-product"
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  alignSelf: "flex-start",
                  px: 2.5,
                  py: 1.1,
                  borderRadius: 99,
                  color: "#fff",
                  bgcolor: "#f46b12",
                  fontWeight: 750,
                  lineHeight: isEnglish ? 1.5 : 1.8,
                  textTransform: "none",
                  fontFamily: isEnglish ? "inherit" : myanmarFont,
                  boxShadow: "0 8px 20px rgba(244,107,18,.2)",
                  "&:hover": { bgcolor: "#dc5907" },
                }}
              >
                {isEnglish ? "Choose a product" : "အမျိုးအစားရွေးချယ်ရန်"}
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={heroImage}
              alt={
                isEnglish
                  ? "Illustration of a finance dashboard and planning tools"
                  : "ငွေကြေးစီမံမှု dashboard နှင့် စီစဉ်ရေးကိရိယာများ သရုပ်ဖော်ပုံ"
              }
              sx={{
                display: "block",
                width: "100%",
                maxWidth: { xs: 400, sm: 500, md: 600 },
                maxHeight: { xs: 220, sm: 270, md: 330 },
                mx: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 20px 30px rgba(16,42,73,.12))",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
