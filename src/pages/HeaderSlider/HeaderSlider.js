import React from "react";
import {
  ArrowForward,
  ArrowOutward,
  CheckCircleOutline,
  InsightsOutlined,
  LockOutlined,
  SupportAgentOutlined,
  CloudOutlined,
} from "@mui/icons-material";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import heroImage from "../../assets/images/fits-finance-dashboard-user.png";

const HeaderSlider = () => {
  const lang = useSelector((state) => state.language.lang);
  const isEnglish = lang === "en";
  const benefits = [
    {
      icon: <LockOutlined />,
      title: isEnglish ? "Secure & reliable" : "လုံခြုံစိတ်ချရမှု",
      detail: isEnglish ? "Your plans, handled with care" : "သင့်အစီအစဉ်များကို ဂရုတစိုက်",
    },
    {
      icon: <InsightsOutlined />,
      title: isEnglish ? "Clear insights" : "ရှင်းလင်းသော အချက်အလက်များ",
      detail: isEnglish ? "Understand your options" : "ရွေးချယ်စရာများကို နားလည်ရန်",
    },
    {
      icon: <CloudOutlined />,
      title: isEnglish ? "Simple to explore" : "လွယ်ကူစွာ လေ့လာနိုင်မှု",
      detail: isEnglish ? "Information when you need it" : "လိုအပ်ချိန်တွင် အချက်အလက်ရရှိရန်",
    },
    {
      icon: <SupportAgentOutlined />,
      title: isEnglish ? "Here to support" : "အကူအညီပေးရန် အသင့်ရှိမှု",
      detail: isEnglish ? "Guidance for your next step" : "နောက်တစ်ဆင့်အတွက် လမ်းညွှန်မှု",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 68% 32%, rgba(84,151,232,.16), transparent 34%), linear-gradient(120deg, #fff 0%, #f6f9ff 53%, #eaf3ff 100%)",
        pt: { xs: 2, sm: 3.5, lg: 4 },
        pb: { xs: 3, md: 3.5 },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: { xs: 110, md: 190 },
          height: { xs: 110, md: 190 },
          opacity: 0.36,
          backgroundImage: "radial-gradient(#9bb9e1 1.8px, transparent 1.8px)",
          backgroundSize: "14px 14px",
          maskImage: "linear-gradient(135deg, black, transparent 75%)",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container alignItems="center" spacing={{ xs: 2, sm: 2.5, md: 1.5, lg: 2 }}>
          <Grid item xs={12} md={5.5}>
            <Stack spacing={{ xs: 1.25, sm: 1.5 }} sx={{ maxWidth: 620, py: { md: 1 } }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  alignSelf: "flex-start",
                  px: 1.75,
                  py: 0.9,
                  borderRadius: 99,
                  bgcolor: "#fff0e4",
                  color: "#e95f00",
                  fontSize: "0.88rem",
                  fontWeight: 750,
                  fontFamily: isEnglish
                    ? "inherit"
                    : '"Myanmar Text", "Noto Sans Myanmar", "Padauk", sans-serif',
                  lineHeight: isEnglish ? 1.4 : 1.8,
                }}
              >
                <InsightsOutlined sx={{ fontSize: 19 }} />
                {isEnglish ? "Smarter financial planning" : "ပိုမိုထက်မြက်သော ငွေကြေးစီမံမှု"}
              </Box>
              <Typography
                component="h1"
                sx={{
                  color: "#102a49",
                  fontSize: isEnglish
                    ? { xs: "2.45rem", sm: "3.2rem", lg: "3.9rem" }
                    : { xs: "1.7rem", sm: "2.2rem", lg: "2.8rem" },
                  fontWeight: isEnglish ? 850 : 750,
                  letterSpacing: isEnglish ? "-0.065em" : 0,
                  lineHeight: isEnglish
                    ? { xs: 1.04, lg: 1.02 }
                    : { xs: 1.75, sm: 1.7, lg: 1.65 },
                  maxWidth: 650,
                  fontFamily: isEnglish
                    ? "inherit"
                    : '"Myanmar Text", "Noto Sans Myanmar", "Padauk", sans-serif',
                }}
              >
                {isEnglish ? (
                  <>
                    Plan your next move{" "}
                    <Box component="span" sx={{ color: "#f46b12" }}>
                      with confidence.
                    </Box>
                  </>
                ) : (
                  <>
                    ယုံကြည်မှုဖြင့်{" "}
                    <Box component="span" sx={{ color: "#f46b12" }}>
                      နောက်တစ်ဆင့်ကို စီစဉ်ပါ။
                    </Box>
                  </>
                )}
              </Typography>
              <Typography
                sx={{
                  maxWidth: 540,
                  color: "#52647b",
                  fontSize: isEnglish
                    ? { xs: "1rem", sm: "1.1rem" }
                    : { xs: "0.98rem", sm: "1.05rem" },
                  lineHeight: isEnglish ? 1.8 : 2,
                  fontFamily: isEnglish
                    ? "inherit"
                    : '"Myanmar Text", "Noto Sans Myanmar", "Padauk", sans-serif',
                }}
              >
                {isEnglish
                  ? "Explore financing options, understand the process and use clear tools to make a plan that works for you."
                  : "ငွေကြေးဝန်ဆောင်မှုများကို လေ့လာပါ၊ လုပ်ငန်းစဉ်ကို နားလည်ပါ၊ သင့်အတွက် သင့်လျော်သော အစီအစဉ်တစ်ခု ပြုလုပ်နိုင်ရန် ရှင်းလင်းသော ကိရိယာများကို အသုံးပြုပါ။"}
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ pt: 0.5 }}>
                <Button
                  component={Link}
                  to="/apply-now"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 3,
                    py: isEnglish ? 1.45 : 1.15,
                    borderRadius: 99,
                    color: "#fff",
                    bgcolor: "#f46b12",
                    lineHeight: isEnglish ? 1.5 : 1.8,
                    fontFamily: isEnglish
                      ? "inherit"
                      : '"Myanmar Text", "Noto Sans Myanmar", "Padauk", sans-serif',
                    boxShadow: "0 10px 24px rgba(244,107,18,.24)",
                    "&:hover": { bgcolor: "#dc5907", boxShadow: "0 12px 26px rgba(244,107,18,.3)" },
                  }}
                >
                  {isEnglish ? "Start an application" : "လျှောက်လွှာစတင်ရန်"}
                </Button>
                <Button
                  component={Link}
                  to="/loan-calculator"
                  variant="text"
                  endIcon={<ArrowOutward />}
                  sx={{
                    px: 2,
                    py: isEnglish ? 1.45 : 1.15,
                    borderRadius: 99,
                    color: "#102a49",
                    lineHeight: isEnglish ? 1.5 : 1.8,
                    fontFamily: isEnglish
                      ? "inherit"
                      : '"Myanmar Text", "Noto Sans Myanmar", "Padauk", sans-serif',
                    "&:hover": { bgcolor: "rgba(16,42,73,.06)" },
                  }}
                >
                  {isEnglish ? "Try the payment planner" : "အရစ်ကျတွက်ချက်ရန်"}
                </Button>
              </Stack>
              <Stack
                direction="row"
                flexWrap="wrap"
                spacing={{ xs: 1.5, sm: 2.5 }}
                useFlexGap
                sx={{ pt: { xs: 0.5, sm: 1 } }}
              >
                {[
                  isEnglish ? "A clear process" : "ရှင်းလင်းသော လုပ်ငန်းစဉ်",
                  isEnglish ? "Options to explore" : "လေ့လာနိုင်သော ရွေးချယ်စရာများ",
                ].map((item) => (
                  <Stack key={item} direction="row" spacing={0.75} alignItems="center">
                    <CheckCircleOutline sx={{ fontSize: 17, color: "#16866b" }} />
                    <Typography sx={{ color: "#52647b", fontSize: "0.8rem", fontWeight: 650 }}>
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6.5}>
            <Box
              component="img"
              src={heroImage}
              alt={
                isEnglish
                  ? "Finance dashboard illustration on a laptop with a chart, savings and a plant"
                  : "ဇယားကွက်၊ စုဆောင်းငွေနှင့် အပင်ပါဝင်သော လက်ပ်တော့ ငွေကြေးစီမံမှု သရုပ်ဖော်ပုံ"
              }
              sx={{
                display: "block",
                width: "100%",
                maxWidth: { xs: 360, sm: 460, md: 500, lg: 560 },
                mx: "auto",
                filter: "drop-shadow(0 26px 36px rgba(16,42,73,.13))",
              }}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
            mt: { xs: 0.5, md: 0 },
            mx: { xs: 0, md: "6%" },
            px: { xs: 1, sm: 2, md: 2.5 },
            py: { xs: 1, md: 1.35 },
            border: "1px solid rgba(255,255,255,.82)",
            borderRadius: { xs: 3, md: 5 },
            background: "rgba(255,255,255,.82)",
            boxShadow: "0 16px 42px rgba(28,66,113,.09)",
            backdropFilter: "blur(14px)",
          }}
        >
          {benefits.map((benefit, index) => (
            <Stack
              key={benefit.title}
              direction="row"
              spacing={{ xs: 1, sm: 1.5 }}
              alignItems="center"
              sx={{
                px: { xs: 1, sm: 2 },
                py: { xs: 1, md: 0.5 },
                borderRight: {
                  xs: index % 2 === 0 ? "1px solid #dfe7f1" : "none",
                  md: index < benefits.length - 1 ? "1px solid #dfe7f1" : "none",
                },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  width: { xs: 36, sm: 42 },
                  height: { xs: 36, sm: 42 },
                  borderRadius: 2.5,
                  color: index === 1 ? "#f46b12" : "#13518f",
                  bgcolor: index === 1 ? "#fff0e4" : "#eaf3ff",
                  "& svg": { fontSize: { xs: 19, sm: 22 } },
                }}
              >
                {benefit.icon}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    color: "#102a49",
                    fontSize: isEnglish
                      ? { xs: "0.72rem", sm: "0.88rem" }
                      : { xs: "0.77rem", sm: "0.9rem" },
                    fontWeight: 750,
                    lineHeight: isEnglish ? 1.3 : 1.8,
                    fontFamily: isEnglish
                      ? "inherit"
                      : '"Myanmar Text", "Noto Sans Myanmar", "Padauk", sans-serif',
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  sx={{
                    mt: 0.25,
                    color: "#66778d",
                    fontSize: isEnglish
                      ? { xs: "0.62rem", sm: "0.72rem" }
                      : { xs: "0.68rem", sm: "0.74rem" },
                    lineHeight: isEnglish ? 1.35 : 1.8,
                    fontFamily: isEnglish
                      ? "inherit"
                      : '"Myanmar Text", "Noto Sans Myanmar", "Padauk", sans-serif',
                  }}
                >
                  {benefit.detail}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HeaderSlider;
