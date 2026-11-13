import React, { useEffect, useState, useMemo } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm } from "react-hook-form";
import { Grid, Button } from "@mui/material";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Checkbox from "@mui/material/Checkbox";
import { getProjectCategory } from "../../features/projectcategory/projectcategorySlice";
import { DateTimePicker } from "@mui/x-date-pickers";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AdvancedSearch = ({
  options,
  status,
  onSearch,
  searchValue,
  searchCategory,
  searchValueDate,
  mode,
  autoSearchByClick,
}) => {
  const dispatch = useDispatch();

  const IS_TRUE_FALSE = [
    { id: "1", name: "Yes" },
    { id: "0", name: "No" },
  ];

  const IS_TRUE = [{ id: "1", name: "Yes" }];

  const PAYMENT_STATUS = [
    { id: "Paid", name: "Paid" },
    { id: "Unpaid", name: "Unpaid" },
    { id: "Partial", name: "Partial" },
  ];

  const DEALER_TYPE = [
    { id: "Normal", name: "Normal" },
    { id: "Special", name: "Special" },
  ];

  const RENEWAL_TYPE = [
    { id: "License", name: "License" },
    { id: "Insurance", name: "Insurance" },
  ];

  const DEALER_CONTACT_PERSON_TYPE = [
    { id: "Authorized Signer", name: "Authorized Signer" },
    { id: "Main Contact", name: "Main Contact" },
    { id: "Disbursement", name: "Disbursement" },
    { id: "Agent", name: "Agent" },
    { id: "Main Person for Credit", name: "Main Person for Credit" },
  ]

  const SURVEY_TYPES = [
    { id: "inhouse_survey", name: "In House Survey" },
    { id: "field_survey", name: "Field Survey" },
  ];

  // const CURRENT_STEP = [
  //   { id: 2, name: "Loan" },
  //   { id: 3, name: "Field Survey" },
  // ]

  const [filteredOptions, setFilteredOptions] = useState(options); // filteredOptions state
  const [selectedCategory, setSelectedCategory] = useState();

  const { handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      filters: [{ filtered_by: "", value1: "", value2: "", type: "" }],
    },
  });

  const { projectCategories } = useSelector((state) => state.projectCategories);


  const filters = watch("filters");

  let dateValue = autoSearchByClick === "total_allocated" ? dayjs() : null;

  useEffect(() => {
    const searchValueArr = [];

    if (searchValue) {
      searchValueArr.push(searchValue);
      const filters = [
        {
          filtered_by: "status_array",
          value1: searchValueArr,
          value2: "",
          type: "autocomplete_status",
        },
      ];
      setValue("filters", filters);
    }
  }, [searchValue]);


  const onSubmit = (data) => {
    if (onSearch) {
      onSearch(data.filters); // pay filters array to child component
    }
  };

  // add function
  const handleAddFilter = () => {
    setValue("filters", [
      ...filters,
      { filtered_by: "", value1: "", value2: "", type: "" },
    ]);
  };

  // remove function
  const handleRemoveFilter = (index) => {
    setValue(
      "filters",
      filters.filter((_, i) => i !== index)
    );

    const remainingFilters = filters.filter((_, i) => i !== index);
    const tempFilteredOptions = options.filter((opt) =>
      remainingFilters.every((item) => item.filtered_by !== opt.id)
    );
    setFilteredOptions(tempFilteredOptions); // re_add removed option in filtered aray
  };

  //filter by
  const handleFilteredChange = (index, selectedValue) => {
    const option = options.find((option) => option.id === selectedValue);
    const updatedFilters = [...filters];
    updatedFilters[index].filtered_by = option?.id || "";
    updatedFilters[index].type = option?.type || "";
    setValue("filters", updatedFilters);

    // for autocomplete
    if (option?.type === "autocomplete_category") {
      dispatch(getProjectCategory());
    }
    // remove selected option in filtered aray
    const tempFilteredOptions = options.filter((opt) =>
      updatedFilters.every((item) => item.filtered_by !== opt.id)
    );

    setFilteredOptions(tempFilteredOptions);
  };

  const handleSelectValueChange = (index, selectedValue) => {
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = selectedValue || "";
    setValue("filters", updatedFilters);
  };

  const handleSelectStatusChange = (index, selectedValues) => {
    const updatedFilters = [...filters];
    updatedFilters[index].value1 =
      selectedValues.map((value) => value.id) || [];
    setValue("filters", updatedFilters);
  };

  const handleInputChange = (index, inputValue) => {
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = inputValue;
    setValue("filters", updatedFilters);
  };

  const handleMonthPickerChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = formattedDate;
    setValue("filters", updatedFilters);
  };

  const handleCurrentMonthPickerChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = formattedDate;
    setValue("filters", updatedFilters);
  };

  const handleFromDateChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = formattedDate;
    setValue("filters", updatedFilters);
  };

  const handleToDateChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value2 = formattedDate;
    setValue("filters", updatedFilters);
  };

  const handleFromDateTimeChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = formattedDate;
    setValue("filters", updatedFilters);
  };

  const handleMonthYearChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value1 = formattedDate;
    setValue("filters", updatedFilters);
  };

  const handleToDateTimeChange = (index, date) => {
    const formattedDate = date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "";
    const updatedFilters = [...filters];
    updatedFilters[index].value2 = formattedDate;
    setValue("filters", updatedFilters);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fafafb",
          color: "black",
          boxShadow: "none",
          mb: 2,
          borderBottom:
            mode === "divide_mode" ? "none" : "1px solid rgb(167, 173, 182)",
          mt: -1,
          paddingTop: "10px",
          paddingBottom: mode === "divide_mode" ? "0px" : "10px",
        }}
      >
        {filters.map((filter, index) => (
          <Grid
            container
            spacing={1}
            alignItems="center"
            key={index}
            sx={{ marginTop: "1px" }}
          >
            {/* <Grid item xs={5} sm={4} md={2} lg={2}> */}
            <Grid
              item
              xs={mode === "divide_mode" ? 5 : 5}
              sm={mode === "divide_mode" ? 4 : 4}
              md={mode === "divide_mode" ? 3 : 2}
              lg={mode === "divide_mode" ? 3 : 2}
            >
              <Autocomplete
                options={filteredOptions}
                getOptionLabel={(option) => option.name || ""}
                value={
                  options.find((option) => option.id === filter.filtered_by) ||
                  null
                }
                onChange={(e, newValue) =>
                  handleFilteredChange(index, newValue?.id || "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filtered By"
                    variant="outlined"
                  />
                )}
                size="small"
                name="filtered_test"
              />
            </Grid>
            {filter.type === "text_field" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <TextField
                  value={filter.value1}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  label="Value"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_status" && (
              //<Grid item xs={5} sm={4}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
              // md={mode === "divide_mode" ?? 3}
              // lg={mode === "divide_mode" ?? 3}
              >
                <Autocomplete
                  multiple
                  limitTags={mode === "divide_mode" ? 1 : 2}
                  id="multiple-limit-tags"
                  disableCloseOnSelect
                  options={status}
                  getOptionLabel={(option) => option.name || ""}
                  value={status.filter((option) =>
                    filter.value1.includes(option.id)
                  )}
                  onChange={(e, newValue) =>
                    handleSelectStatusChange(index, newValue || [])
                  }
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} label="Status" />
                  )}
                />
              </Grid>
            )}
            {filter.type === "autocomplete_is_true_false" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={IS_TRUE_FALSE}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    IS_TRUE_FALSE.find((item) => item.id === filter.value1) ||
                    null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_is_true" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={IS_TRUE}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    IS_TRUE.find((item) => item.id === filter.value1) || null
                  }
                  onChange={(e, newValue) =>
                    handleSelectValueChange(index, newValue?.id || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                  size="small"
                />
              </Grid>
            )}
            {filter.type === "autocomplete_category" && (
              //<Grid item xs={5} sm={4} md={2} lg={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 5}
                sm={mode === "divide_mode" ? 4 : 4}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <Autocomplete
                  options={projectCategories}
                  getOptionLabel={(option) => option.name_en || ""}
                  value={
                    projectCategories.find(
                      (item) => item.id === filter.value1
                    ) || null
                  }
                  onChange={(e, newValue) => {
                    handleSelectValueChange(index, newValue?.id || "");
                    setSelectedCategory(newValue?.id);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="outlined"
                    />
                  )}
                  size="small"
                />
              </Grid>
            )}
                        {filter.type === "date" && (
              <>
                {/* <Grid item xs={5} sm={4} md={2} lg={2}> */}
                <Grid
                  item
                  xs={mode === "divide_mode" ? 5 : 5}
                  sm={mode === "divide_mode" ? 4 : 4}
                  md={mode === "divide_mode" ? 3 : 2}
                  lg={mode === "divide_mode" ? 3 : 2}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{ textField: { size: "small" } }}
                      label="From Date"
                      onChange={(date) => handleFromDateChange(index, date)}
                      //value={filter.value1 ? dayjs(filter.value1).toDate() : null}
                      value={
                        filter.filtered_by === "assigned_date"
                          ? dateValue
                          : null
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                {/* <Grid item xs={5} sm={4} md={2} lg={2}> */}
                <Grid
                  item
                  xs={mode === "divide_mode" ? 5 : 5}
                  sm={mode === "divide_mode" ? 4 : 4}
                  md={mode === "divide_mode" ? 3 : 2}
                  lg={mode === "divide_mode" ? 3 : 2}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{ textField: { size: "small" } }}
                      label="To Date"
                      onChange={(date) => handleToDateChange(index, date)}
                      //value={filter.value2 ? dayjs(filter.value2).toDate() : null}
                      value={
                        filter.filtered_by === "assigned_date"
                          ? dateValue
                          : null
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </>
            )}
            {filter.type === "date_month" && (
              // <Grid item xs={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 2}
                sm={mode === "divide_mode" ? 4 : 2}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={["year", "month"]}
                    slotProps={{ textField: { size: "small" } }}
                    label="Month"
                    onChange={(date) => handleMonthPickerChange(index, date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            )}
            {filter.type === "current_date_month" && (
              //<Grid item xs={2}>
              <Grid
                item
                xs={mode === "divide_mode" ? 5 : 2}
                sm={mode === "divide_mode" ? 4 : 2}
                md={mode === "divide_mode" ? 3 : 2}
                lg={mode === "divide_mode" ? 3 : 2}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={["year", "month"]}
                    slotProps={{ textField: { size: "small" } }}
                    label="Month"
                    onChange={(date) =>
                      handleCurrentMonthPickerChange(index, date)
                    }
                    value={filter.value1 ? dayjs(filter.value1) : dayjs()}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={dayjs()}
                  />
                </LocalizationProvider>
              </Grid>
            )}
            {filter.type === "date_time" && (
              <>
                {/* <Grid item xs={2}> */}
                <Grid
                  item
                  xs={mode === "divide_mode" ? 5 : 5}
                  sm={mode === "divide_mode" ? 4 : 4}
                  md={mode === "divide_mode" ? 3 : 2}
                  lg={mode === "divide_mode" ? 3 : 2}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      slotProps={{ textField: { size: "small" } }}
                      label="From Date"
                      onChange={(date) => handleFromDateTimeChange(index, date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                {/* <Grid item xs={2}> */}
                <Grid
                  item
                  xs={mode === "divide_mode" ? 5 : 5}
                  sm={mode === "divide_mode" ? 4 : 4}
                  md={mode === "divide_mode" ? 3 : 2}
                  lg={mode === "divide_mode" ? 3 : 2}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      slotProps={{ textField: { size: "small" } }}
                      label="To Date"
                      onChange={(date) => handleToDateTimeChange(index, date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </>
            )}
            {filter.type === "month_year" && (
              <>
                {/* <Grid item xs={2}> */}
                <Grid
                  item
                  xs={mode === "divide_mode" ? 5 : 5}
                  sm={mode === "divide_mode" ? 4 : 4}
                  md={mode === "divide_mode" ? 3 : 2}
                  lg={mode === "divide_mode" ? 3 : 2}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={["year", "month"]}
                      slotProps={{ textField: { size: "small" } }}
                      label=""
                      onChange={(date) => handleMonthYearChange(index, date)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </>
            )}
          </Grid>
        ))}
        
        <Grid container spacing={1} sx={{ marginTop: "1px" }}>
          {/* <Grid item xs={4} sm={4} md={2} lg={2}> */}
          <Grid
            item
            xs={mode === "divide_mode" ? 4 : 4}
            sm={mode === "divide_mode" ? 4 : 4}
            md={mode === "divide_mode" ? 3 : 2}
            lg={mode === "divide_mode" ? 3 : 2}
          >
            <Button
              variant="outlined"
              onClick={handleAddFilter}
              sx={{ marginRight: "10px" }}
              size="small"
            >
              Add Filter
            </Button>
            <Button variant="contained" type="submit" size="small">
              Search
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </form>
  );
};

export default AdvancedSearch;
