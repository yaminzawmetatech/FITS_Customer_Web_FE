import React from "react";
import { Controller } from "react-hook-form";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const FormInputRadio = ({
  name,
  rules = null,
  control,
  options,
  id,
  row,
  ...rest
}) => {
  return (
    <Controller
      {...(rules ? { rules } : null)}
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <RadioGroup
          {...rest}
          onChange={(event) => {
            const newValue = event.target.value;
            onChange(newValue);
          }}
          value={value}
          row={row}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option[id]}
              value={option[id]}
              control={<Radio />}
              label={option.key}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export default React.memo(FormInputRadio);
