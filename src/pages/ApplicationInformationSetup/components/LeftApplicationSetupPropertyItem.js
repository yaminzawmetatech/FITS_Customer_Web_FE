import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { handleCheckedApplicationInformationPropertyData } from "../../../features/applicationInformationSetup/applicationInformationSetupSlice";

const LeftApplicationSetupPropertyItem = React.memo(({ property }) => {

  const { id, title,value, checked = false } = property;
  const dispatch = useDispatch();

  return (
    <ListItem
      key={id}
      role="listitem"
      button
      onClick={() => {
        dispatch(handleCheckedApplicationInformationPropertyData(id)); // check the left side of data
      }}
    >
      <ListItemIcon>
        <Checkbox
          checked={checked}
          tabIndex={-1}
          disableRipple
          inputProps={{
            "aria-labelledby": id,
          }}
        />
      </ListItemIcon>
      <ListItemText id={id} primary={value} title={title} />
    </ListItem>
  );
});

export default LeftApplicationSetupPropertyItem;
