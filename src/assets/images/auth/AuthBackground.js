// material-ui
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100vh",
        filter: "blur(100px)",
        zIndex: -1,
        bottom: 0,
        background: `linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, rgba(0, 87, 171, 0.7) 100%)`,
      }}
    ></Box>
  );
};

// const AuthBackground = () => {
//   const theme = useTheme();

//   const backgroundStyles = {
//     position: "absolute",
//     width: "80%",
//     height: "80%",
//     left: "25%",
//     //filter: "blur(100px)",
//     zIndex: -1,
//     bottom: 0,
//     background: `url(${businessFinanceBackground})`, // Use the imported image
//     backgroundSize: "cover",
//   };

//   return <Box sx={backgroundStyles}></Box>;
// };


export default AuthBackground;
