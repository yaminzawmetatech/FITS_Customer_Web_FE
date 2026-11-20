import {
  ArrowForward,
  CalculateOutlined,
  ChatBubbleOutline,
  FactCheckOutlined,
} from "@mui/icons-material";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MarketingPageHero from "../../components/marketing/MarketingPageHero";

const ContactUs = () => {
  const lang = useSelector((state) => state.language.lang);
  const isEnglish = lang === "en";
  const options = isEnglish
    ? [
        {
          icon: <ChatBubbleOutline />,
          title: "Find an answer",
          detail: "Browse common questions about our services and process.",
          action: "Visit the help center",
          to: "/faq",
        },
        {
          icon: <CalculateOutlined />,
          title: "Plan with confidence",
          detail: "Estimate a payment and compare the numbers for yourself.",
          action: "Open the calculator",
          to: "/loan-calculator",
        },
        {
          icon: <FactCheckOutlined />,
          title: "Understand the process",
          detail: "Review the application journey before you begin.",
          action: "Start an application",
          to: "/apply-now",
        },
      ]
    : [
        {
          icon: <ChatBubbleOutline />,
          title: "အဖြေရှာဖွေရန်",
          detail: "ဝန်ဆောင်မှုများနှင့် လုပ်ငန်းစဉ်ဆိုင်ရာ မေးခွန်းများကို လေ့လာပါ။",
          action: "အကူအညီစင်တာ",
          to: "/faq",
        },
        {
          icon: <CalculateOutlined />,
          title: "ယုံကြည်မှုဖြင့် စီစဉ်ရန်",
          detail: "ပေးချေမှုကို ခန့်မှန်းပြီး ကိန်းဂဏန်းများကို နှိုင်းယှဉ်ပါ။",
          action: "တွက်ချက်စက်ဖွင့်ရန်",
          to: "/loan-calculator",
        },
        {
          icon: <FactCheckOutlined />,
          title: "လုပ်ငန်းစဉ်ကို သိရှိရန်",
          detail: "မစတင်မီ လျှောက်ထားမှုအဆင့်များကို လေ့လာပါ။",
          action: "လျှောက်လွှာစတင်ရန်",
          to: "/apply-now",
        },
      ];

  return (
    <Box component="main" sx={{ minHeight: "65vh", bgcolor: "#f4f6f9" }}>
      <MarketingPageHero
        eyebrow={isEnglish ? "Contact & support" : "ဆက်သွယ်ရန်နှင့် အကူအညီ"}
        title={
          isEnglish
            ? "Choose the right way to get started."
            : "စတင်ရန် သင့်တော်သောနည်းလမ်းကို ရွေးချယ်ပါ။"
        }
        description={
          isEnglish
            ? "Explore these self-service options for information about FITS Finance services, estimates and applications."
            : "FITS Finance ဝန်ဆောင်မှုများ၊ ခန့်မှန်းတွက်ချက်မှုများနှင့် လျှောက်လွှာများအကြောင်း သိရှိရန် ဤရွေးချယ်စရာများကို အသုံးပြုပါ။"
        }
      />
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={2.5}>
          {options.map((option, index) => (
            <Grid item xs={12} md={4} key={option.to}>
              <Box
                sx={{
                  height: "100%",
                  minHeight: 250,
                  p: { xs: 3, md: 3.5 },
                  borderRadius: 4,
                  bgcolor: index === 1 ? "#17365d" : "#fff",
                  color: index === 1 ? "#fff" : "primary.dark",
                  border: index === 1 ? "none" : "1px solid #e4e9ef",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  boxShadow: "0 14px 36px rgba(23,54,93,.055)",
                  transition: "transform .2s ease, box-shadow .2s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 20px 40px rgba(23,54,93,.12)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 48,
                    height: 48,
                    borderRadius: "16px",
                    bgcolor: index === 1 ? "rgba(255,154,77,.16)" : "secondary.lighter",
                    color: index === 1 ? "#ff9a4d" : "secondary.dark",
                  }}
                >
                  {option.icon}
                </Box>
                <Typography sx={{ mt: 2, fontWeight: 750, fontSize: "1.16rem" }}>
                  {option.title}
                </Typography>
                <Typography
                  sx={{
                    mt: 0.75,
                    color: index === 1 ? "rgba(255,255,255,.7)" : "text.secondary",
                    lineHeight: 1.7,
                    fontSize: "0.9rem",
                  }}
                >
                  {option.detail}
                </Typography>
                <Button
                  component={Link}
                  to={option.to}
                  endIcon={<ArrowForward />}
                  sx={{
                    mt: "auto",
                    pt: 2,
                    pl: 0,
                    color: index === 1 ? "#ff9a4d" : "secondary.dark",
                    fontWeight: 700,
                  }}
                >
                  {option.action}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 4, color: "text.secondary", textAlign: "center" }}
        >
          <Typography>
            {isEnglish
              ? "Looking for contact details? Use the information provided by your FITS Finance representative."
              : "ဆက်သွယ်ရန်အချက်အလက်များအတွက် FITS Finance ကိုယ်စားလှယ်ထံမှ ရရှိထားသော အချက်အလက်များကို အသုံးပြုပါ။"}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default ContactUs;
