import React, { useEffect } from "react";
import { Box, Typography, styled, Link, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getApplyLoanSteps } from "../../features/customerUser/applyLoanStep/applyLoanStepSlice";
import { Link as RouterLink } from "react-router-dom";

// Styled components
const SectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  textAlign: "center",
  padding: "88px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "24px 0",
  },
}));

const CircleIconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#17365d",
  width: 72,
  height: 72,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "16px",
  [theme.breakpoints.down("sm")]: {
    width: 60,
    height: 60,
  },
}));

const IconImage = styled("img")(({ theme }) => ({
  width: 36,
  height: 36,
  [theme.breakpoints.down("sm")]: {
    width: 30,
    height: 30,
  },
}));

const HowToApplyLoan = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);
  const { applyLoanSteps } = useSelector((state) => state.applyLoanStep);

  useEffect(() => {
    dispatch(getApplyLoanSteps());
  }, [dispatch]);

  return (
    <SectionWrapper>
      {/* Title */}
      <Typography
        variant="h4"
        color="primary.dark"
        fontWeight={700}
        mb={2}
        sx={{
          fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
          textAlign: "center",
        }}
      >
        {lang === "en" ? "How to Apply Loan?" : "ချေးငွေဘယ်လိုလျောက်ရမလဲ"}
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        color="text.secondary"
        mb={6}
        sx={{
          fontSize: { xs: "0.95rem", sm: "1rem" },
          textAlign: "center",
        }}
      >
        {lang === "en" ? "Simple and Easy!" : "ရိုးရှင်းပြီး လွယ်ကူသည်။"}
      </Typography>

      {/* Steps Grid */}
      <Grid
        container
        spacing={{ xs: 3, sm: 3, md: 4, lg: 6 }}
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "100%",
          maxWidth: "1200px",
          px: { xs: 2, sm: 2, md: 6, lg: 6 }, // no padding for xs/sm
          textAlign: "center",
        }}
      >
        {applyLoanSteps.map((step, index) => (
          <Grid
            item
            key={step.id || index}
            xs={6}
            sm={5}
            md={3}
            
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <CircleIconWrapper>
              <IconImage src={step.image} alt={step[`description_${lang}`]} />
            </CircleIconWrapper>
            <Typography
              variant="body2"
              color="primary.dark"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem" },
                textAlign: "center",
              }}
            >
              {step[`description_${lang}`]}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Link
        component={RouterLink}
        to="/apply-now"
        variant="body2"
        fontWeight={800}
        color="primary.main"
        sx={{
          display: "inline-block",
          fontSize: { xs: "0.95rem", sm: "1rem" },
          mt: { xs: 3, sm: 4 },
          textAlign: "center",
        }}
      >
        {lang === "en" ? "Want to apply?" : "ချေးငွေလျှောက်မည်"}
      </Link>
    </SectionWrapper>
  );
};

export default HowToApplyLoan;
