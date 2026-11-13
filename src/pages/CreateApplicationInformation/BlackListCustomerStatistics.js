import React from "react";
import { Alert, Grid, Tooltip, Typography } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const dealerStatics = {
  "Number of Application": 46,
  "No.": "030140005",
  "Dealer Name": "Jaifa (1), 84th Street Motors",
  "Owner Name": "U Bo Bo Mya",
  "Showroom Address": "Shop (1) - North Avenue, Cityville, State, ZIP Code",
  "Showroom Phone No": "123-456-7890",
};
const BlackListCustomerStatistics = () => {
  const { black_list_customer } = useSelector(
    (state) => state.applicationDetail
  );
  return (
    <Accordion title="BalckList Customer Statistics" type="statics">
      {black_list_customer && (
        <Alert
          component={Link}
          to="/Administration/BlackListCustomerSetup"
          target="_blank"
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
          This customer discovered a blacklist from the source "
          {black_list_customer?.source}"
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
            title={black_list_customer?.black_list_customer_name}
          >
            <Typography noWrap>
              {black_list_customer?.black_list_customer_name}
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
          <Tooltip describeChild title={black_list_customer?.father_name}>
            <Typography noWrap>{black_list_customer?.father_name}</Typography>
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
          <Tooltip describeChild title={black_list_customer?.full_nrc}>
            <Typography noWrap>{black_list_customer?.full_nrc}</Typography>
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
          <Tooltip describeChild title={black_list_customer?.source}>
            <Typography noWrap>{black_list_customer?.source}</Typography>
          </Tooltip>
        </Grid>

        <Grid item xs={6}>
          Reason :
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          <Tooltip describeChild title={black_list_customer?.reason}>
            <Typography noWrap>{black_list_customer?.reason}</Typography>
          </Tooltip>
        </Grid>
      </Grid>
    </Accordion>
  );
};

export default React.memo(BlackListCustomerStatistics);
