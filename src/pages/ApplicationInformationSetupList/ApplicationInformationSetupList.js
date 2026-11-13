import * as React from "react";
import { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from '@mui/material/Chip';
import { MaterialReactTable } from "material-react-table";
import {
  Typography,
  Breadcrumbs,
  MenuItem,
  ListItemIcon
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationSetupList } from "../../features/ApplicationInformationSetupList/ApplicationInformationSetupSlice";
import { Link,} from "react-router-dom";
import { Edit } from "@mui/icons-material";

const ApplicationInfrmationSetupList = () => {

  const dispatch = useDispatch();

  const { applicationInformationSetupList, isLoading,} = useSelector( (state) => state.applicationInformationSetupList);
 
  useEffect(()=>{
    dispatch(getApplicationSetupList());
  },[dispatch]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 130,
      },
      {
        accessorKey: "category.name_en",
        header: "Product Category",
        size: 100,
        accessorFunction: (data) => data.category.name_en,
      },
      {
        accessorKey: "application_fields",
        header: "Application Fields",
        size: 200,
        Cell: ({ cell }) => (
          <Box component="span">
            {Object.values(cell.getValue())?.map((field, index) => (
              <Chip label={field.value} key={index} sx={{ m: 0.5 }} color={field.required ? 'warning' : 'default'} variant ="outlined"  />
            ))}
          </Box>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 100,
        accessorFunction: (data) => data.description,
      }
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }} className = "margin-top-8" >
        <Typography color="text.primary">Administration</Typography>
        <Typography color="text.primary">Application Setup List</Typography>
      </Breadcrumbs>
      <Paper sx={{ width: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={applicationInformationSetupList ?? []}
          muiTableContainerProps={{ sx: { maxHeight: "calc(100vh - 220px)" } }}
          enableStickyHeader
          enableColumnOrdering
          enableRowActions
          enableColumnResizing
          columnResizeMode="onChange"
          positionActionsColumn="last"
          enablePinning
          state={{ isLoading: isLoading}}
          initialState={{
            columnPinning: {
              left: ["Name"],
              right: ["mrt-row-actions"],
            },
          }}
          renderRowActionMenuItems={({ row, table }) => [
            <MenuItem
              component={Link}
              to={`/dashboard/administration/application-info-setup/${row.original.uuid}`}
              key="edit"
            >
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              Edit
            </MenuItem>,
            // <MenuItem key="delete" onClick={() => handleDeleteRow(row)}>
            //   <ListItemIcon>
            //     <Delete />
            //   </ListItemIcon>
            //   Delete
            // </MenuItem>,
          ]}
        />
      </Paper>
    </Box>
  );
};

export default ApplicationInfrmationSetupList;
