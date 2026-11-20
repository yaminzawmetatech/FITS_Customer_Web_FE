import { ArrowForward, CheckCircleOutline } from "@mui/icons-material";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MarketingPageHero from "../../components/marketing/MarketingPageHero";
import aboutUsIllustration from "../../assets/images/fits-services.svg";
import CompanyInfoCardAboutUs from "./companyInfoCardAboutUs";
import FirstService from "./component/FirstService";
import HowToApplyLoan from "../howToApplyLoan/HowToApplyLoan";

const AboutUsPage = () => {
  const lang = useSelector((state) => state.language.lang);
  const isEnglish = lang === "en";

  return (
    <Box component="main" sx={{ bgcolor: "#fff" }}>
      <MarketingPageHero
        eyebrow={isEnglish ? "About FITS Finance" : "FITS Finance အကြောင်း"}
        title={
          isEnglish
            ? "Finance information, made clearer."
            : "ငွေကြေးဆိုင်ရာ အချက်အလက်များကို ပိုမိုရှင်းလင်းစွာ။"
        }
        description={
          isEnglish
            ? "We bring service information, planning tools and application guidance together to help you explore your next step."
            : "သင့်နောက်တစ်ဆင့်ကို လေ့လာနိုင်ရန် ဝန်ဆောင်မှုအချက်အလက်များ၊ စီစဉ်တွက်ချက်မှုကိရိယာများနှင့် လျှောက်ထားမှုလမ်းညွှန်ချက်များကို တစ်နေရာတည်းတွင် စုစည်းထားပါသည်။"
        }
      >
        <Button
          component={Link}
          to="/our-services"
          variant="contained"
          color="secondary"
          endIcon={<ArrowForward />}
          sx={{ alignSelf: "flex-start", mt: 1, px: 2.5, py: 1.25, borderRadius: 3 }}
        >
          {isEnglish ? "Explore our services" : "ဝန်ဆောင်မှုများကို လေ့လာရန်"}
        </Button>
      </MarketingPageHero>

      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 2, sm: 4 },
                borderRadius: { xs: 4, md: 6 },
                bgcolor: "#f4f6f9",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: 110,
                  height: 110,
                  right: { xs: 10, md: 24 },
                  top: { xs: 10, md: 24 },
                  borderRadius: "50%",
                  bgcolor: "rgba(244,107,18,.12)",
                },
              }}
            >
              <Box
                component="img"
                src={aboutUsIllustration}
                alt={
                  isEnglish
                    ? "FITS Finance planning illustration"
                    : "FITS Finance အစီအစဉ်ရေးဆွဲမှု သရုပ်ဖော်ပုံ"
                }
                sx={{
                  position: "relative",
                  display: "block",
                  width: "100%",
                  maxHeight: 390,
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={2.25}>
              <Typography
                sx={{
                  color: "secondary.dark",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                }}
              >
                {isEnglish ? "Who we are" : "ကျွန်ုပ်တို့အကြောင်း"}
              </Typography>
              <Typography
                component="h2"
                sx={{
                  color: "primary.dark",
                  fontSize: { xs: "2rem", md: "2.8rem" },
                  fontWeight: 800,
                  lineHeight: 1.12,
                  letterSpacing: "-.05em",
                }}
              >
                {isEnglish
                  ? "A more considered way to explore financing."
                  : "ငွေကြေးဝန်ဆောင်မှုများကို သေချာစွာ လေ့လာနိုင်မည့် နည်းလမ်း။"}
              </Typography>
              <Typography sx={{ color: "text.secondary", lineHeight: 1.85 }}>
                {isEnglish
                  ? "FITS Finance helps bring the details into focus. Explore the information available, use the planning tools and review the application steps before deciding what works for you."
                  : "FITS Finance သည် လိုအပ်သောအချက်အလက်များကို ရှင်းလင်းစွာ လေ့လာနိုင်ရန် ကူညီပေးပါသည်။ မိမိအတွက် သင့်တော်သောရွေးချယ်မှုကို မဆုံးဖြတ်မီ ဝန်ဆောင်မှုအချက်အလက်များ၊ တွက်ချက်မှုကိရိယာများနှင့် လျှောက်ထားမှုအဆင့်များကို လေ့လာနိုင်ပါသည်။"}
              </Typography>
              <Stack spacing={1}>
                {[
                  isEnglish ? "Explore service information" : "ဝန်ဆောင်မှုအချက်အလက်များကို လေ့လာပါ",
                  isEnglish ? "Plan with clear estimates" : "ရှင်းလင်းသော ခန့်မှန်းချက်များဖြင့် စီစဉ်ပါ",
                  isEnglish ? "Understand each application step" : "လျှောက်ထားမှုအဆင့်များကို နားလည်ပါ",
                ].map((item) => (
                  <Stack key={item} direction="row" spacing={1} alignItems="center">
                    <CheckCircleOutline sx={{ color: "secondary.main", fontSize: 20 }} />
                    <Typography sx={{ color: "primary.dark", fontWeight: 650 }}>
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Button
                component={Link}
                to="/loan-calculator"
                variant="outlined"
                endIcon={<ArrowForward />}
                sx={{ alignSelf: "flex-start", mt: 1, borderRadius: 3, px: 2.25, py: 1.1 }}
              >
                {isEnglish ? "Try the payment planner" : "အရစ်ကျတွက်ချက်ရန်"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <CompanyInfoCardAboutUs />
      <FirstService />
      <HowToApplyLoan />
    </Box>
  );
};

export default AboutUsPage;
