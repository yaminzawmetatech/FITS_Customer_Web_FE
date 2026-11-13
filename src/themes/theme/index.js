// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

const Theme = (colors) => {
  const { red, gold, cyan, green, grey } = colors;

  const greyColors = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16],
  };
  const contrastText = "#fff";

  return {
    primary: {
      lighter: "#eaf0f7",
      100: "#d9e3ef",
      200: "#b8c9dd",
      light: "#6886a8",
      400: "#385b82",
      main: "#17365d",
      dark: "#102a49",
      700: "#0d2340",
      darker: "#0a1c33",
      900: "#071426",
      contrastText,
    },
    submitted: {
      lighter: "#B2DFDB",
      100: "#B2DFDB",
      200: "#80CBC4",
      light: "#4DB6AC",
      400: "#26A69A",
      main: "#009688",
      600: "#00897B",
      dark: "#00796B",
      800: "#00695C",
      darker: "#004D40",
      A100: "#A7FFEB",
      A200: "#64FFDA",
      A300: "#1DE9B6",
      contrastText: "#FFFFFF",
    },

    secondary: {
      lighter: "#fff1e5",
      100: "#ffe0c7",
      200: "#ffc18f",
      light: "#ff9a4d",
      400: "#ff8127",
      main: "#f46b12",
      600: "#df5908",
      dark: "#bd4705",
      800: "#963704",
      darker: "#702904",
      A100: "#fff8f1",
      A200: "#ffd8bb",
      A300: "#ffad6e",
      contrastText: "#fff",
    },

    error: {
      lighter: red[0],
      light: red[2],
      main: red[4],
      dark: red[7],
      darker: red[9],
      contrastText,
    },
    warning: {
      lighter: gold[0],
      light: gold[3],
      main: gold[5],
      dark: gold[7],
      darker: gold[9],
      contrastText: greyColors[100],
    },
    info: {
      lighter: cyan[0],
      light: cyan[3],
      main: cyan[5],
      dark: cyan[7],
      darker: cyan[9],
      contrastText,
    },
    success: {
      lighter: green[0],
      light: green[3],
      main: green[5],
      dark: green[7],
      darker: green[9],
      contrastText,
    },
    grey: greyColors,
  };
};

export default Theme;
