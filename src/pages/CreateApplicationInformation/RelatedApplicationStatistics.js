import React, { Fragment } from "react";
import { Grid } from "@mui/material";
import Accordion from "../../../../components/Accordion";
import { useParams } from "react-router-dom";
import openNewWindow from "utils/windowUtils";
import { useSelector } from "react-redux";

const RelatedApplicationStatistics = ({  }) => {
  const { categoryName, categoryId } = useParams();

  const { relatedApplications } = useSelector(
    (state) => state.applicationDetail
  );
  
  return (
    relatedApplications && (
      <Accordion title="Related Application Statistics" type="statics">
        <Grid container spacing={2}>
          <Grid item xs={8}><span style={{fontWeight: "bold"}}>Application ID</span></Grid>
          <Grid item xs={4}><span style={{fontWeight: "bold"}}>Type</span></Grid>
        </Grid>
        <Grid container spacing={2}>
          {relatedApplications.map((related, index) => (
            <Fragment>
              <Grid item xs={8}>
                <span
                  key={index}
                  onClick={() =>
                    openNewWindow(
                      `/CreditManagement/CreateApplicationInformation/${categoryName}/${categoryId}/${related.uuid}/${related.id}/view`
                    )
                  }
                  style={{ cursor: "pointer" }}
                  className="hover-effect"
                >
                  {related.application_id}
                </span>
              </Grid>
              <Grid item xs={4}>
                {related.type}
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Accordion>
    )
  );
};

export default React.memo(RelatedApplicationStatistics);
