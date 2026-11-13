import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  createSubBusinessCategory,
  // getSubBusinessCategoryByUuid,
  getSubBusinessCategories,
  updateSubBusinessCategory,
} from "../../../features/subbusinesscategory/subbusinesscategorySlice";
//import { getCategories } from "features/category/categorySlice";
import { getMainBusinessCategories } from "../../../features/mainbusinesscategory/mainbusinesscategorySlice";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CreateNewSubBusinessCategoryModal = ({
  open,
  onClose,
  isEdit,
  data,
}) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    main_business_category_id: "",
    bc2_code: "",
    bc2_name: "",
    bc2_name_mm: "",
  });

  const { mainBusinessCategories, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.mainBusinessCategories);

  useEffect(() => {
    dispatch(getMainBusinessCategories());
  }, []);

  const handleCreateSubmit = () => {
    //put your validation logic here
    // onSubmit(values);
    dispatch(createSubBusinessCategory(values));
    dispatch(getSubBusinessCategories());
    onClose();
  };

  const handleEditSubmit = () => {
    // dispatch(updateSubBusinessCategory(data.uuid, values));
    dispatch(getSubBusinessCategories());
    onClose();
  };

  return (
    <Dialog open={open}>
      {isEdit ? (
        <DialogTitle textAlign="center">
          Edit New Sub Business Category
        </DialogTitle>
      ) : (
        <DialogTitle textAlign="center">
          Create New Sub Business Category
        </DialogTitle>
      )}

      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
              mt: 1,
            }}
          >
            <Autocomplete
              disablePortal
              id="main_business_category_id"
              name="main_business_category_id"
              options={mainBusinessCategories}
              getOptionLabel={(option) => option.bc1_name}
              sx={{ my: 3 }}
              renderInput={(params) => (
                <TextField {...params} label="Main Business Category" />
              )}
              onChange={(e, value, reason) => {
                setValues({ ...values, main_business_category_id: value?.id });
              }}
            />

            <TextField
              key="bc2_code"
              label="BC2 Code"
              name="bc2_code"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
            <TextField
              key="bc2_name"
              label="BC2 Name"
              name="bc2_name"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
            <TextField
              key="bc2_name_mm"
              label="BC2 Name Burmese"
              name="bc2_name_mm"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
          </Stack>

          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
              mt: 1,
            }}
          >
            {/* <TextField
              key="description"
              label="Description"
              name="description"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            /> */}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        {isEdit ? (
          <Button onClick={handleEditSubmit()} variant="contained">
            Update Sub Business Category
          </Button>
        ) : (
          <Button onClick={handleCreateSubmit} variant="contained">
            Create Sub Business Category
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewSubBusinessCategoryModal;
