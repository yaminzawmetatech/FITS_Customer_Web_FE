import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  styled,
  Container,
  Stack,
  Card,
  CardContent,
  CardActionArea,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ArrowForward, CalculateOutlined, ExploreOutlined, FactCheckOutlined } from "@mui/icons-material";
import serviceIllustration from "../../assets/images/fits-services.svg";
import { getOurServices } from "../../features/customerUser/ourService/ourServiceSlice";
import { Link } from "react-router-dom";
import MarketingPageHero from "../../components/marketing/MarketingPageHero";

// Styled components
const SectionWrapper = styled(Box)(() => ({
  backgroundColor: "#f4f6f9",
  paddingTop: 88,
  paddingBottom: 88,
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
}));

const IconImage = styled("img")({
  width: 42,
  height: 42,
  borderRadius: "14px",
  marginRight: 10,
  objectFit: "cover",
});

const LoanServices = ({ standalone = false }) => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);
  const { ourServices = [], isLoading, isError } = useSelector(
    (state) => state.userOurServices
  );

  useEffect(() => {
    if (standalone) {
      dispatch(getOurServices());
    }
  }, [dispatch, standalone]);

  const homeOptions = [
    {
      icon: <ExploreOutlined />,
      title: lang === "en" ? "Explore your options" : "ရွေးချယ်စရာများကို လေ့လာပါ",
      description:
        lang === "en"
          ? "Discover financing services and find a path that fits your plans."
          : "ငွေကြေးဝန်ဆောင်မှုများကို လေ့လာပြီး သင့်အစီအစဉ်နှင့် ကိုက်ညီမည့်လမ်းကို ရှာဖွေပါ။",
      link: "/our-services",
      action: lang === "en" ? "View services" : "ဝန်ဆောင်မှုများ ကြည့်ရန်",
    },
    {
      icon: <CalculateOutlined />,
      title: lang === "en" ? "Plan with clarity" : "ရှင်းလင်းစွာ စီစဉ်ပါ",
      description:
        lang === "en"
          ? "Use the payment planner to explore an estimated repayment plan."
          : "ခန့်မှန်းပေးချေမှုအစီအစဉ်ကို အရစ်ကျတွက်ချက်ကိရိယာဖြင့် လေ့လာပါ။",
      link: "/loan-calculator",
      action: lang === "en" ? "Plan payments" : "အရစ်ကျတွက်ချက်ရန်",
    },
    {
      icon: <FactCheckOutlined />,
      title: lang === "en" ? "Take the next step" : "နောက်တစ်ဆင့်ကို စတင်ပါ",
      description:
        lang === "en"
          ? "See what to prepare and begin your application when you're ready."
          : "လျှောက်ထားရန် ပြင်ဆင်ရမည့်အရာများကို ကြည့်ပြီး အဆင်သင့်ဖြစ်ချိန်တွင် စတင်ပါ။",
      link: "/apply-now",
      action: lang === "en" ? "Get started" : "စတင်ရန်",
    },
  ];

  return (
    <>
      {standalone && (
        <MarketingPageHero
          eyebrow={lang === "en" ? "FITS services" : "FITS ဝန်ဆောင်မှုများ"}
          title={
            lang === "en"
              ? "Explore the options available to you."
              : "သင့်အတွက် ရရှိနိုင်သော ရွေးချယ်စရာများကို လေ့လာပါ။"
          }
          description={
            lang === "en"
              ? "Review the service information below, then use the payment planner or application guide to decide what to do next."
              : "အောက်ပါဝန်ဆောင်မှုအချက်အလက်များကို လေ့လာပြီးနောက် အရစ်ကျတွက်ချက်မှု သို့မဟုတ် လျှောက်ထားမှုလမ်းညွှန်ကို အသုံးပြု၍ နောက်တစ်ဆင့်ကို ဆုံးဖြတ်ပါ။"
          }
        />
      )}
      <SectionWrapper>
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ mb: 5, maxWidth: 700 }}>
          <Typography sx={{ color: "primary.main", fontSize: "0.74rem", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase" }}>
            {standalone
              ? lang === "en" ? "Explore your options" : "ရွေးချယ်စရာများကို လေ့လာရန်"
              : lang === "en" ? "A clearer way forward" : "ရှေ့ဆက်ရန် ပိုမိုရှင်းလင်းသော လမ်းကြောင်း"}
          </Typography>
          <Typography variant="h3" sx={{ mt: 1, color: "primary.dark", fontWeight: 800, letterSpacing: "-.055em", lineHeight: 1.15 }}>
            {standalone
              ? lang === "en"
                ? "Financing services"
                : "ငွေကြေးဝန်ဆောင်မှုများ"
              : lang === "en"
                ? "Make your next move with confidence."
                : "ယုံကြည်မှုဖြင့် နောက်တစ်ဆင့်ကို စတင်ပါ။"}
          </Typography>
          {!standalone && (
            <Typography sx={{ mt: 2, color: "text.secondary", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.8 }}>
              {lang === "en"
                ? "Explore your options, plan ahead and move forward at a pace that feels right for you."
                : "ရွေးချယ်စရာများကို လေ့လာပါ၊ ကြိုတင်စီစဉ်ပါ၊ သင့်အတွက် အဆင်ပြေသည့်အရှိန်ဖြင့် ရှေ့ဆက်ပါ။"}
            </Typography>
          )}
        </Box>

<Grid
  container
  spacing={4}
  alignItems="flex-start"
  justifyContent="center"
  sx={{ mb: 4 }}
>
  {/* Left Side - Products */}
  <Grid item xs={12} md={6}>
    {!standalone ? (
      <Stack spacing={2}>
        {homeOptions.map((option, index) => (
          <Card
            key={option.title}
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid rgba(23,54,93,.09)",
              background: "rgba(255,255,255,.92)",
              transition: "transform .2s ease, box-shadow .2s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 14px 32px rgba(23,54,93,.09)",
              },
            }}
          >
            <CardActionArea component={Link} to={option.link} sx={{ p: 0.5 }}>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, p: 2.25, "&:last-child": { pb: 2.25 } }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 3,
                    color: index === 1 ? "#e76513" : "#17365d",
                    bgcolor: index === 1 ? "#fff0e4" : "#edf3fb",
                    "& svg": { fontSize: 27 },
                  }}
                >
                  {option.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ color: "primary.dark", fontWeight: 750, fontSize: "1.02rem" }}>
                    {option.title}
                  </Typography>
                  <Typography sx={{ mt: 0.45, color: "text.secondary", fontSize: "0.88rem", lineHeight: 1.65 }}>
                    {option.description}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.5,
                      color: "primary.main",
                      fontSize: "0.85rem",
                      fontWeight: 750,
                    }}
                  >
                    {option.action}
                    <ArrowForward sx={{ fontSize: 16 }} />
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    ) : (
    <Grid container spacing={2}>
      {isLoading ? (
        <Grid item xs={12}>
          <Typography role="status" sx={{ color: "text.secondary", p: 2 }}>
            {lang === "en" ? "Loading services…" : "ဝန်ဆောင်မှုများ ရယူနေသည်…"}
          </Typography>
        </Grid>
      ) : isError ? (
        <Grid item xs={12}>
          <Alert severity="error">
            {lang === "en"
              ? "We couldn't load the service information. Please try again later."
              : "ဝန်ဆောင်မှုအချက်အလက်များကို ယခုမရယူနိုင်ပါ။ နောက်မှ ထပ်မံကြိုးစားပါ။"}
          </Alert>
        </Grid>
      ) : ourServices.length === 0 ? (
        <Grid item xs={12}>
          <Typography sx={{ color: "text.secondary", p: 2 }}>
            {lang === "en"
              ? "There are no services to show right now."
              : "ယခုဖော်ပြရန် ဝန်ဆောင်မှုများ မရှိသေးပါ။"}
          </Typography>
        </Grid>
      ) : ourServices.map((item, index) => (
        <Grid
          item
          key={index}
          xs={12}
          sm={6}
          md={8}
          lg={12}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: "16px",
            borderRadius: 3,
            backgroundColor: "#fff",
            border: "1px solid rgba(23,54,93,.08)",
            boxShadow: "0 6px 20px rgba(23,54,93,.04)",
            transition: "all 0.3s",
            "&:hover": {
              backgroundColor: "#fff8f1",
              borderColor: "secondary.light",
              transform: "translateY(-3px)",
            },
          }}
        >
          <IconImage src={item.image} alt={item[`title_${lang}`]} />
          <Typography
            sx={{
              fontSize: "0.94rem",
              fontWeight: 650,
              color: "primary.dark",
            }}
          >
            {item[`title_${lang}`]}
          </Typography>
        </Grid>
      ))}
    </Grid>
    )}
  </Grid>

  {/* Right Side - Original FITS artwork */}
  <Grid
    item
    xs={12}
    md={6}
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Box sx={{ width: "100%" }}>
      <img
        src={serviceIllustration}
        alt="Illustration of a clear financial plan"
        style={{
          width: "100%",
          maxHeight: 380,
          objectFit: "contain",
        }}
      />
    </Box>
  </Grid>
</Grid>


        {/* Call to Action */}
        {standalone && <Box textAlign="center" mt={4}>
          <Typography
            variant="body1"
            fontWeight={500}
            fontSize={"1.2rem"}
            color="primary.dark"
            mb={3}
          >
            {lang === "en" ? "Want to apply loan?" : "ချေးငွေလျှောက်မည်"}
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              borderRadius: 3,
              px: 4,
              py: 1,
              textTransform: "none",
              fontWeight: 700,
              "&:hover": { backgroundColor: "primary.dark" },
            }}
            to="/apply-now"
            component={Link}
          >
            {lang === "en" ? "Start an application" : "လျှောက်လွှာစတင်ရန်"}
          </Button>
        </Box>}
      </Container>
      </SectionWrapper>
    </>
  );
};

export default LoanServices;
