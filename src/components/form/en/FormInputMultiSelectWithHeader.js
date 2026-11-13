// import React from 'react';
// import { Controller } from 'react-hook-form';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import Checkbox from '@mui/material/Checkbox';
// import { createFilterOptions } from '@mui/material/Autocomplete';
// import { ListItemText } from '@mui/material';

// const FormInputMultiSelect = ({
//   name,
//   rules = null,
//   control,
//   options,
//   label,
//   onSelect,
//   sx,
//   ...rest
// }) => {
//   const filter = createFilterOptions();

//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={rules}
//       render={({ field }) => (
//         <Autocomplete
//           {...field}
//           multiple
//           options={options}
//           disableCloseOnSelect
//           getOptionLabel={(option) => option.name}
//           filterOptions={(options, params) => {
//             const filtered = filter(options, params);
//             console.log("haha filtered",filtered)

//             // Suggest the creation of a new value
//             // if (params.inputValue !== '') {
//             //   filtered.push({
//             //     inputValue: params.inputValue,
//             //     label: `Add "${params.inputValue}"`,
//             //   });
//             // }

//             return filtered;
//           }}
//           onChange={(event, newValue) => {
//             field.onChange(newValue);
//             if (onSelect) {
//               onSelect(newValue);
//             }
//           }}
//           isOptionEqualToValue={(option, value) => option.id === value.id}
//           renderOption={(props, option, { selected }) => (
//             <li {...props}>
//               <Checkbox
//                 checked={selected}
//                 style={{ marginRight: 8 }}
//               />
//               <ListItemText primary={option.name} />
//             </li>
//           )}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label={label}
//               variant="outlined"
//               sx={sx}
//               {...rest}
//             />
//           )}
//         />
//       )}
//     />
//   );
// };

// export default FormInputMultiSelect;

import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

const FormInputSelect = ({
  name,
  rules = null,
  id,
  control,
  options,
  label,
  onSelect,
  sx,
  defaultValue = [],
  ...rest
}) => {
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref } }) => (
        <Autocomplete
          multiple
          options={options}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          groupBy={(option) => option.type}
          value={options.filter((option) => value.includes(option.id))}
          onChange={(event, newValue) => {
            onChange(newValue.map((option) => option.id));
            if (onSelect) {
              onSelect(newValue);
            }
          }}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                style={{ marginRight: 8 }}
                checked={selected}
              />
              <ListItemText primary={option.name} />
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              size="small"
              sx={sx}
            />
          )}
          {...rest}
        />
      )}
      rules={rules}
    />
  );
};

export default FormInputSelect;

