import { useEffect, useState } from "react";
import {
  Add,
  ArrowForward,
  ChatBubbleOutline,
  Remove,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MarketingPageHero from "../../components/marketing/MarketingPageHero";
import { getFAQQuestions } from "../../features/customerUser/faqQuestion/faqQuestionSlice";

const FaqPage = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);
  const { faqQuestions = [], isLoading, isError } = useSelector(
    (state) => state.faqQuestion
  );
  const [expanded, setExpanded] = useState(false);
  const isEnglish = lang === "en";

  useEffect(() => {
    dispatch(getFAQQuestions());
  }, [dispatch]);

  return (
    <Box component="main" sx={{ bgcolor: "#f4f6f9", minHeight: "65vh" }}>
      <MarketingPageHero
        eyebrow={isEnglish ? "Help center" : "အကူအညီစင်တာ"}
        title={
          isEnglish
            ? "Answers for your next step."
            : "သင့်နောက်တစ်ဆင့်အတွက် အဖြေများ။"
        }
        description={
          isEnglish
            ? "Browse common questions about FITS Finance services and the application process."
            : "FITS Finance ဝန်ဆောင်မှုများနှင့် လျှောက်ထားမှုလုပ်ငန်းစဉ်ဆိုင်ရာ မေးလေ့ရှိသော မေးခွန်းများကို လေ့လာပါ။"
        }
      />

      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={{ xs: 3, md: 5 }} alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 4,
                bgcolor: "#fff",
                border: "1px solid #e4e9ef",
                boxShadow: "0 14px 36px rgba(23,54,93,.055)",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: 52,
                  height: 52,
                  borderRadius: 3,
                  color: "secondary.dark",
                  bgcolor: "secondary.lighter",
                }}
              >
                <ChatBubbleOutline />
              </Box>
              <Typography
                component="h2"
                sx={{
                  mt: 2.5,
                  color: "primary.dark",
                  fontSize: { xs: "1.5rem", md: "1.8rem" },
                  fontWeight: 800,
                  letterSpacing: "-.04em",
                }}
              >
                {isEnglish ? "Need more help?" : "ထပ်မံအကူအညီလိုပါသလား။"}
              </Typography>
              <Typography sx={{ mt: 1, color: "text.secondary", lineHeight: 1.75 }}>
                {isEnglish
                  ? "If you cannot find what you are looking for, explore the available ways to get started."
                  : "ရှာဖွေနေသောအကြောင်းအရာကို မတွေ့ပါက စတင်လေ့လာနိုင်မည့် နည်းလမ်းများကို ကြည့်ရှုပါ။"}
              </Typography>
              <Stack spacing={1.25} sx={{ mt: 3 }}>
                <Button
                  component={Link}
                  to="/contact"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{ justifyContent: "space-between", borderRadius: 2.5, py: 1.25 }}
                >
                  {isEnglish ? "Explore help options" : "အကူအညီရွေးချယ်စရာများ"}
                </Button>
                <Button
                  component={Link}
                  to="/apply-now"
                  variant="outlined"
                  sx={{ borderRadius: 2.5, py: 1.15 }}
                >
                  {isEnglish ? "Start an application" : "လျှောက်လွှာစတင်ရန်"}
                </Button>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack spacing={1.5}>
              {isError && (
                <Alert severity="error">
                  {isEnglish
                    ? "We couldn't load the questions. Please try again later."
                    : "မေးခွန်းများကို ယခုမရယူနိုင်ပါ။ နောက်မှ ထပ်မံကြိုးစားပါ။"}
                </Alert>
              )}
              {isLoading && (
                <Typography role="status" sx={{ color: "text.secondary", py: 2 }}>
                  {isEnglish ? "Loading questions…" : "မေးခွန်းများ ရယူနေသည်…"}
                </Typography>
              )}
              {!isLoading && !isError && faqQuestions.length === 0 && (
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    bgcolor: "#fff",
                    border: "1px solid #e4e9ef",
                  }}
                >
                  <Typography sx={{ color: "text.secondary" }}>
                    {isEnglish
                      ? "There are no questions to show right now."
                      : "ယခုဖော်ပြရန် မေးခွန်းများ မရှိသေးပါ။"}
                  </Typography>
                </Box>
              )}
              {faqQuestions.map((item, index) => {
                const panel = `faq-${item.id || item._id || index}`;
                const answers = Array.isArray(item.answers) ? item.answers : [];

                return (
                  <Accordion
                    key={panel}
                    expanded={expanded === panel}
                    onChange={(_, open) => setExpanded(open ? panel : false)}
                    disableGutters
                    elevation={0}
                    sx={{
                      overflow: "hidden",
                      border: "1px solid #e4e9ef",
                      borderRadius: "16px !important",
                      "&::before": { display: "none" },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <Box
                          sx={{
                            display: "grid",
                            placeItems: "center",
                            width: 30,
                            height: 30,
                            borderRadius: 2,
                            color: "secondary.dark",
                            bgcolor: "secondary.lighter",
                          }}
                        >
                          {expanded === panel ? <Remove /> : <Add />}
                        </Box>
                      }
                      sx={{
                        px: { xs: 2, sm: 3 },
                        py: 1,
                        bgcolor: "#fff",
                        "& .MuiAccordionSummary-content": { my: 1.5 },
                      }}
                    >
                      <Typography sx={{ color: "primary.dark", fontWeight: 700 }}>
                        {item[`question_${lang}`] || item.question_en || item.question_mm}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        px: { xs: 2, sm: 3 },
                        py: 2.5,
                        borderTop: "1px solid #e9edf2",
                        bgcolor: "#fbfcfe",
                      }}
                    >
                      <Stack spacing={1.5}>
                        {answers.map((answer, answerIndex) => (
                          <Typography
                            key={answer.id || answer._id || answerIndex}
                            sx={{ color: "text.secondary", lineHeight: 1.75 }}
                          >
                            {answer[`answer_${lang}`] || answer.answer_en || answer.answer_mm}
                          </Typography>
                        ))}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FaqPage;
