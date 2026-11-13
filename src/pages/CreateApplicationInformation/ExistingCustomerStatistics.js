import React from "react";
import { Alert, Grid, Tooltip, Typography } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import { useSelector } from "react-redux";

const ExistingCustomerStatistics = () => {
  const { existing_customer } = useSelector((state) => state.applicationDetail);
  return (
    <Accordion title="Existing Customer Statistics" type="statics">
      {existing_customer && (
        <Alert
          // component={Link}
          // to="/Administration/BlackListCustomerSetup"
          // target="_blank"
          variant="filled"
          severity="error"
          sx={{
            marginBottom: "0.5rem",
            padding: "0.1rem",
            ".MuiAlert-icon": {
              padding: "0.1rem",
            },
            ".MuiAlert-message": {
              padding: "0.1rem",
            },
          }}
        >
          This customer discovered a customer from the source "
          {existing_customer?.application?.category?.name}"
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={6}>
          Applicant Name :
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          <Tooltip
            describeChild
            title={existing_customer?.guarantor?.full_name}
          >
            <Typography noWrap>
              {existing_customer?.guarantor?.full_name}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={6}>
          Father's Name :
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          <Tooltip
            describeChild
            title={existing_customer?.guarantor?.father_name}
          >
            <Typography noWrap>
              {existing_customer?.guarantor?.father_name}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={6}>
          NRC :
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          <Tooltip describeChild title={existing_customer?.guarantor?.full_nrc}>
            <Typography noWrap>
              {existing_customer?.guarantor?.full_nrc}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={6}>
          Source :
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          <Tooltip
            describeChild
            title={existing_customer?.application?.category?.name}
          >
            <Typography noWrap>
              {existing_customer?.application?.category?.name}
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>
    </Accordion>
  );
};

export default React.memo(ExistingCustomerStatistics);
