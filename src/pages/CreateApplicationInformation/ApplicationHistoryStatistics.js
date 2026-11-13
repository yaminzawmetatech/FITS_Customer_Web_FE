import React, { Fragment, useState, useCallback } from "react";
import { Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import { useParams } from "react-router-dom";
import openNewWindow from "utils/windowUtils";
import ActualPaymentLinesHistory from "./ActualPaymentLinesHistory";

const ApplicationHistoryStatistics = ({ applicationHistories }) => {
  const { categoryName, categoryId } = useParams();

  const [openActualPaymentLinesModal, setOpenActualPaymentLinesModal] =
    useState(false);
  const [contractId, setContractId] = useState();
  const [applicationId, setApplicationId] = useState();

  const handleOpenActualPaymentLines = (id, application_id) => {
    setOpenActualPaymentLinesModal(true);
    setContractId(id);
    setApplicationId(application_id);
  };

  const handleCloseActualPaymentLines = useCallback(() => {
    setOpenActualPaymentLinesModal(false);
  }, []);

  return (
    applicationHistories && (
      <>
        <Accordion title="Application History Statistics" type="statics">
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <span style={{ fontWeight: "bold" }}>Application</span>
            </Grid>
            <Grid item xs={5}>
              <span style={{ fontWeight: "bold" }}>Contract</span>
            </Grid>
            {/* <Grid item xs={3}>
            <span style={{ fontWeight: "bold" }}>Applied Date</span>
          </Grid> */}
          </Grid>
          <Grid container spacing={2}>
            {applicationHistories.map((history, index) => (
              <Fragment>
                <Grid item xs={7}>
                  <span
                    key={index}
                    onClick={() =>
                      openNewWindow(
                        `/CreditManagement/CreateApplicationInformation/${categoryName}/${categoryId}/${history.uuid}/${history.id}/view`
                      )
                    }
                    style={{ cursor: "pointer" }}
                    className="hover-effect"
                  >
                    {history.application_id}
                  </span>
                  <br></br>
                  {history.status}
                  <br></br>
                  {history.applied_date}
                </Grid>
                <Grid item xs={5}>
                  <span
                    key={index}
                    onClick={() =>
                      handleOpenActualPaymentLines(history.contract_id, history.application_id)
                    }
                    style={{ cursor: "pointer" }}
                    className="hover-effect"
                  >
                    {history?.contract_status}
                  </span>
                </Grid>
              </Fragment>
            ))}
          </Grid>
        </Accordion>

        <ActualPaymentLinesHistory
          open={openActualPaymentLinesModal}
          handleClose={handleCloseActualPaymentLines}
          id={contractId}
          applicationId={applicationId}
        />
      </>
    )
  );
};

export default React.memo(ApplicationHistoryStatistics);
