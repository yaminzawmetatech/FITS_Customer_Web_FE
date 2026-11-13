import { Box } from "@mui/material";
import logoImage from "../../assets/images/fits-finance-logo.png";

const Logo = ({ width = 196 }) => (
  <Box
    component="img"
    src={logoImage}
    alt="FITS Finance"
    sx={{
      display: "block",
      width,
      maxWidth: "100%",
      height: "auto",
      objectFit: "contain",
    }}
  />
);

export default Logo;
