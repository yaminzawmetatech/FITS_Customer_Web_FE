import { AutoAwesome, FavoriteBorder, LightbulbOutlined, SupportAgent } from "@mui/icons-material";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const CompanyInfoCardAboutUs = () => {
  const lang = useSelector((state) => state.language.lang);
  const isEnglish = lang === "en";
  const principles = [
    {
      icon: <LightbulbOutlined />,
      title: isEnglish ? "Clarity" : "ရှင်းလင်းမှု",
      description: isEnglish ? "We make the details easier to understand." : "အချက်အလက်များကို နားလည်ရလွယ်ကူစေပါတယ်။",
    },
    {
      icon: <FavoriteBorder />,
      title: isEnglish ? "Care" : "ဂရုစိုက်မှု",
      description: isEnglish ? "We put people and their plans at the heart of every step." : "လူမှုအသိုင်းအဝိုင်းနှင့် အစီအစဉ်များကို ဦးစားပေးပါတယ်။",
    },
    {
      icon: <AutoAwesome />,
      title: isEnglish ? "Confidence" : "ယုံကြည်မှု",
      description: isEnglish ? "We help you explore your options at your own pace." : "သင့်အဆင်ပြေသည့်နှုန်းဖြင့် ရွေးချယ်စရာများကို လေ့လာနိုင်ရန် ကူညီပါတယ်။",
    },
    {
      icon: <SupportAgent />,
      title: isEnglish ? "Support" : "ပံ့ပိုးမှု",
      description: isEnglish ? "We are here to help you take your next step." : "သင့်နောက်တစ်ဆင့်အတွက် ကူညီပံ့ပိုးပေးပါတယ်။",
    },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: "#17365d", color: "#fff" }}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 7 }} alignItems="center">
          <Grid item xs={12} md={5}>
            <Typography sx={{ color: "#ff9a4d", fontSize: "0.75rem", fontWeight: 800, letterSpacing: ".15em", textTransform: "uppercase" }}>
              {isEnglish ? "What guides us" : "ကျွန်ုပ်တို့၏ လမ်းညွှန်ချက်"}
            </Typography>
            <Typography component="h2" sx={{ mt: 1.5, fontSize: { xs: "2.3rem", md: "3.2rem" }, fontWeight: 800, lineHeight: 1.12, letterSpacing: "-.055em" }}>
              {isEnglish ? "Finance should feel more human." : "လူသားဆန်သော ငွေကြေးဝန်ဆောင်မှု။"}
            </Typography>
            <Typography sx={{ mt: 2, color: "rgba(255,255,255,.68)", lineHeight: 1.85, maxWidth: 475 }}>
              {isEnglish
                ? "Behind every plan is a person. We believe great finance starts by listening, explaining clearly and making space for the things that matter."
                : "အစီအစဉ်တိုင်းရဲ့ နောက်ကွယ်မှာ လူတစ်ယောက်စီ ရှိပါတယ်။ ကောင်းမွန်တဲ့ ငွေကြေးဝန်ဆောင်မှုဟာ နားထောင်ပေးခြင်း၊ ရှင်းလင်းစွာ ပြောပြခြင်းနဲ့ အရေးပါတဲ့အရာတွေအတွက် နေရာဖန်တီးပေးခြင်းကနေ စတင်တယ်လို့ ယုံကြည်ပါတယ်။"}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 3, color: "#ff9a4d" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                {isEnglish ? "A little more thought. A lot more confidence." : "ပိုမိုစဉ်းစားပေးမှု၊ ပိုမိုယုံကြည်မှု။"}
              </Typography>
              <AutoAwesome sx={{ fontSize: 18 }} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {principles.map((item) => (
                <Grid item xs={12} sm={6} key={item.title}>
                  <Box sx={{ height: "100%", minHeight: 164, p: { xs: 2.5, md: 3 }, borderRadius: 4, border: "1px solid rgba(255,255,255,.13)", bgcolor: "rgba(255,255,255,.055)" }}>
                    <Box sx={{ display: "grid", placeItems: "center", width: 43, height: 43, borderRadius: "14px", bgcolor: "rgba(255,154,77,.14)", color: "#ff9a4d" }}>
                      {item.icon}
                    </Box>
                    <Typography sx={{ mt: 2, fontWeight: 750, fontSize: "1rem" }}>{item.title}</Typography>
                    <Typography sx={{ mt: 0.75, color: "rgba(255,255,255,.64)", fontSize: "0.84rem", lineHeight: 1.7 }}>{item.description}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CompanyInfoCardAboutUs;
