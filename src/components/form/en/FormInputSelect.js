import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const FormInputSelect = ({
  name,
  rules = null,
  id,
  control,
  options,
  label,
  onSelect,
  sx,
  ...rest
}) => {
  return (
    <Controller
      {...(rules ? { rules } : null)}
      name={name}
      control={control}
      render={({
        field: { onChange, ref, onBlur, value },
        fieldState: { error },
        formState,
      }) => {
        const newOptions = [...options];
        if (value) {
          const selectItem = options.find((item) => item[id] === value);
          if (!selectItem) {
            newOptions.push({ [id]: value, [label]: value });
          }
        }
        return (
          <Autocomplete
            {...rest}
            onChange={(event, newValue) => {
              if (onSelect) {
                onSelect(newValue);
              }
              onChange(newValue ? newValue[id] : null);
            }}
            onBlur={onBlur}
            defaultValue={value}
            value={value ? newOptions.find((item) => item[id] === value) : null}
            name={name}
            size="small"
            options={newOptions}
            renderInput={(params) => (
              <TextField
                inputRef={ref}
                helperText={error ? error?.message : null}
                error={!!error}
                {...params}
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
      }}
    />
  );
};

export default React.memo(FormInputSelect);