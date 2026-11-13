import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  CircularProgress,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import {
  getIncompleteFields,
  getKPayFields,
  notifyIncompleteFields,
  saveIncompleteFields,
  updateIncompleteFields,
} from "features/incompleteFields/incompleteFieldsSlice";
import CommonMessage from "common/CommonMessage";
import { showSuccessToast } from "common/ToastMessage";
import Accordion from "../../../../components/Accordion";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ToolbarIncompleteFieldsModal = ({ open, handleClose }) => {
  const { uuid, categoryId, id } = useParams();

  const dispatch = useDispatch();
  const [notiState, setNotiState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifyLoading, setNotifyLoading] = useState(false);

  const { kpayFields } = useSelector((state) => state.kpayFields);
  const { incompleteFields } = useSelector((state) => state.incompleteFields);

  useEffect(() => {
    dispatch(getKPayFields({ uuid }));
    dispatch(getIncompleteFields({ id }));
  }, [uuid, categoryId, id, dispatch]);

  useEffect(() => {
    if (incompleteFields?.length > 0) {
      if (incompleteFields[0]?.is_notified === 1) {
        setNotiState(true);
      } else {
        setNotiState(false);
      }
    } 
    else {
      setNotiState(true);
    }
  }, [incompleteFields]);

  useEffect(() => {
    if (incompleteFields?.length > 0 && open) {
      const initialSelectedFields = {};

      // change array format
      incompleteFields?.forEach((field) => {
        if (field.is_notified === 0) {
          const parsedFields = JSON.parse(field?.fields);
          parsedFields &&
            Object.entries(parsedFields).forEach(([key, value]) => {
              const group = value?.group || field?.group;
              if (!initialSelectedFields[group]) {
                initialSelectedFields[group] = [];
              }
              initialSelectedFields[group].push({
                id: value?.id,
                title: value?.title,
                value: value?.value,
                type: value?.type,
                group: group,
              });
            });
        }
      });
      setSelectedFields(initialSelectedFields);
    }
  }, [incompleteFields, open]);

  const initialSelectedFields =
    kpayFields?.fields?.reduce((acc, field) => {
      acc[field.group] = [];
      return acc;
    }, {}) || {};

  const [selectedFields, setSelectedFields] = useState(initialSelectedFields);

  const handleAutocompleteChange = (group) => (event, newValue) => {
    const removedItemIds = newValue.map((item) => item.id);
    const duplicates = removedItemIds?.filter(
      (item, index) => removedItemIds?.indexOf(item) !== index
    );
    const updatedSelected = newValue?.filter(
      (item) => !duplicates?.includes(item.id)
    );

    setSelectedFields((prevSelected) => ({
      ...prevSelected,
      [group]: updatedSelected,
    }));
  };

  // save and update incomplete fields function
  const handleOk = async () => {
    setLoading(true);
    const fields = Object.keys(selectedFields).reduce((acc, group) => {
      return acc.concat(selectedFields[group].map((item) => ({ ...item })));
    }, []);
    try {
      await dispatch(
        saveIncompleteFields({ body: { application_id: id, fields } })
      ).unwrap();

      await dispatch(getIncompleteFields({ id }));
      showSuccessToast(CommonMessage.MFS00007);
      //handleClose();
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    const fields = Object.keys(selectedFields).reduce((acc, group) => {
      return acc.concat(selectedFields[group].map((item) => ({ ...item })));
    }, []);
    try {
      await dispatch(
        updateIncompleteFields({
          uuid: incompleteFields[0]?.uuid,
          body: { fields },
        })
      ).unwrap();
      await dispatch(getIncompleteFields({ id }));
      showSuccessToast(CommonMessage.MFS00008);
      //handleClose();
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // notification function
  const handleNotify = async () => {
    setNotifyLoading(true);
    try {
      await dispatch(
        notifyIncompleteFields({ uuid: incompleteFields[0]?.uuid })
      ).unwrap();
      await dispatch(getIncompleteFields({ id }));
      showSuccessToast(CommonMessage.MFS00009);
      handleClose();
      setNotifyLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setNotifyLoading(false);
    }
  };

  // cancel function and change to initial state
  const handleCancel = () => {
    setSelectedFields(initialSelectedFields);
    handleClose();
  };

  if (!kpayFields || !incompleteFields) {
    return null; // Render null until both kpayFields and incompleteFields are available
  }

  // render a modal for incomplete fields if kpayFields and incompleteFields are available
  if (kpayFields && incompleteFields) {
    return (
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "35%" } }}
        maxWidth="md"
        open={open}
      >
        <DialogTitle
          id="scroll-dialog-title"
          variant="h5"
          sx={{ color: "#1890ff" }}
        >
          Fields List
        </DialogTitle>
        <DialogContent dividers>
          <Accordion title="Application">
            {Object.entries(
              kpayFields?.fields?.reduce((acc, field) => {
                const group = field.group;
                if (!acc[group]) {
                  acc[group] = [];
                }
                acc[group].push(field);
                return acc;
              }, {})
            ).map(([group, options]) => (
              <Grid item xs={10} key={group} sx={{ marginBottom: "20px" }}>
                <Autocomplete
                  multiple
                  options={options ?? []}
                  //groupBy={(option) => option.group}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.value}
                  onChange={handleAutocompleteChange(group)}
                  value={selectedFields[group] || []} // Set value based on selectedFields state
                  renderOption={(props, option, { selected }) => {
                    const isSelected = !!selectedFields[group]?.find(
                      (item) => item.id === option.id
                    );

                    return (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={isSelected}
                        />
                        {option.value}
                      </li>
                    );
                  }}
                  // style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={group}
                      placeholder="Choose fields"
                    />
                  )}
                />
              </Grid>
            ))}
          </Accordion>

          {kpayFields?.guarantors?.map((guarantor, index) => (
            <Accordion title={`Guarantor ${guarantor.full_name}`} key={index}>
              {guarantor?.fields &&
                Object.entries(
                  guarantor?.fields?.reduce((acc, field) => {
                    const group = field.group;
                    if (!acc[group]) {
                      acc[group] = [];
                    }
                    acc[group].push(field);
                    return acc;
                  }, {})
                ).map(([group, options]) => (
                  <Grid item xs={10} sx={{ marginBottom: "20px" }} key={group}>
                    <Autocomplete
                      multiple
                      options={options ?? []}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.value}
                      onChange={handleAutocompleteChange(group)}
                      value={selectedFields[group] || []}
                      renderOption={(props, option, { selected }) => {
                        const isSelected = !!selectedFields[group]?.find(
                          (item) => item.id === option.id
                        );

                        return (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={isSelected}
                            />
                            {option.value}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={group.replace(/\d+$/, "")}
                          placeholder="Choose fields"
                        />
                      )}
                    />
                  </Grid>
                ))}
            </Accordion>
          ))}
          {kpayFields?.references?.map((reference, index) => (
            <Accordion title={`Reference ${reference.full_name}`} key={index}>
              {reference?.fields &&
                Object.entries(
                  reference?.fields?.reduce((acc, field) => {
                    const group = field.group;
                    if (!acc[group]) {
                      acc[group] = [];
                    }
                    acc[group].push(field);
                    return acc;
                  }, {})
                ).map(([group, options]) => (
                  <Grid item xs={10} sx={{ marginBottom: "20px" }} key={group}>
                    <Autocomplete
                      multiple
                      options={options ?? []}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.value}
                      onChange={handleAutocompleteChange(group)}
                      value={selectedFields[group] || []}
                      renderOption={(props, option, { selected }) => {
                        const isSelected = !!selectedFields[group]?.find(
                          (item) => item.id === option.id
                        );

                        return (
                          <li {...props}>
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              checked={isSelected}
                            />
                            {option.value}
                          </li>
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={group.replace(/\d+$/, "")}
                          placeholder="Choose fields"
                        />
                      )}
                    />
                  </Grid>
                ))}
            </Accordion>
          ))}
        </DialogContent>

        <DialogActions sx={{ marginBottom: "10px", marginTop: "10px" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleCancel}
            disabled={loading || notifyLoading}
          >
            Cancel
          </Button>
          {notiState ? (
            <Button
              variant="contained"
              onClick={handleOk}
              disabled={notifyLoading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleUpdate}
              disabled={notifyLoading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Update
            </Button>
          )}

          <Button
            variant="outlined"
            onClick={handleNotify}
            disabled={notiState || loading}
            startIcon={notifyLoading && <CircularProgress size={20} />}
          >
            Notify
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default React.memo(ToolbarIncompleteFieldsModal);
