import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import {
  Breadcrumbs,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux'
import { MaterialReactTable } from "material-react-table";
import { useCallback, useMemo, useState, useEffect } from "react";
import { getApplicationSetUpList } from "../../features/applicationInformationSetup/applicationInformationSetupSlice";

const ApplicationSetupList = () => {
  // const { applicationsetupList,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   message
  // } = useSelector(
  //   (state) => state.applicationsetupList
  // )
  // const data
  // const { applicationSetup, isError, isLoading,isSuccess, message }
  //   = useSelector((state) => {
  //   console.log(state.applicationInformationSetup.applicationInformationSetUp)
  // })


  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "description", //access nested data with dot notation
        header: "Description",
        size: 200,
      },
    ],
    []
  );

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getApplicationSetUpList());
  },[dispatch]);


  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});



  const batchDelete =() =>{

    if(Object.keys(rowSelection).length === 0){
      alert('Please Select one or more rows to Delete')
      return;
    }
    if (
      !window.confirm(
        `Are you sure you want to delete selected rows?`
      )
    ) {
      return;
    }
  }
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    let id = row.original.uuid;

    exitEditingMode();

  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        !window.confirm(
          `Are you sure you want to delete ${row.getValue("name")}`
        )
      ) {
        return;
      }
    },
    []
  );

  const [rowSelection, setRowSelection] = useState({});

  // useEffect(() => {
  //   //do something when the row selection changes...
  //   // console.info({ rowSelection });
  //   // console.log(Object.keys(rowSelection));
  // }, [rowSelection]);


  // if (isLoading) {
  //   return <Spinner />
  // }

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Application Setup List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={[]}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          enableRowActions
          enableColumnResizing
          // debugTable={isError}
          columnResizeMode="onChange"
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          positionActionsColumn="last"
          enablePinning
          enableRowSelection
          getRowId={(row) => row.uuid} //give each row a more useful id
          onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
          state={{ rowSelection,
            // isLoading:isLoading
          }}
          initialState={{
            columnPinning: {
              left: ["Name"],
              right: ["mrt-row-actions"],
            },
          }}
          renderRowActionMenuItems={({ row, table }) => [
            <MenuItem key="delete" onClick={() => handleDeleteRow(row)}>
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              Delete
            </MenuItem>,
          ]}
          renderTopToolbarCustomActions={({ table }) => {
            return (
              <>
                <div
                  style={{
                    width:'90%',
                    padding: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    // gap: "0.5rem",
                  }}
                >
                  <Button
                    onClick={() => setCreateModalOpen(true)}
                    variant="contained"
                  >
                    Create New
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => batchDelete()}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </div>
              </>
            );
          }}
        />
      </Paper>
    </Box>
  );
};

export default ApplicationSetupList;
