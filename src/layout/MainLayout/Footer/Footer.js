import { ArrowOutward, East } from "@mui/icons-material";
import { Box, Button, Container, Grid, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../../../components/Logo/Logo";

const Footer = () => {
  const lang = useSelector((state) => state.language.lang);
  const isEnglish = lang === "en";
  const groups = [
    {
      title: isEnglish ? "Explore" : "လေ့လာရန်",
      links: [
        { label: isEnglish ? "Welcome" : "မူလစာမျက်နှာ", to: "/" },
        { label: isEnglish ? "About FITS" : "FITS အကြောင်း", to: "/about-us" },
        { label: isEnglish ? "Financing" : "ငွေကြေးဝန်ဆောင်မှုများ", to: "/our-services" },
      ],
    },
    {
      title: isEnglish ? "Next steps" : "နောက်တစ်ဆင့်များ",
      links: [
        { label: isEnglish ? "Payment planner" : "အရစ်ကျတွက်ချက်ရန်", to: "/loan-calculator" },
        { label: isEnglish ? "Application guide" : "လျှောက်ထားပုံ", to: "/apply-now" },
        { label: isEnglish ? "Help center" : "အကူအညီနှင့် မေးခွန်းများ", to: "/faq" },
      ],
    },
  ];

  return (
    <Box component="footer" sx={{ bgcolor: "#122b49", color: "#fff" }}>
      <Container maxWidth="xl" sx={{ pt: { xs: 6, md: 8 }, pb: 3 }}>
        <Grid container spacing={{ xs: 4, md: 5 }} sx={{ pb: { xs: 5, md: 7 } }}>
          <Grid item xs={12} md={5}>
            <Box component={RouterLink} to="/" sx={{ display: "inline-flex", width: "min(100%, 290px)", p: 1.25, bgcolor: "#fff", borderRadius: 2, textDecoration: "none", mb: 2 }}>
              <Logo width={260} />
            </Box>
            <Typography sx={{ maxWidth: 350, color: "rgba(255,255,255,.66)", lineHeight: 1.8 }}>
              {isEnglish
                ? "Thoughtful financing for the plans, people and possibilities that matter to you."
                : "သင့်အတွက် အရေးပါတဲ့ ရည်မှန်းချက်များနှင့် အနာဂတ်အစီအစဉ်များကို ပံ့ပိုးပေးမည့် ငွေကြေးဝန်ဆောင်မှုများ။"}
            </Typography>
            <Button
              component={RouterLink}
              to="/contact"
              endIcon={<ArrowOutward />}
              sx={{
                mt: 2.5,
                px: 0,
                color: "#ff9a4d",
                fontWeight: 700,
                "&:hover": { bgcolor: "transparent", color: "#d8f6aa" },
              }}
            >
              {isEnglish ? "Find your next step" : "နောက်တစ်ဆင့်ကို ရှာဖွေရန်"}
            </Button>
          </Grid>
          {groups.map((group) => (
            <Grid item xs={6} md={2.5} key={group.title}>
              <Typography sx={{ mb: 1.75, color: "#ff9a4d", fontSize: "0.78rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase" }}>
                {group.title}
              </Typography>
              <Stack spacing={1.2}>
                {group.links.map((item) => (
                  <Link
                    key={item.to}
                    component={RouterLink}
                    to={item.to}
                    underline="none"
                    sx={{ color: "rgba(255,255,255,.75)", fontSize: "0.92rem", "&:hover": { color: "#fff" } }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
          <Grid item xs={12} md={2}>
            <Box sx={{ p: 2.5, border: "1px solid rgba(255,255,255,.14)", borderRadius: 4, bgcolor: "rgba(255,255,255,.05)" }}>
              <Typography sx={{ mb: 0.75, fontWeight: 700 }}>
                {isEnglish ? "Ready when you are." : "သင်စတင်ချင်တဲ့အခါ အသင့်ရှိပါတယ်။"}
              </Typography>
              <Typography sx={{ mb: 1.5, color: "rgba(255,255,255,.62)", fontSize: "0.82rem", lineHeight: 1.6 }}>
                {isEnglish ? "Take the first step at your own pace." : "သင့်အဆင်ပြေတဲ့ အချိန်မှာ စတင်လေ့လာနိုင်ပါတယ်။"}
              </Typography>
              <Button
                component={RouterLink}
                to="/apply-now"
                variant="contained"
                endIcon={<East />}
                sx={{ borderRadius: 3, bgcolor: "#f46b12", color: "#fff", "&:hover": { bgcolor: "#df5908" } }}
              >
                {isEnglish ? "Start an application" : "လျှောက်လွှာ စတင်ရန်"}
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2.5,
            borderTop: "1px solid rgba(255,255,255,.13)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,.55)", fontSize: "0.77rem" }}>
            © {new Date().getFullYear()} FITS Finance. {isEnglish ? "All rights reserved." : "မူပိုင်ခွင့်အားလုံး ထားရှိသည်။"}
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,.42)", fontSize: "0.72rem" }}>
            {isEnglish ? "Clear choices. Confident steps." : "ရှင်းလင်းသော ရွေးချယ်မှုများ။ ယုံကြည်မှုရှိသော ခြေလှမ်းများ။"}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
