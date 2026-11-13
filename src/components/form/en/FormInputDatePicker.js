import React from "react";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

const FormInputDatePicker = ({
  rules = null,
  name,
  control,
  label,
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
      }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            size="small"
            {...rest}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            name={name}
            inputRef={ref}
            helperText={error ? error.message : null}
            error={!!error}
            fullWidth
            label={label}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-input": {
                padding: "8.5px 14px",
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default React.memo(FormInputDatePicker);
