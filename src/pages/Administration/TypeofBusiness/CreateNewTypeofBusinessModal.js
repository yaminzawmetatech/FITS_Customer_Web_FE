import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormGroup";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";

export const CreateNewTypeofBusinessModal = ({
  open,
  columns,
  onClose,
  onSubmit,
}) => {
  const [values, setValues] = useState({
    code: "",
    name: "",
    description: "",
  });

  // const [values, setValues] = useState(() =>
  //   columns.reduce((acc, column) => {
  //     acc[column.accessorKey ?? ""] = "";
  //     return acc;
  //   }, {})
  // );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Type of Business</DialogTitle>
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
            <TextField
              key="code"
              label="Code"
              name="code"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
            <TextField
              key="name"
              label="Name"
              name="name"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
            <TextField
              key="description"
              label="Description"
              name="description"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
            {/* {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))} */}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Create Type of Business
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNewTypeofBusinessModal;
