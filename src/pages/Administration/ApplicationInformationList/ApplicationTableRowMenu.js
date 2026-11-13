import * as React from "react";
import { useState } from "react";
import { IconButton, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import TableRowMenu from "../../../components/TableRowMenu";
import openNewWindow from "../../../utils/windowUtils";
import DeleteIcon from "@mui/icons-material/Delete"

const ApplicationTableRowMenu = ({ data, deleteData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    await deleteData(data);
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <ConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onOk={handleDelete}
        title="Confirm Delete Application Information"
        content="Are you sure you want to delete this Application Information?"
      />

      <IconButton
        size="small"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: "1rem",
          },
        }}
      >
        <MoreVert />
      </IconButton>

      <TableRowMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            openNewWindow(
              `/CreateApplicationInformation/${data.category.name_en}/${data.category_id}/${data.uuid}/${data.id}/view`
            );
          }}
          disableRipple
        >
          <VisibilityOutlinedIcon />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            openNewWindow(
              `/CreateApplicationInformation/${data.category.name_en}/${data.category_id}/${data.uuid}/${data.id}/edit`
            );
          }}
          disableRipple
        >
          <EditIcon />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            setOpenDeleteDialog(true);
          }}
          disableRipple
        >
          <DeleteIcon />
          Delete
        </MenuItem>
      </TableRowMenu>
    </>
  );
};

export default React.memo(ApplicationTableRowMenu);
