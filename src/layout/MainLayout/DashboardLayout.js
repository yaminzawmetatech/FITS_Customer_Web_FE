import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Breadcrumbs, Toolbar, useMediaQuery } from "@mui/material";

// project import
import Header from "./Dashboard/DashboardHeader/DashboardHeader";
import Footer from "./Footer/Footer";
import Drawer from "./Drawer/index";

// ==============================|| DASHBOARD LAYOUT ||============================== //

const DashboardLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useDispatch();
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
    <Box sx={{ width: "100%"}}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} isAdmin={true} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />

      <Box
        component="main"
                  sx={{
          width: "100%",
          flex: 1,
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          paddingLeft: !matchDownLG && open ? "270px !important" : 1,
        }}
      >
        <Toolbar sx={{ padding: 0, minHeight: "44px" }} />
        <Breadcrumbs title />
        <Outlet />
        {/* <Footer isAdmin={true} /> */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
