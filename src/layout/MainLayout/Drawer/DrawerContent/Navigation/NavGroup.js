import PropTypes from "prop-types";
import {useSelector} from "react-redux";

import * as React from "react";
// material-ui
import {Box, List, Typography} from "@mui/material";
// import StarBorder from '@mui/icons-material/StarBorder';
// project import
import NestedMenuItem from "./NestedMenuItem";

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const menu = useSelector((state) => state.menu);
  const { drawerOpen } = menu;

  // const [open, setOpen] = React.useState(true);
  //
  // const handleClick = () => {
  //   setOpen(!open);
  // };

  // const navCollapse = item.children?.map((menuItem) => {
  //   switch (menuItem.type) {
  //     case "collapse":
  //       // console.log(menuItem.children[0].title);
  //       console.log(menuItem);
  //
  //       return (
  //         // <Typography key={menuItem.id} variant="caption" color="error" sx={{ p: 2.5 }}>
  //         //   collapse - only available in paid version
  //         // </Typography>
  //         // <List key={menuItem.id} item={menuItem} level={1} >
  //         // {menuItem.title}
  //         // </List>
  //         <List key={menuItem.id}>
  //           <ListItemButton onClick={handleClick} sx={{ px: 3.3 }}>
  //             <ListItemIcon>
  //               <AccountCircleIcon />
  //             </ListItemIcon>
  //             <ListItemText primary={menuItem.title} sx={{ px: 1 }} />
  //             {open ? <ExpandLess /> : <ExpandMore />}
  //           </ListItemButton>
  //           <Collapse in={open} timeout="auto" unmountOnExit>
  //             <List component="div" disablePadding>
  //               <ListItemButton sx={{ pl: 8 }}>
  //                 <ListItemIcon>
  //                   <AccountCircleIcon />
  //                 </ListItemIcon>
  //                 <ListItemText primary={menuItem.title} sx={{ px: 1 }} />
  //               </ListItemButton>
  //             </List>
  //           </Collapse>
  //         </List>
  //       );
  //     case "item":
  //       return <NavItem key={menuItem.id} item={menuItem} level={1} />;
  //     default:
  //       return (
  //         <Typography
  //           key={menuItem.id}
  //           variant="h6"
  //           color="error"
  //           align="center"
  //         >
  //           Fix - Group Collapse or Items
  //         </Typography>
  //       );
  //   }
  // });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
            {/* only available in paid version */}
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {item.children.map((menuItem) => (
        <NestedMenuItem key={menuItem.id} menuItem={menuItem} />
      ))}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
