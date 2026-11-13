import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { FormControlLabel } from "@mui/material";
import Switch from "@mui/material/Switch";
import { handleCheckedNewApplicationInformationPropertyData, handleToggleRequiredNewApplicationInformationPropertyData } from "../../../features/applicationInformationSetup/applicationInformationSetupSlice";

const RightApplicationSetupPropertyItem = React.memo(({ property }) => {
  const { id, title, value, checked = false, required } = property;

  const dispatch = useDispatch();

  return (
    <ListItem
      key={id}
      role="listitem"
      button
      onClick={() => {
        dispatch(handleCheckedNewApplicationInformationPropertyData(id)); // check the right side of data
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
      <FormControlLabel
        checked={required}
        onClick={(event) => {
          event.stopPropagation();
          dispatch(
            handleToggleRequiredNewApplicationInformationPropertyData(id)
          ); // required switch on/off function
        }}
        required
        control={<Switch />}
        label="Required"
      />
    </ListItem>
  );
});

export default RightApplicationSetupPropertyItem;
