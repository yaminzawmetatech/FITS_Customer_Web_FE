import Routes from "./routes";
import ThemeCustomization from "./themes";
import ScrollTop from "./components/ScrollTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const App = () => {
  const lang = useSelector((state) => state.language.lang);

  return (
    <ThemeCustomization>
      <ToastContainer />
      <Box
        role="status"
        sx={{
          px: 2,
          py: 0.75,
          textAlign: "center",
          color: "#633b00",
          bgcolor: "#fff2cc",
          borderBottom: "1px solid #f1d99b",
        }}
      >
        <Typography sx={{ fontSize: "0.78rem", fontWeight: 650 }}>
          {lang === "en"
            ? "DEMO MODE — Do not enter real personal or financial information. Changes stay in this browser only."
            : "သရုပ်ပြမုဒ် — ကိုယ်ရေးကိုယ်တာ သို့မဟုတ် ငွေကြေးဆိုင်ရာ အချက်အလက်အစစ်များ မထည့်ပါနှင့်။ ပြောင်းလဲမှုများသည် ဤ browser ထဲတွင်သာ ရှိမည်။"}
        </Typography>
      </Box>
      <ScrollTop>
        <Suspense
          fallback={
            <Box
              sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          }
        >
          <Routes />
        </Suspense>
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
