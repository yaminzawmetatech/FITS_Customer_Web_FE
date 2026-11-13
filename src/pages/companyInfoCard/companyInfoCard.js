import { ArrowOutward, AutoAwesome, FavoriteBorder, TaskAlt } from "@mui/icons-material";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const CompanyInfoCard = () => {
  const lang = useSelector((state) => state.language.lang);
  const isEnglish = lang === "en";
  const values = [
    {
      icon: <TaskAlt />,
      title: isEnglish ? "Clarity first" : "ရှင်းလင်းမှုကို ဦးစားပေးခြင်း",
      description: isEnglish
        ? "Straightforward information to help you understand your options."
        : "သင့်ရွေးချယ်စရာများကို နားလည်စေရန် ရိုးရှင်းရှင်းလင်းသော အချက်အလက်များ။",
    },
    {
      icon: <AutoAwesome />,
      title: isEnglish ? "Made for real life" : "နေ့စဉ်ဘဝနှင့် ကိုက်ညီခြင်း",
      description: isEnglish
        ? "A more considered way to find the support that fits your plans."
        : "သင့်အစီအစဉ်နှင့် ကိုက်ညီမည့် ပံ့ပိုးမှုကို ရှာဖွေရန် စဉ်းစားပေးထားသော နည်းလမ်း။",
    },
    {
      icon: <FavoriteBorder />,
      title: isEnglish ? "People at the centre" : "လူမှုအသိုင်းအဝိုင်းကို ဦးစားပေးခြင်း",
      description: isEnglish
        ? "A helpful experience that respects your needs and your time."
        : "သင့်လိုအပ်ချက်နှင့် အချိန်ကို လေးစားသော အကူအညီပေးသည့် အတွေ့အကြုံ။",
    },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: "#fff" }}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 7 }} alignItems="center">
          <Grid item xs={12} md={5}>
            <Typography sx={{ color: "primary.main", fontSize: "0.74rem", fontWeight: 800, letterSpacing: ".17em", textTransform: "uppercase" }}>
              {isEnglish ? "A different kind of finance" : "ကွဲပြားသော ငွေကြေးဝန်ဆောင်မှု"}
            </Typography>
            <Typography
              component="h2"
              sx={{
                mt: 1.5,
                color: "primary.dark",
                fontSize: { xs: "2.2rem", sm: "2.8rem" },
                fontWeight: 800,
                lineHeight: 1.13,
                letterSpacing: "-.055em",
              }}
            >
              {isEnglish ? "Good plans deserve a little support." : "ကောင်းမွန်တဲ့ အစီအစဉ်တွေကို ပံ့ပိုးမှုနဲ့အတူ ရှေ့ဆက်ပါ။"}
            </Typography>
            <Typography sx={{ mt: 2, color: "text.secondary", maxWidth: 460, lineHeight: 1.9 }}>
              {isEnglish
                ? "At FITS Finance, we believe choosing financing should feel clear, considered and connected to the life you want to build."
                : "FITS Finance မှာ ငွေကြေးဝန်ဆောင်မှုရွေးချယ်ခြင်းဟာ ရှင်းလင်းပြီး သင်တည်ဆောက်ချင်တဲ့ဘဝနဲ့ ကိုက်ညီသင့်တယ်လို့ ယုံကြည်ပါတယ်။"}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 3, color: "primary.main" }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                {isEnglish ? "Finance, with more thought." : "စဉ်းစားပေးထားသော ငွေကြေးဝန်ဆောင်မှု"}
              </Typography>
              <ArrowOutward sx={{ fontSize: 17 }} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {values.map((value, index) => (
                <Grid item xs={12} sm={4} key={value.title}>
                  <Box
                    sx={{
                      height: "100%",
                      minHeight: 202,
                      p: { xs: 2.5, md: 2.25, lg: 3 },
                      borderRadius: 5,
                      bgcolor: index === 1 ? "#17365d" : "#f4f6f9",
                      color: index === 1 ? "#fff" : "primary.dark",
                      transition: "transform .2s ease, box-shadow .2s ease",
                      "&:hover": { transform: "translateY(-5px)", boxShadow: "0 18px 36px rgba(23,54,93,.10)" },
                    }}
                  >
                    <Box sx={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: "15px", bgcolor: index === 1 ? "rgba(255,255,255,.12)" : "secondary.lighter", color: index === 1 ? "#ff9a4d" : "secondary.dark" }}>
                      {value.icon}
                    </Box>
                    <Typography sx={{ mt: 2.5, fontWeight: 750, fontSize: "1.03rem" }}>{value.title}</Typography>
                    <Typography sx={{ mt: 1, color: index === 1 ? "rgba(255,255,255,.7)" : "text.secondary", fontSize: "0.84rem", lineHeight: 1.7 }}>
                      {value.description}
                    </Typography>
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

export default CompanyInfoCard;
