import * as React from "react";
import { AppBar, Toolbar } from "@mui/material";

const CustomAppBar = ({ children }) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fafafb",
        color: "black",
        boxShadow: "none",
        mb: 2,
        borderBottom: "1px solid rgb(167, 173, 182)",
        mt: -1,
        paddingTop: "30px"
      }}
    >
      <Toolbar
        sx={{
          marginBottom: "13px",
          minHeight: "10px",
          padding: 0,
          "@media (min-width: 768px)": {
            padding: 0,
          },
        }}
      >
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(CustomAppBar);
