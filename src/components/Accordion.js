import React, { useState } from "react";
import {
  Accordion as MUIAccordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Accordion = ({
  title,
  children,
  type = "form",
  defaultExpanded = true,
}) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = (event) => {
    setExpanded((prevState) => !prevState);
  };

  return (
    <MUIAccordion
      TransitionProps={{ unmountOnExit: true }}
      expanded={defaultExpanded === true ? expanded : !expanded}
      onChange={handleChange}
      sx={{
        marginBottom: 0.5,
        boxShadow: "none",
        "&.Mui-expanded": {
          margin: "0 0 4px 0",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        sx={{
          backgroundColor: "#F0F0F0",
          minHeight: "35px",
          "&.Mui-expanded": {
            minHeight: "35px",
          },
          "& .MuiAccordionSummary-content.Mui-expanded": {
            margin: 0,
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
        }}
      >
        <Typography sx={{ flex: 1 }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          ...(type === "form"
            ? {
              backgroundColor: "#F5F8FF",
            }
            : {
                backgroundColor: "#F5F8FF",
              }),
        }}
      >
        {children}
      </AccordionDetails>
    </MUIAccordion>
  );
};

export default Accordion;
