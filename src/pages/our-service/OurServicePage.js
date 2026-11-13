import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  styled,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import serviceIllustration from "../../assets/images/fits-services.svg";
import { getOurServices } from "../../features/customerUser/ourService/ourServiceSlice";
import { Link } from "react-router-dom";

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

const LoanServices = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.language.lang);
  const { ourServices } = useSelector((state) => state.userOurServices);

  const fetchApi = useCallback(() => {
    dispatch(getOurServices());
  }, [dispatch]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <SectionWrapper>
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ mb: 4, maxWidth: 570 }}>
          <Typography sx={{ color: "primary.main", fontSize: "0.74rem", fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase" }}>
            {lang === "en" ? "Explore your options" : "ရွေးချယ်စရာများကို လေ့လာရန်"}
          </Typography>
          <Typography variant="h3" sx={{ mt: 1, color: "primary.dark", fontWeight: 800, letterSpacing: "-.055em" }}>
            {lang === "en" ? "Support for what moves you." : "သင့်ကို ရှေ့ဆက်စေမယ့် ပံ့ပိုးမှု။"}
          </Typography>
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
    <Grid container spacing={2}>
      {ourServices.map((item, index) => (
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
        <Box textAlign="center" mt={4}>
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
            to="/contact"
            component={Link}
          >
            {lang === "en" ? "Contact Us" : "ဆက်သွယ်ရန်"}
          </Button>
        </Box>
      </Container>
    </SectionWrapper>
  );
};

export default LoanServices;
