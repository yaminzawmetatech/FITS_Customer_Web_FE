import React from "react";
import {
  ArrowForward,
  CheckCircleOutline,
  DescriptionOutlined,
  PersonOutline,
  TaskAltOutlined,
} from "@mui/icons-material";
import { Box, Typography, styled, Button, Grid, Stack, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

// Styled components
const SectionWrapper = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #102a49 0%, #173f6c 100%)",
  textAlign: "center",
  padding: "88px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "24px 0",
  },
}));

const HowToApplyLoan = () => {
  const lang = useSelector((state) => state.language.lang);
  const steps = [
    {
      icon: <DescriptionOutlined />,
      title: lang === "en" ? "Explore the details" : "အသေးစိတ်အချက်အလက်များကို လေ့လာပါ",
      description:
        lang === "en"
          ? "Review the available information and decide what suits your plans."
          : "ရရှိနိုင်သော အချက်အလက်များကို လေ့လာပြီး သင့်အစီအစဉ်နှင့် သင့်တော်မှုကို စဉ်းစားပါ။",
    },
    {
      icon: <PersonOutline />,
      title: lang === "en" ? "Get your details ready" : "လိုအပ်သောအချက်အလက်များ ပြင်ဆင်ပါ",
      description:
        lang === "en"
          ? "Have your personal and supporting information ready to enter."
          : "ဖြည့်သွင်းရန် ကိုယ်ရေးအချက်အလက်နှင့် အထောက်အထားများကို ပြင်ဆင်ထားပါ။",
    },
    {
      icon: <TaskAltOutlined />,
      title: lang === "en" ? "Complete your application" : "လျှောက်လွှာကို ဖြည့်သွင်းပါ",
      description:
        lang === "en"
          ? "Follow the guided steps and check your information before submitting."
          : "လမ်းညွှန်အဆင့်များအတိုင်း ဖြည့်သွင်းပြီး မတင်သွင်းမီ အချက်အလက်များကို စစ်ဆေးပါ။",
    },
    {
      icon: <CheckCircleOutline />,
      title: lang === "en" ? "Stay informed" : "အခြေအနေကို ဆက်လက်စောင့်ကြည့်ပါ",
      description:
        lang === "en"
          ? "Keep your application details handy for any follow-up."
          : "နောက်ဆက်တွဲဆောင်ရွက်မှုများအတွက် လျှောက်လွှာအချက်အလက်များကို သိမ်းဆည်းထားပါ။",
    },
  ];

  return (
    <SectionWrapper component="section">
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 680, mx: "auto" }}>
          <Typography
            sx={{
              color: "#ffb36b",
              fontSize: "0.76rem",
              fontWeight: 800,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              mb: 1.5,
            }}
          >
            {lang === "en" ? "Your application journey" : "သင့်လျှောက်ထားမှု ခရီးစဉ်"}
          </Typography>
          <Typography
            variant="h4"
            color="#fff"
            fontWeight={800}
            mb={2}
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              textAlign: "center",
              letterSpacing: "-.035em",
            }}
          >
            {lang === "en" ? "A simpler way to get started." : "စတင်လျှောက်ထားရန် ပိုမိုလွယ်ကူသောနည်းလမ်း။"}
          </Typography>

          <Typography
            variant="body1"
            color="rgba(255,255,255,.75)"
            mb={6}
            sx={{
              fontSize: { xs: "0.95rem", sm: "1rem" },
              textAlign: "center",
              lineHeight: 1.8,
            }}
          >
            {lang === "en"
              ? "Know what to expect at every stage, from your first look to your submitted application."
              : "စတင်လေ့လာချိန်မှ လျှောက်လွှာတင်သွင်းချိန်အထိ အဆင့်တိုင်းတွင် ဘာလုပ်ရမည်ကို ကြိုတင်သိရှိပါ။"}
          </Typography>
        </Box>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 0, sm: 2, md: 3 },
          textAlign: "center",
        }}
      >
        {steps.map((step, index) => (
          <Grid
            item
            key={step.title}
            xs={12}
            sm={6}
            md={3}
          >
            <Box
              sx={{
                height: "100%",
                minHeight: 245,
                p: { xs: 2.5, md: 2 },
                borderRadius: 4,
                textAlign: "left",
                bgcolor: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.12)",
                transition: "transform .2s ease, background .2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  bgcolor: "rgba(255,255,255,.12)",
                },
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 3,
                    color: "#ffb36b",
                    bgcolor: "rgba(255,179,107,.14)",
                    "& svg": { fontSize: 25 },
                  }}
                >
                  {step.icon}
                </Box>
                <Typography sx={{ color: "rgba(255,255,255,.38)", fontSize: "1.5rem", fontWeight: 800 }}>
                  0{index + 1}
                </Typography>
              </Stack>
              <Typography
                variant="h6"
                color="#fff"
                fontWeight={750}
                sx={{
                  fontSize: { xs: "1rem", sm: "1.05rem" },
                  mb: 1,
                }}
              >
                {step.title}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,.72)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                {step.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Button
        component={RouterLink}
        to="/apply-now"
        variant="contained"
        endIcon={<ArrowForward />}
        sx={{
          mt: 5,
          px: 3.5,
          py: 1.35,
          borderRadius: 99,
          color: "#fff",
          bgcolor: "#f46b12",
          fontWeight: 750,
          textTransform: "none",
          boxShadow: "0 10px 24px rgba(244,107,18,.24)",
          "&:hover": { bgcolor: "#dc5907" },
        }}
      >
        {lang === "en" ? "Start your application" : "လျှောက်လွှာ စတင်ရန်"}
      </Button>
      </Container>
    </SectionWrapper>
  );
};

export default HowToApplyLoan;
