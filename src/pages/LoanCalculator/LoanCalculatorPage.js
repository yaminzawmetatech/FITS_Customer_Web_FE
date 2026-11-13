import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  Button,
  Container,
  Box,
  Card,
  Grid,
  Chip,
} from "@mui/material";
import CalculateOutlined from "@mui/icons-material/CalculateOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormInputSelect from "../../components/form/FormInputSelect";
import FormInputText from "../../components/form/FormInputText";
import FormInputDecimal from "../../components/form/FormInputDecimal";
import { useDispatch, useSelector } from "react-redux";
import { getDownPaymentWithParams } from "../../features/customerUser/downPaymentSchemeSetup/downPaymentSchemeSetupSlice";
import { getFirstDueDateSetupWithParams } from "../../features/customerUser/firstDueDateSetup/firstDueDateSetupSlice";
import FormInputDatePicker from "../../components/form/FormInputDatePicker";
import dayjs from "dayjs";
import calculatorIllustration from "../../assets/images/fits-services.svg";
import { getProjectCategory } from "../../features/customerUser/projectcategory/projectcategorySlice";
import { showErrorToast } from "../../common/ToastMessage";

// ---------------- MUI THEME ----------------
const theme = createTheme({
  palette: {
    primary: { main: "#17365d", dark: "#102a49" },
    secondary: { main: "#f46b12", dark: "#bd4705" },
    background: { default: "#f4f6f9", paper: "#ffffff" },
    text: { primary: "#17283d", secondary: "#647386" },
    divider: "#e2e8f0",
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: "'Manrope', 'DM Sans', sans-serif" },
});

// ---------------- PMT CALCULATION ----------------
function calculatePMT(loanAmount, tenor, interestRate) {
  const monthlyInterestRate = interestRate / 12 / 100;
  if (monthlyInterestRate === 0) return Math.round(loanAmount / tenor);
  return Math.round(
    (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -tenor))
  );
}

// ---------------- LOAN DISBURSEMENT CALCULATION ----------------
function calculateLoanDisbursement(
  calculateData,
  downPaymentSetup,
  firstDueDateSetup
) {
  const commencementDate = dayjs(calculateData.disbursedDate || dayjs());

  const loanAmount = Number(calculateData.loan_amount);
  const totalAmount = Number(calculateData.product_price);
  const tenor = Number(calculateData.tenor);
  const interestRate = Number(calculateData.interest_rate);

  if (!loanAmount || !tenor || !interestRate) {
    throw new Error("Loan amount, tenor, and interest rate are required.");
  }

  // --- First Due Date Logic ---
  // let firstDueDate = commencementDate.clone();
  // const commencementDay = Number(commencementDate.format("D"));
  // firstDueDate =
  //   commencementDay === 1
  //     ? firstDueDate.add(1, "month")
  //     : firstDueDate.add(2, "month");
  // firstDueDate = firstDueDate.date(1);
  // --- First Due Date using Setup ---
  let firstDueDate = commencementDate.clone();
  const commencementDay = Number(commencementDate.format("D"));

  if (
    commencementDay >= firstDueDateSetup.start_day &&
    commencementDay <= firstDueDateSetup.end_day
  ) {
    firstDueDate = firstDueDate.add(firstDueDateSetup.add_to_month, "month");
  } else {
    firstDueDate = firstDueDate.add(
      firstDueDateSetup.add_to_month_for_else,
      "month"
    );
  }

  // set to billing setup day (e.g. always 1st day of month)
  firstDueDate = firstDueDate.date(firstDueDateSetup.billing_set_up_day);

  // --- Fees ---
  let stampDutyFee = 0;
  if (
    downPaymentSetup.stamp_duty_fee_fixed_amount
  ) {
    stampDutyFee = Number(downPaymentSetup.stamp_duty_fee_fixed_amount);
  }
  else if (
    downPaymentSetup.stamp_duty_fee === "stamp_duty_fee_percent_on_loan_amount"
  ) {
    stampDutyFee =
      (loanAmount * downPaymentSetup.stamp_duty_fee_percentage) / 100;
  } else if (
    downPaymentSetup.stamp_duty_fee === "stamp_duty_fee_percent_on_net_amount"
  ) {
    stampDutyFee =
    ((totalAmount ?? loanAmount) * downPaymentSetup.stamp_duty_fee_percentage) / 100;
  }

  let processingFee = 0;
  if (
    downPaymentSetup.processing_fee_fixed_amount
  ) {
    processingFee = Number(downPaymentSetup.processing_fee_fixed_amount);
  }
  else if (
    downPaymentSetup.processing_fee === "processing_fee_percent_on_loan_amount"
  ) {
    processingFee =
      (loanAmount * downPaymentSetup.processing_fee_percentage) / 100;
  } else if (
    downPaymentSetup.processing_fee === "processing_fee_percent_on_net_amount"
  ) {
    processingFee = ((totalAmount ?? loanAmount) * downPaymentSetup.processing_fee_percentage) / 100;
  }

  const totalInitialFee = stampDutyFee + processingFee;

  let finalDisbursedAmount = loanAmount;
  if (downPaymentSetup.way_to_calculate === "deduct_from_loan_amount") {
    finalDisbursedAmount = loanAmount - totalInitialFee;
  }

  const monthlyInstallment = calculatePMT(loanAmount, tenor, interestRate);

  // --- Pro-rata Interest Calculation ---
  const proRataDays = firstDueDate.diff(commencementDate, "day");
  const proRataInterest =
    ((loanAmount * (interestRate / 100)) / 365) * proRataDays;

  // --- Eligibility check ---
  const income = Number(calculateData.income || 0);
  const eligible =
    income >= monthlyInstallment * 3 ? "Eligible" : "Not Eligible";

  return {
    commencement_date: commencementDate.format("YYYY-MM-DD"),
    first_due_date: firstDueDate.format("YYYY-MM-DD"),
    loan_amount: loanAmount,
    tenor,
    interest_rate: interestRate,
    stamp_duty_fee: Number(stampDutyFee.toFixed(2)),
    processing_fee: Number(processingFee.toFixed(2)),
    total_initial_fee: Number(totalInitialFee.toFixed(2)),
    final_disbursed_amount: Number(finalDisbursedAmount.toFixed(2)),
    monthly_installment: monthlyInstallment,
    pro_rata_days: proRataDays,
    pro_rata_interest: Number(proRataInterest.toFixed(2)),
    total_interest: Number(
      (monthlyInstallment * tenor - loanAmount).toFixed(2)
    ),
    total_amount: Number(
      (loanAmount + monthlyInstallment * tenor + proRataInterest).toFixed(2)
    ),
    income,
    eligible_status: eligible,
  };
}

// ---------------- REACT COMPONENT ----------------
function LoanCalculatorPage() {
  const dispatch = useDispatch();
  const { projectCategories } = useSelector(
    (state) => state.projectUsersCategories
  );
  const { downPaymentSetups } = useSelector((state) => state.userDownPaymentSetups);
  const { firstDueDateSetups } = useSelector(
    (state) => state.userFirstDueDateSetups
  );

  const lang = useSelector((state) => state.language.lang);

  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      category_id: "",
      region_name: "",
      product_price: "",
      downpayment: "",
      loan_amount: "",
      tenor: "",
      interest_rate: "",
      income: "",
      disbursedDate: dayjs(),
    },
  });

  const [result, setResult] = useState(null);
  const [firstDueDate, setFirstDueDate] = useState("");

  const productPrice = watch("product_price");
  const downpayment = watch("downpayment");
  const category_id = watch("category_id");
  const disbursedDate = watch("disbursedDate");
  const category = projectCategories?.find((c) => c.id === category_id);

  // Auto calculate loan amount & interest_rate
  useEffect(() => {
    if (productPrice && downpayment >= 0) {
      const loanAmount =
        parseFloat(productPrice || 0) -
        (parseFloat(productPrice || 0) * parseFloat(downpayment || 0)) / 100;
      setValue("loan_amount", loanAmount.toFixed(2), { shouldValidate: true });
      setValue(
        "downpayment_amount",
        (parseFloat(productPrice || 0) * parseFloat(downpayment || 0)) / 100
      );
    }
    if (category) {
      setValue("interest_rate", category.interest_rate || 0, {
        shouldValidate: true,
      });
      dispatch(getDownPaymentWithParams({ category_id: category.id }));
      dispatch(getFirstDueDateSetupWithParams({ category_id: category.id }));
    }
    if (firstDueDate) {
      setValue("first_due_date", dayjs(firstDueDate), { shouldValidate: true });
    }
  }, [productPrice, downpayment, category, setValue, dispatch, firstDueDate]);

  // Auto calculate first due date when disbursed date changes
  useEffect(() => {
    if (
      disbursedDate &&
      downPaymentSetups?.length &&
      firstDueDateSetups?.length
    ) {
      try {
        const data = {
          disbursedDate,
          loan_amount: watch("loan_amount"),
          tenor: watch("tenor"),
          interest_rate: watch("interest_rate"),
          income: watch("income"),
        };
        const resultData = calculateLoanDisbursement(
          data,
          downPaymentSetups[0],
          firstDueDateSetups[0]
        );
        setFirstDueDate(resultData.first_due_date);
      } catch (error) {
        console.error(error.message);
        setFirstDueDate("");
      }
    }
  }, [disbursedDate, downPaymentSetups, firstDueDateSetups, watch]);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getProjectCategory());
  }, [dispatch]);

  const onSubmit = (data) => {
    try {
      if (!downPaymentSetups?.length || !firstDueDateSetups?.length) {
        showErrorToast(
          "Down Payment Setup or First Due Date Setup not found for this category."
        );
        return;
      }
      const resultData = calculateLoanDisbursement(
        data,
        downPaymentSetups[0],
        firstDueDateSetups[0]
      );
      setResult(resultData);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "#f4f6f9", minHeight: "100vh", py: { xs: 2, md: 5 } }}>
        <Box
          sx={{
            background: "linear-gradient(120deg, #eaf0f7 0%, #fff 58%, #fff1e5 100%)",
            maxWidth: 1200,
            mx: "auto",
            borderRadius: { xs: 3, md: 5 },
            px: { xs: 3, sm: 4, md: 6, lg: 8 }, // Responsive horizontal padding
            py: { xs: 3, md: 4.5 }, // Responsive vertical padding
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on desktop
            gap: { xs: 3, sm: 4, md: 6 },
            mb: { xs: 3, md: 5 },
            border: "1px solid rgba(23,54,93,.08)",
          }}
        >
          {/* Left Content */}
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Chip
              icon={<CalculateOutlined sx={{ color: "secondary.dark !important" }} />}
              label={lang === "en" ? "PLAN WITH CLARITY" : "ရှင်းလင်းစွာ စီစဉ်ပါ"}
              sx={{
                mb: 2,
                bgcolor: "#fff",
                color: "secondary.dark",
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: ".12em",
                border: "1px solid #ffe0c7",
              }}
            />
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                color: "#17365d",
                fontSize: {
                  xs: "1.9rem",
                  sm: "2.3rem",
                  md: "2.7rem",
                },
                fontWeight: 800,
                letterSpacing: "-.055em",
                lineHeight: 1.12,
              }}
            >
              {lang === "en" ? "Plan your payments with confidence." : "ယုံကြည်မှုရှိစွာ ငွေပေးချေမှုကို စီစဉ်ပါ။"}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#647386",
                maxWidth: { xs: "100%", sm: "90%", md: "480px" },
                opacity: 0.9,
                mx: { xs: "auto", md: 0 },
                fontSize: {
                  xs: "0.95rem",
                  sm: "1rem",
                  md: "1.05rem",
                },
                lineHeight: 1.6,
              }}
            >
              {lang === "en" ? (
                <>
                  Calculate your loan eligibility and monthly payments with our
                  easy-to-use calculator.
                  <br />
                  Get instant results and make informed decisions.
                </>
              ) : (
                <>
                  ချေးငွေယူနိုင်သော ကိုက်ညီချက်နှင့် လစဉ်ပေးဆောင်မှုများ
                  အဆင်ပြေလွယ်ကူချောမွေ့စေရန် ချေးငွေတွက်ချက်မှုအား
                  လုပ်ဆောင်နိုင်ပါတယ်။
                  <br />
                  ရလဒ်တွေကို တစ်ချိန်တည်း ပြသပေးမည်ဖြစ်ပြီး
                  အမြဲဆုံးလျောက်ထားလိုက်ပါ။
                </>
              )}
            </Typography>
          </Box>

          {/* Right Image */}
          <Box
            component="img"
            src={calculatorIllustration}
            alt=""
            sx={{
              width: { xs: "78%", sm: "58%", md: "35%" },
              maxWidth: 340,
              maxHeight: 250,
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Box>

        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Loan Details Form */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                  borderTop: "4px solid #f46b12",
                  borderRadius: 4,
                  boxShadow: "0 16px 42px rgba(23,54,93,.08)",
                  p: { xs: 2, sm: 2.5, md: 3.5 },
                  height: "100%",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "#fff",
                    transition: "box-shadow .18s ease, border-color .18s ease",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f4a36a",
                    },
                    "&.Mui-focused": {
                      boxShadow: "0 0 0 3px rgba(244,107,18,.12)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#f46b12",
                      borderWidth: 1,
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#bd4705" },
                  "& .MuiAutocomplete-popupIndicator, & .MuiAutocomplete-clearIndicator": {
                    color: "#526780",
                  },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#526780",
                    bgcolor: "#f4f6f9",
                  },
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{ color: "primary.main", fontWeight: 800, letterSpacing: "-.03em" }}
                  >
                    {lang === "en" ? "Your financing details" : "ချေးငွေအချက်အလက်များ"}
                  </Typography>
                  <Typography sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.88rem" }}>
                    {lang === "en"
                      ? "Enter a few details to see an estimated payment plan."
                      : "ခန့်မှန်းပေးချေမှုအစီအစဉ်ကို ကြည့်ရန် အချက်အလက်အနည်းငယ် ဖြည့်ပါ။"}
                  </Typography>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={{ xs: 2, sm: 2.5 }}>
                    {/* --- All your form fields stay the same --- */}
                    <Grid item xs={12} sm={6}>
                      <FormInputSelect
                        control={control}
                        options={projectCategories}
                        getOptionLabel={(o) => o.name_en}
                        id="id"
                        name="category_id"
                        label={
                          lang === "en"
                            ? "Choose Product"
                            : "ချေးငွေအမျိုးအစားရွေးချယ်ပါ "
                        }
                        rules={{ required: "Category is required" }}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <FormInputText
                        control={control}
                        label="Region Name"
                        name="region_name"
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={6}>
                      <FormInputText
                        control={control}
                        label={
                          lang === "en"
                            ? "Product Price"
                            : "လျှောက်ထားလိုသည့် ယာဉ်တန်ဖိုး"
                        }
                        name="product_price"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormInputSelect
                        control={control}
                        label={
                          lang === "en"
                            ? "Downpayment (%)"
                            : "ကနဦးပေးသွင်းငွေ (%)"
                        }
                        name="downpayment"
                        options={[
                          { id: 30, label: "30%" },
                          { id: 40, label: "40%" },
                          { id: 50, label: "50%" },
                          { id: 60, label: "60%" },
                          { id: 70, label: "70%" },
                          { id: 80, label: "80%" },
                        ]}
                        getOptionLabel={(option) => option.label}
                        id="id"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormInputText
                        control={control}
                        label={
                          lang === "en"
                            ? "Downpayment Amount"
                            : "ကနဦးပေးသွင်းငွေ (ငွေပမာဏ)"
                        }
                        name="downpayment_amount"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "none" }}>
                      <FormInputText
                        control={control}
                        label="Loan Amount"
                        name="loan_amount"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormInputText
                        control={control}
                        label={
                          lang === "en"
                            ? "Tenor (Months)"
                            : "ချေးငွေသက်တမ်း (လ)"
                        }
                        name="tenor"
                        type="number"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "none" }}>
                      <FormInputDecimal
                        control={control}
                        label="Interest Rate %"
                        name="interest_rate"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormInputDatePicker
                        control={control}
                        label={
                          lang === "en"
                            ? "Commencement Date"
                            : "စာချုပ်ချုပ်မည့်ရက်"
                        }
                        name="disbursedDate"
                        type="date"
                        disabled={
                          !category_id ||
                          !productPrice ||
                          !watch("loan_amount") ||
                          !watch("tenor") ||
                          !watch("interest_rate")
                        } // disable until all required values exist
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: "none" }}>
                      <FormInputDatePicker
                        label="First Due Date"
                        control={control}
                        name="first_due_date"
                        type="date"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormInputText
                        control={control}
                        label={lang === "en" ? "Income Amount" : "လစဉ်ဝင်ငွေ"}
                        name="income"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 1,
                          background: "linear-gradient(100deg, #f46b12 0%, #df5908 100%)",
                          color: "white",
                          py: 1.35,
                          borderRadius: 2,
                          fontWeight: 800,
                          letterSpacing: ".01em",
                          boxShadow: "0 8px 18px rgba(244,107,18,.2)",
                          "&:hover": {
                            background: "linear-gradient(100deg, #17365d 0%, #102a49 100%)",
                            transform: "translateY(-1px)",
                            boxShadow: "0 10px 22px rgba(23,54,93,.2)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        {lang === "en" ? "Show my payment estimate" : "ခန့်မှန်းပေးချေငွေ ကြည့်ရန်"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Card>
            </Grid>

            {result && (
              <Grid item xs={12} md={6}>
                <Card sx={{ p: { xs: 2, sm: 3 }, border: "1px solid #e2e8f0", borderTop: "4px solid #17365d", borderRadius: 4, boxShadow: "0 16px 42px rgba(23,54,93,.08)" }}>
                  <Typography variant="h5" component="h2" sx={{ color: "primary.main", fontWeight: 800, mb: 0.5 }}>
                    {lang === "en" ? "Your estimated plan" : "ခန့်မှန်းပေးချေမှုအစီအစဉ်"}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: "0.86rem", mb: 2 }}>
                    {lang === "en" ? "Review the estimated fees and monthly payment below." : "ခန့်မှန်းအခကြေးငွေနှင့် လစဉ်ပေးသွင်းငွေကို အောက်တွင်ကြည့်ပါ။"}
                  </Typography>
                  <Box sx={{ overflowX: "auto", }}>
                    <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          overflow: "hidden",
                          marginBottom: "67px",
                        }}
                    >
                      <thead style={{ backgroundColor: "#f3f4f6" }}>
                        <tr>
                          <th
                            style={{
                              textAlign: "left",
                              padding: "12px",
                              fontWeight: "600",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {lang === "en" ? "Item" : "အမျိုးအစား"}
                          </th>
                          <th
                            style={{
                              textAlign: "right",
                              padding: "12px",
                              fontWeight: "600",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {lang === "en" ? "Value" : "တန်ဖိုး"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            Pro-rata Interest
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: "1px solid #e5e7eb",
                              textAlign: "right",
                            }}
                          >
                            {result.pro_rata_interest.toLocaleString()} { lang === "en" ? "MMK" : "ကျပ်" }
                          </td>
                        </tr> */}

                        {/* <tr>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            Total Interest
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: "1px solid #e5e7eb",
                              textAlign: "right",
                            }}
                          >
                            {result.total_interest.toLocaleString()}{" "}
                            {lang === "en" ? "MMK" : "ကျပ်"}
                          </td>
                        </tr> */}

                        {/* <tr>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            Total Amount
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: "1px solid #e5e7eb",
                              textAlign: "right",
                            }}
                          >
                            {result.total_amount.toLocaleString()} { lang === "en" ? "MMK" : "ကျပ်" }
                          </td>
                        </tr> */}
                        <tr>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {lang === "en"
                              ? "Stamp Duty Fee"
                              : "တံဆိပ်ခေါင်းခွန်"}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: "1px solid #e5e7eb",
                              textAlign: "right",
                            }}
                          >
                            {result.stamp_duty_fee.toLocaleString()}{" "}
                            {lang === "en" ? "MMK" : "ကျပ်"}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {lang === "en" ? "Processing Fee" : "ဝန်ဆောင်ခ"}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              borderBottom: "1px solid #e5e7eb",
                              textAlign: "right",
                            }}
                          >
                            {result.processing_fee.toLocaleString()}{" "}
                            {lang === "en" ? "MMK" : "ကျပ်"}
                          </td>
                        </tr>

                        <tr>
                          <td style={{ padding: "12px", borderBottom: "1px solid #e5e7eb", }}>
                            {lang === "en"
                              ? "Monthly Installment"
                              : "လစဉ်ပေးသွင်းရမည့်ငွေပမာဏ"}
                          </td>
                          <td
                            style={{
                              padding: "12px",
                              textAlign: "right",
                              fontWeight: "600",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {result.monthly_installment.toLocaleString()}{" "}
                            {lang === "en" ? "MMK" : "ကျပ်"}
                          </td>
                        </tr>
                        
                        <tr  style={{
                              marginBottom: "30px",}}>
                          <td
                            style={{
                              padding: "15px",
                              borderBottom: "1px solid #e5e7eb",
                            }}
                          >
                            {lang === "en"
                              ? "Eligible Status"
                              : "ကိုက်ညီမှုအခြေအနေ"}
                          </td>
                          <td
                            style={{
                              padding: "15px",
                              borderBottom: "1px solid #e5e7eb",
                              textAlign: "right",
                              fontWeight: "bold",
                              color:
                                result.eligible_status === "Eligible"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {lang === "en"
                              ? result.eligible_status
                              : result.eligible_status === "Eligible"
                              ? "ကိုက်ညီပါသည်"
                              : "မကိုက်ညီပါ"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                </Card>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LoanCalculatorPage;
