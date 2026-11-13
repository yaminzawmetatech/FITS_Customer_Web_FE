import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { ListItemText } from '@mui/material';

const FormInputMultiSelect = ({
  name,
  rules = null,
  control,
  options,
  label,
  onSelect,
  sx,
  defaultValue = [],
  ...rest
}) => {
  const filter = createFilterOptions();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Autocomplete
          {...field}
          multiple
          limitTags={1}
          options={options}
          disableCloseOnSelect
          getOptionLabel={(option) => option.text}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            return filtered;
          }}
          onChange={(event, newValue) => {
            field.onChange(newValue);
            if (onSelect) {
              onSelect(newValue);
            }
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                checked={selected}
                style={{ marginRight: 8 }}
              />
              <ListItemText primary={option.text} />
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              size="small"
              sx={sx}
              {...rest}
            />
          )}
        />
      )}
    />
  );
};

export default FormInputMultiSelect;
