import { Box, Container, Stack, Typography } from "@mui/material";

const MarketingPageHero = ({ eyebrow, title, description, children }) => (
  <Box
    component="section"
    sx={{
      position: "relative",
      overflow: "hidden",
      py: { xs: 7, sm: 9, md: 11 },
      color: "#fff",
      background:
        "radial-gradient(ellipse at 86% 16%, rgba(244,107,18,.24), transparent 32%), linear-gradient(125deg, #102a49 0%, #17365d 62%, #244b76 100%)",
      "&::after": {
        content: '""',
        position: "absolute",
        width: { xs: 180, md: 300 },
        height: { xs: 180, md: 300 },
        right: { xs: -100, md: -110 },
        bottom: -180,
        border: "1px solid rgba(255,255,255,.14)",
        borderRadius: "50%",
        boxShadow: "0 0 0 32px rgba(255,255,255,.035), 0 0 0 66px rgba(255,255,255,.025)",
      },
    }}
  >
    <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
      <Stack spacing={2} sx={{ maxWidth: 760 }}>
        <Typography
          sx={{
            color: "#ff9a4d",
            fontSize: "0.75rem",
            fontWeight: 800,
            letterSpacing: ".16em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.15rem" },
            fontWeight: 800,
            letterSpacing: "-.06em",
            lineHeight: 1.08,
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            sx={{
              maxWidth: 620,
              color: "rgba(255,255,255,.72)",
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.8,
            }}
          >
            {description}
          </Typography>
        )}
        {children}
      </Stack>
    </Container>
  </Box>
);

export default MarketingPageHero;
