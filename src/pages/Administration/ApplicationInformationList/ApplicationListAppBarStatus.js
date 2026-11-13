import * as React from "react";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const ApplicationListAppBarAutocompleteSearch = () => {
  const [params, setParams] = useSearchParams();
  const searchValue = useMemo(() => params.get("status"), [params]);

  const onSearch = useCallback(
    (value) => {
      if (value === null || value === "All") {
        params.delete("status");
        params.delete("page");

        setParams(params);
      } else {
        params.set("status", value);
        params.set("page", "1");

        setParams(params);
      }
    },
    [params, setParams]
  );

  const options = [
    "All",
    "New",
    "Pending",
    "Request for Approval",
    "Reconsideration",
    "Approved",
    "Rejected",
    "Application Cancel",
  ];

  return (
    <Autocomplete
      value={searchValue === null ? "All" : searchValue}
      options={options}
      renderInput={(params) => (
        <TextField {...params} label="Status" size="small" />
      )}
      onChange={(e, selectedValue) => {
        onSearch(selectedValue);
      }}
      sx={{ width: "200px" }}
    />
  );
};

export default React.memo(ApplicationListAppBarAutocompleteSearch);
