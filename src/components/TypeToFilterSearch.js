import React from "react";
import { Box, InputBase, TextField } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 0,
  borderLeft: "1px solid rgb(167, 173, 182)",
  borderRight: "1px solid rgb(167, 173, 182)",
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  svg: {
    fontSize: "20px",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    borderRadius: 0,
    "&:focus": {
      borderRadius: 0,
      borderColor: "#CCCCCC",
    },
    borderColor: "#CCCCCC",
    padding: "4px",
    border: "1px solid #CCCCCC",
    borderRight: "0 solid red",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
    },
  },
}));

const TypeToFilterSearch = ({ searchProps, selectProps }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <StyledInputBase
        {...searchProps}
        placeholder="Type To Filter (F3)"
        inputProps={{ "aria-label": "search" }}
      />
      <Autocomplete
        sx={{
          "& .MuiInputBase-sizeSmall": { borderRadius: 0 },
          "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
            padding: "2.5px 0 2.5px 3px",
            borderColor: "#CCCCCC",
          },
          width: "20ch",
          borderColor: "#CCCCCC",
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #CCCCCC",
          },
        }}
        size="small"
        inputProps={{ "aria-label": "Without label" }}
        renderInput={(params) => <TextField {...params} hiddenLabel />}
        {...selectProps}
      />
    </Box>
  );
};

export default React.memo(TypeToFilterSearch);
