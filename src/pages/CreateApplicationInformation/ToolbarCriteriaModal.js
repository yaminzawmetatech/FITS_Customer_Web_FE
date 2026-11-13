import React, { useState, Fragment } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

const priorityOrder = [
  "Finance Condition",
  "Basic Information",
  "Region (Eligible)",
  "Required Documents",
  "Verification Point and Other Credit Criteria",
  "Additional Residence Status Requirement",
  "Temporary Suspended",
  "Additional Information",
  "Income Proof Requirements & other credit criteria",
  "Vehicle Information"
];

const ToolbarCriteriaModal = ({ open, handleClose }) => {

  const [type, setType] = useState("");

  const { allCreditCriteria } = useSelector((state) => state.allCreditCriteria);

  const [dynamicPriorityOrder, setDynamicPriorityOrder] =
    useState(priorityOrder);

  // group by type (eg-Basic Information)
  const groupedCriteria = allCreditCriteria.reduce((acc, item) => {
    const { type } = item;
    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(item);
    return acc;
  }, {});

  // Convert groupedCriteria object to an array with the defined priority
  const orderedCriteria = dynamicPriorityOrder
    .filter((type) => groupedCriteria[type])
    .map((type) => ({
      type,
      items: groupedCriteria[type],
    }));

  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    setType(input);

    if (input) {
      // Update the priority order
      setDynamicPriorityOrder((prevOrder) => {
        const matchedTypes = prevOrder.filter((type) =>
          type.toLowerCase().includes(input)
        );
        const otherTypes = prevOrder.filter(
          (type) => !type.toLowerCase().includes(input)
        );

        return [...matchedTypes, ...otherTypes];
      });
    } else {
      setDynamicPriorityOrder(priorityOrder);
    }
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%" } }}
      maxWidth="md"
      open={open}
    >
      <DialogTitle
        id="scroll-dialog-title"
        variant="h5"
        sx={{ color: "#1890ff" }}
      >
        <div style={{ display: "flex" }}>
          <div>Credit Criteria Information</div>
          <div style={{ marginLeft: "auto" }}>
            <TextField
              onChange={(e) => handleInputChange(e)}
              label="Sort by Type"
              variant="outlined"
              size="small"
            />
            {/* <Button style={{marginLeft: "3px"}} variant="contained" onClick={handleClick}>
             Search
            </Button> */}
          </div>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {orderedCriteria.length > 0 ? (
          <Grid container spacing={2}>
            {orderedCriteria?.map(({ type, items }) => (
              <Grid item xs={12} sm={12} lg={12} md={12} key={type}>
                <Card
                  variant="outlined"
                  sx={{
                    backgroundColor: "#f9f9f9", // Light grey background
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow
                    borderRadius: "8px", // Rounded corners
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      style={{ fontWeight: "bold", color: "#1890ff" }}
                    >
                      {type}
                    </Typography>
                    {items.map(
                      (criteria) =>
                        criteria.credit_criteria_values &&
                        criteria.credit_criteria_values.length > 0 && (
                          <Fragment key={criteria.id}>
                            <Grid container spacing={1} sx={{ mt: 1 }}>
                              <Grid item xs={4}>
                                <Typography
                                  variant="subtitle1"
                                  style={{ fontWeight: "bold" }}
                                >
                                  {criteria?.parent_id
                                    ? criteria?.parent?.required_category + "-"
                                    : null}
                                  {criteria.required_category}:
                                </Typography>
                              </Grid>
                              <Grid item xs={8}>
                                <ul className="credit-ul-class">
                                  {criteria.credit_criteria_values.map(
                                    (value) => (
                                      <li key={value.id}>{value.value}</li>
                                    )
                                  )}
                                </ul>
                              </Grid>
                            </Grid>
                          </Fragment>
                        )
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container>No Credit Criteria...</Grid>
        )}
      </DialogContent>
      <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
        <Button variant="contained" onClick={handleClose}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ToolbarCriteriaModal);
