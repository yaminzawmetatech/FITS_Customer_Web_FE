import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

const FormInputText = ({ name, rules = null, control, label, sx, ...rest }) => {
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
        <TextField
          size="small"
          {...rest}
          onChange={onChange}
          onBlur={onBlur}
          value={value || ""}
          name={name}
          inputRef={ref}
          helperText={error ? error.message : null}
          error={!!error}
          fullWidth
          label={label}
          sx={{
            ...sx,
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#000000",
            },
          }}
        />
      )}
    />
  );
};

export default React.memo(FormInputText);
