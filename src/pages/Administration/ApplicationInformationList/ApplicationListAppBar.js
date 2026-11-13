import * as React from "react";
import { Typography } from "@mui/material";
import ApplicationListAppBarExcelImportButton from "./ApplicationListAppBarExcelImportButton";
import ApplicationListAppBarNewButton from "./ApplicationListAppBarNewButton";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { AppBar } from "@mui/material";

const ApplicationListAppBar = ({ fetchApi, category }) => {
  const { categoryName } = useParams();

  const [params] = useSearchParams();
  const selectedStatus = params.get("status");

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fafafb",
        color: "black",
        boxShadow: "none",
        mb: 1,
        mt: -1,
      }}
    >
      <div style={{ display: "flex" }}>
        <div>
          <Typography variant="h6">{categoryName} :</Typography>
        </div>
        <div style={{ marginLeft: "auto" }}>
          {selectedStatus === "New" && (
            <ApplicationListAppBarExcelImportButton fetchApi={fetchApi} />
          )}
          <ApplicationListAppBarNewButton category={category} />
        </div>
      </div>
    </AppBar>
  );
};

export default React.memo(ApplicationListAppBar);
