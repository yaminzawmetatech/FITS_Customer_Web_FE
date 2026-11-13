import React, { Fragment } from "react";
import { Grid, Tooltip, Typography } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import { useParams } from "react-router-dom";
import openNewWindow from "utils/windowUtils";

const RefinanceCustomerStatistics = ({ refinanceCustomer }) => {
  const { categoryName, categoryId } = useParams();

  return (
    refinanceCustomer && (
      <Accordion title="Refinance Customer Statistics" type="statics">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            Application ID :
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
           {refinanceCustomer?.contract_uuid ? (
            <span
              onClick={() =>
                openNewWindow(`/contracts/${refinanceCustomer.contract_uuid}/view`)
              }
              style={{ cursor: "pointer", color: "#1976d2" }}
              className="hover-effect"
            >
              {refinanceCustomer.application_id}
            </span>
          ) : (
            <span>{refinanceCustomer?.application_id}</span>
          )}
          </Grid>
          {/* <Grid item xs={6}>
            Partner ID :
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            <Tooltip describeChild title={refinanceCustomer?.partner_id}>
              <Typography noWrap>{refinanceCustomer?.partner_id}</Typography>
            </Tooltip>
          </Grid> */}
          <Grid item xs={6}>
            Customer Name :
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            <Tooltip describeChild title={refinanceCustomer?.customer_name}>
              <Typography noWrap>{refinanceCustomer?.customer_name}</Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            Category :
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            <Tooltip describeChild title={refinanceCustomer?.nrc}>
              <Typography noWrap>{refinanceCustomer?.refinance_category}</Typography>
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
            <Tooltip describeChild title={refinanceCustomer?.nrc}>
              <Typography noWrap>{refinanceCustomer?.nrc}</Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            Next Eligible Loan Amount :
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
              title={refinanceCustomer?.next_eligible_loan_amount}
            >
              <Typography noWrap>
                {refinanceCustomer?.next_eligible_loan_amount}
              </Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            Eligible Month :
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            <Tooltip describeChild title={refinanceCustomer?.eligible_month}>
              <Typography noWrap>
                {refinanceCustomer?.eligible_month}
              </Typography>
            </Tooltip>
          </Grid>
        </Grid>
      </Accordion>
    )
  );
};

export default React.memo(RefinanceCustomerStatistics);
