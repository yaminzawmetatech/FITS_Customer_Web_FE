import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import {
  Toolbar,
  Box,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  Divider,
  Button,
  Stack,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForward from "@mui/icons-material/ArrowForward";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { setLanguage } from "../../../features/language/languageSlice";
import AppBarStyled from "./AppBarStyled";
import Logo from "../../../components/Logo/Logo";

const Header = ({ open, handleDrawerToggle }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const lang = useSelector((state) => state.language.lang);

  const isMobile = useMediaQuery("(max-width: 1023px)");

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggleMenu = () => setMobileOpen(!mobileOpen);

  const navLinks = [
    { label: { en: "Home", mm: "မူလစာမျက်နှာ" }, to: "/" },
    { label: { en: "About", mm: "FITS အကြောင်း" }, to: "/about-us" },
    { label: { en: "Services", mm: "ဝန်ဆောင်မှုများ" }, to: "/our-services" },
    { label: { en: "Calculator", mm: "အရစ်ကျတွက်ချက်ရန်" }, to: "/loan-calculator" },
    { label: { en: "Help Center", mm: "အကူအညီစင်တာ" }, to: "/faq" },
    { label: { en: "Contact", mm: "ဆက်သွယ်ရန်" }, to: "/contact" },
  ];

  useEffect(() => {
    const hashLang = location.hash.replace("#", "");

    if (["en", "mm"].includes(hashLang) && hashLang !== lang) {
      dispatch(setLanguage(hashLang));
      localStorage.setItem("lang", hashLang);
    }
  }, [location, lang, dispatch]);

  const handleLanguageToggle = () => {
    const newLang = lang === "en" ? "mm" : "en";
    dispatch(setLanguage(newLang));
    localStorage.setItem("lang", newLang);
    window.history.replaceState(
      null,
      "",
      `${location.pathname}${location.search}#${newLang}`
    );
  };

  const drawer = (
    <Box sx={{ width: 300, maxWidth: "85vw", p: 2.5 }} role="presentation">
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Logo width={176} />
        <IconButton aria-label="Close menu" onClick={handleDrawerToggleMenu}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List sx={{ py: 1.5 }}>
        {navLinks.map(({ label, to }) => (
          <ListItemButton
            key={to}
            component={RouterLink}
            to={to}
            onClick={handleDrawerToggleMenu}
            selected={location.pathname === to}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemText
              primary={label[lang]}
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
        <Button fullWidth onClick={handleLanguageToggle} variant="outlined" sx={{ borderRadius: 3 }}>
          {lang === "en" ? "မြန်မာ" : "English"}
        </Button>
        <Button
          fullWidth
          component={RouterLink}
          to="/apply-now"
          variant="contained"
          onClick={handleDrawerToggleMenu}
          sx={{ borderRadius: 3 }}
        >
          {lang === "en" ? "Start an application" : "လျှောက်လွှာ စတင်ရန်"}
        </Button>
      </Stack>
    </Box>
  );

  return (
    <>
      <AppBarStyled
        open={open}
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: "rgba(255, 255, 255, .96)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(23, 54, 93, .10)",
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 68, md: 82 }, px: { xs: 2, sm: 3, lg: 7 }, gap: 3 }}>
          <Box component={RouterLink} to="/" aria-label="FITS Finance home" sx={{ textDecoration: "none", flexShrink: 0 }}>
            <Logo width={188} />
          </Box>
          {!isMobile && (
            <Stack
              component="nav"
              aria-label="Main navigation"
              direction="row"
              spacing={0.5}
              sx={{ mx: "auto", alignItems: "center" }}
            >
              {navLinks.map(({ label, to }) => (
                <Button
                  key={to}
                  component={RouterLink}
                  to={to}
                  color="inherit"
                  sx={{
                    px: 1.75,
                    minHeight: 40,
                    borderRadius: 99,
                    color: location.pathname === to ? "#fff" : "#102a49",
                    bgcolor: location.pathname === to ? "#f46b12" : "transparent",
                    fontSize: "0.86rem",
                    fontWeight: location.pathname === to ? 750 : 650,
                    "&:hover": {
                      bgcolor: location.pathname === to ? "#e45f08" : "#fff0e4",
                      color: location.pathname === to ? "#fff" : "#d65300",
                    },
                  }}
                >
                  {label[lang]}
                </Button>
              ))}
            </Stack>
          )}
          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }} sx={{ ml: { xs: "auto", md: 0 } }}>
            {!isMobile && (
              <Button
                onClick={handleLanguageToggle}
                color="inherit"
                startIcon={<LanguageOutlined sx={{ fontSize: 18 }} />}
                sx={{
                  minWidth: 78,
                  px: 1,
                  color: "#102a49",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  borderLeft: "1px solid #d6deea",
                  borderRadius: 0,
                }}
              >
                {lang === "en" ? "EN" : "MM"}
              </Button>
            )}
            {!isMobile && (
              <Button
                component={RouterLink}
                to="/apply-now"
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  px: 2.25,
                  py: 1.1,
                  borderRadius: 99,
                  whiteSpace: "nowrap",
                  bgcolor: "#102f5c",
                  "&:hover": { bgcolor: "#0a2448" },
                }}
              >
                {lang === "en" ? "Start an application" : "လျှောက်လွှာ စတင်ရန်"}
              </Button>
            )}
            {isMobile && (
              <IconButton aria-label="Open menu" onClick={handleDrawerToggleMenu} sx={{ color: "primary.main" }}>
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBarStyled>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggleMenu}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

export default Header;
