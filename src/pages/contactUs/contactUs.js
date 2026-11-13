import { ArrowForward, CalculateOutlined, ChatBubbleOutline, FactCheckOutlined } from "@mui/icons-material";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import serviceIllustration from "../../assets/images/fits-services.svg";

const ContactUs = () => {
  const lang = useSelector((state) => state.language.lang);
  const isEnglish = lang === "en";
  const options = isEnglish
    ? [
        { icon: <ChatBubbleOutline />, title: "Get an answer", detail: "Find quick answers to common questions.", action: "Browse FAQs", to: "/faq" },
        { icon: <CalculateOutlined />, title: "Explore the numbers", detail: "Try a simple calculation as you compare options.", action: "Open calculator", to: "/loan-calculator" },
        { icon: <FactCheckOutlined />, title: "Learn how it works", detail: "See what to expect before you get started.", action: "How to apply", to: "/apply-now" },
      ]
    : [
        { icon: <ChatBubbleOutline />, title: "အဖြေရှာဖွေရန်", detail: "မေးလေ့ရှိသော မေးခွန်းများကို လေ့လာပါ။", action: "မေးခွန်းများ", to: "/faq" },
        { icon: <CalculateOutlined />, title: "တွက်ချက်ကြည့်ရန်", detail: "ရွေးချယ်စရာများကို နှိုင်းယှဉ်ရင်း တွက်ချက်ကြည့်ပါ။", action: "တွက်ချက်ရန်", to: "/loan-calculator" },
        { icon: <FactCheckOutlined />, title: "လုပ်ငန်းစဉ် လေ့လာရန်", detail: "စတင်မလျှောက်ထားမီ သိထားရမည့်အရာများကို လေ့လာပါ။", action: "လျှောက်ထားပုံ", to: "/apply-now" },
      ];

  return (
    <Box component="main" sx={{ minHeight: "65vh", bgcolor: "#f4f6f9", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid item xs={12} md={7}>
            <Stack spacing={2.5} sx={{ maxWidth: 690 }}>
              <Typography sx={{ color: "primary.main", fontSize: "0.74rem", fontWeight: 800, letterSpacing: ".17em" }}>
                {isEnglish ? "LET'S TALK ABOUT WHAT'S NEXT" : "သင့်နောက်တစ်ဆင့်အကြောင်း ဆွေးနွေးရန်"}
              </Typography>
              <Typography component="h1" sx={{ color: "primary.dark", fontWeight: 800, letterSpacing: "-.06em", lineHeight: 1.08, fontSize: { xs: "2.7rem", sm: "3.5rem", lg: "4.15rem" } }}>
                {isEnglish ? "A good next step starts with a good question." : "ကောင်းမွန်တဲ့ နောက်တစ်ဆင့်က မေးခွန်းကောင်းတစ်ခုကနေ စတင်ပါတယ်။"}
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.8, maxWidth: 540 }}>
                {isEnglish
                  ? "Whether you're comparing options or ready to begin, start with the path that feels right for you."
                  : "ရွေးချယ်စရာများကို နှိုင်းယှဉ်နေသည်ဖြစ်စေ၊ စတင်ရန် အသင့်ဖြစ်သည်ဖြစ်စေ သင့်အတွက် သင့်လျော်သော လမ်းကြောင်းကို ရွေးချယ်လိုက်ပါ။"}
              </Typography>
              <Button component={Link} to="/faq" endIcon={<ArrowForward />} variant="contained" sx={{ alignSelf: "flex-start", mt: 0.5, px: 2.75, py: 1.3, borderRadius: 3 }}>
                {isEnglish ? "Find an answer" : "အဖြေရှာရန်"}
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Box component="img" src={serviceIllustration} alt="" sx={{ display: "block", width: "100%", maxWidth: 480, mx: "auto" }} />
          </Grid>
        </Grid>
        <Grid container spacing={2.5} sx={{ mt: { xs: 3, md: 6 } }}>
          {options.map((option, index) => (
            <Grid item xs={12} md={4} key={option.to}>
              <Box sx={{ height: "100%", minHeight: 225, p: { xs: 3, md: 3.5 }, borderRadius: 4, bgcolor: index === 1 ? "#17365d" : "#fff", color: index === 1 ? "#fff" : "primary.dark", border: index === 1 ? "none" : "1px solid #e4e9ef", display: "flex", flexDirection: "column", alignItems: "flex-start", transition: "transform .2s ease, box-shadow .2s ease", "&:hover": { transform: "translateY(-5px)", boxShadow: "0 18px 34px rgba(23,54,93,.1)" } }}>
                <Box sx={{ display: "grid", placeItems: "center", width: 48, height: 48, borderRadius: "16px", bgcolor: index === 1 ? "rgba(255,154,77,.16)" : "secondary.lighter", color: index === 1 ? "#ff9a4d" : "secondary.dark" }}>
                  {option.icon}
                </Box>
                <Typography sx={{ mt: 2, fontWeight: 750, fontSize: "1.16rem" }}>{option.title}</Typography>
                <Typography sx={{ mt: 0.75, color: index === 1 ? "rgba(255,255,255,.7)" : "text.secondary", lineHeight: 1.65, fontSize: "0.9rem" }}>{option.detail}</Typography>
                <Button component={Link} to={option.to} endIcon={<ArrowForward />} sx={{ mt: "auto", pt: 2, pl: 0, color: index === 1 ? "#ff9a4d" : "secondary.dark", fontWeight: 700 }}>
                  {option.action}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;
