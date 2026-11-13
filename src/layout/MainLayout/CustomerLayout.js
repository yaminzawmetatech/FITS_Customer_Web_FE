import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

// project import
import Header from "./Header";
import Footer from "./Footer/Footer";

// ==============================|| CUSTOMER LAYOUT ||============================== //

const CustomerLayout = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Header isAdmin={false} />
      <Box
        component="main"
        sx={{
          width: "100%",
          flexGrow: 1,
          // p: { xs: 2, sm: 3 },
        }}
      >
        <Toolbar sx={{ padding: 0, minHeight: { xs: "68px", lg: "82px" } }} />
        <Outlet />
        <Footer isAdmin={false} />
      </Box>
    </Box>
  );
};

export default CustomerLayout;
