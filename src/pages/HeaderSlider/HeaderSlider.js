import React from "react";
import { ArrowForward, ArrowOutward, CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Chip, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import heroImage from "../../assets/images/fits-hero.svg";

const HeaderSlider = () => {
  const lang = useSelector((state) => state.language.lang);
  const isEnglish = lang === "en";

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 86% 20%, rgba(244,107,18,.14), transparent 31%), linear-gradient(135deg, #f4f6f9 0%, #fff 58%, #fff4ea 100%)",
        pt: { xs: 5, sm: 7, lg: 9 },
        pb: { xs: 7, sm: 8, lg: 10 },
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "48%",
          left: "-120px",
          width: 240,
          height: 240,
          borderRadius: "50%",
          backgroundColor: "rgba(244, 107, 18, .10)",
          filter: "blur(2px)",
        }}
      />
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Grid container alignItems="center" spacing={{ xs: 4, md: 3, lg: 5 }}>
          <Grid item xs={12} md={6}>
            <Stack spacing={{ xs: 2.5, sm: 3 }} sx={{ maxWidth: 620, py: { md: 3 } }}>
              <Chip
                icon={<CheckCircleOutline sx={{ color: "primary.main !important" }} />}
                label={isEnglish ? "A clearer way forward" : "ပိုမိုရှင်းလင်းသော ငွေကြေးလမ်းကြောင်း"}
                sx={{
                  alignSelf: "flex-start",
                  height: 38,
                  px: 0.75,
                  bgcolor: "secondary.lighter",
                  color: "secondary.dark",
                  fontWeight: 700,
                  "& .MuiChip-label": { px: 1.25 },
                }}
              />
              <Typography
                component="h1"
                sx={{
                  color: "primary.dark",
                  fontSize: { xs: "2.65rem", sm: "3.55rem", lg: "4.65rem" },
                  fontWeight: 800,
                  letterSpacing: "-0.065em",
                  lineHeight: { xs: 1.08, lg: 1.04 },
                  maxWidth: 650,
                }}
              >
                {isEnglish ? (
                  <>Make room for <Box component="span" sx={{ color: "secondary.main" }}>what&apos;s next.</Box></>
                ) : (
                  <>ရှေ့ဆက်မယ့်အရာတွေအတွက် <Box component="span" sx={{ color: "secondary.main" }}>နေရာဖန်တီးလိုက်ပါ။</Box></>
                )}
              </Typography>
              <Typography
                sx={{
                  maxWidth: 510,
                  color: "text.secondary",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  lineHeight: 1.8,
                }}
              >
                {isEnglish
                  ? "Explore financing options with a simpler application, clearer information and support that stays with you."
                  : "လွယ်ကူသော လျှောက်ထားမှု၊ ရှင်းလင်းသော အချက်အလက်များနှင့် အတူရှိနေမည့် အကူအညီများဖြင့် ငွေကြေးဝန်ဆောင်မှုများကို လေ့လာလိုက်ပါ။"}
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 0.5 }}>
                <Button
                  component={Link}
                  to="/apply-now"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    boxShadow: "0 12px 24px rgba(23,54,93,.18)",
                    "&:hover": { boxShadow: "0 16px 30px rgba(23,54,93,.24)" },
                  }}
                >
                  {isEnglish ? "Explore financing" : "ငွေကြေးဝန်ဆောင်မှု လေ့လာရန်"}
                </Button>
                <Button
                  component={Link}
                  to="/loan-calculator"
                  variant="text"
                  endIcon={<ArrowOutward />}
                  sx={{ px: 2, py: 1.5, borderRadius: 3, color: "primary.dark", "&:hover": { bgcolor: "secondary.lighter" } }}
                >
                  {isEnglish ? "Try the calculator" : "ချေးငွေတွက်စက် အသုံးပြုရန်"}
                </Button>
              </Stack>
              <Stack
                direction="row"
                flexWrap="wrap"
                spacing={{ xs: 1.5, sm: 2.5 }}
                useFlexGap
                sx={{ pt: { xs: 1, sm: 1.5 } }}
              >
                {[
                  isEnglish ? "A straightforward process" : "ရိုးရှင်းသော လုပ်ငန်းစဉ်",
                  isEnglish ? "Options that fit your needs" : "လိုအပ်ချက်နှင့် ကိုက်ညီသော ရွေးချယ်မှုများ",
                ].map((item) => (
                  <Stack key={item} direction="row" spacing={0.75} alignItems="center">
                    <CheckCircleOutline sx={{ fontSize: 17, color: "primary.main" }} />
                    <Typography sx={{ color: "text.secondary", fontSize: "0.78rem", fontWeight: 600 }}>
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: 680,
                mx: "auto",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "8% 7% 6%",
                  borderRadius: "48% 52% 43% 57% / 49% 42% 58% 51%",
                  background: "linear-gradient(145deg, #dce7f3, #ffe2cc)",
                  transform: "rotate(-7deg)",
                },
              }}
            >
              <Box
                component="img"
                src={heroImage}
                alt="An illustration of a personal finance plan and a growing savings chart"
                sx={{
                  position: "relative",
                  display: "block",
                  width: "100%",
                  filter: "drop-shadow(0 26px 34px rgba(23,54,93,.12))",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  right: { xs: 0, sm: 8, lg: -8 },
                  bottom: { xs: 16, sm: 35, lg: 45 },
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  gap: 1.25,
                  bgcolor: "#fffdf8",
                  border: "1px solid rgba(23,54,93,.08)",
                  borderRadius: 4,
                  p: 1.5,
                  boxShadow: "0 15px 40px rgba(23,54,93,.12)",
                }}
              >
                <Box sx={{ width: 36, height: 36, display: "grid", placeItems: "center", borderRadius: 2.5, bgcolor: "secondary.lighter", color: "secondary.dark" }}>
                  <CheckCircleOutline fontSize="small" />
                </Box>
                <Box>
                  <Typography sx={{ color: "primary.dark", fontWeight: 700, fontSize: "0.8rem" }}>
                    {isEnglish ? "One step at a time" : "တစ်ဆင့်ချင်း လွယ်ကူစွာ"}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: "0.69rem" }}>
                    {isEnglish ? "Move forward with confidence" : "ယုံကြည်မှုဖြင့် ရှေ့ဆက်လိုက်ပါ"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeaderSlider;
