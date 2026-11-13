import React from "react";
import { Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const FormInputCheckbox = ({ name, rules = null, control, label, ...rest }) => {
  return (
    <Controller
      {...(rules ? { rules } : null)}
      name={name}
      control={control}
      render={({
        field: { onChange, ref, onBlur, value },
        fieldState: { error },
        formState,
      }) => (
        <FormControlLabel
          control={
            <Checkbox
              inputRef={ref}
              size="small"
              {...rest}
              checked={value  || false}
              onChange={onChange}
            />
          }
          label={label}
        />
      )}
    />
  );
};

export default React.memo(FormInputCheckbox);
