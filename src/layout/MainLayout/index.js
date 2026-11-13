import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Breadcrumbs, Toolbar, useMediaQuery } from "@mui/material";

// project import
import Header from "./Header";
import Footer from "./Footer/Footer";
import Drawer from "./Drawer/index";
// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = ({ isAdmin }) => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
  const location = useLocation();
  const { drawerOpen } = useSelector((state) => state.menu);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch({ type: 'openDrawer', payload: { drawerOpen: !open } });
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch({ type: 'openDrawer', payload: { drawerOpen: !matchDownLG } });
  }, [matchDownLG, dispatch]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(!drawerOpen);
  }, [drawerOpen, open]);

  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      {isAdmin && (
        <>
          <Header open={open} handleDrawerToggle={handleDrawerToggle} isAdmin={isAdmin} />
          <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
        </>
      )}
      {!isAdmin && <Header isAdmin={isAdmin} />}

      <Box
        component="main"
        sx={{
          width: "100%",
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          ml: { lg: isAdmin && open ? '260px' : '0px' },
        }}
      >
        <Toolbar sx={{ padding: 0, minHeight: "44px" }} />
        {isAdmin && <Breadcrumbs title />}
        <Outlet />
        <Footer isAdmin={isAdmin} />
      </Box>
    </Box>
  );
};

export default MainLayout;
