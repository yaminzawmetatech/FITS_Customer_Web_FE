import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";

import * as React from "react";
import {forwardRef, useEffect, useState} from "react";
// material-ui
import { Box, List, Stack } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import StarBorder from '@mui/icons-material/StarBorder';
// project import
import {useTheme} from "@mui/material/styles";
import {Link, useLocation} from "react-router-dom";
import {activeItem} from "../../../../../store/reducers/menu";

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NestedMenuItem = ({ menuItem, level = 1 }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const auth = useSelector((state) => state.auth.user);

  //show hide menus by permissions
  // const show = auth?.permissions.includes(menuItem?.permission) ?? false;
  const show = true;

  const { drawerOpen, openItem } = useSelector((state) => state.menu);

  let itemTarget = "_self";
  if (menuItem.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link ref={ref} {...props} to={menuItem.url} target={itemTarget} />
    )),
  };
  if (menuItem?.external) {
    listItemProps = { component: "a", href: menuItem.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch(activeItem({ openItem: [id] }));
  };

  const Icon = menuItem.icon;
  const itemIcon = menuItem.icon ? (
    <Icon style={{ fontSize: drawerOpen ? "1rem" : "1.25rem" }} />
  ) : (
    false
  );

  const isSelected = openItem.findIndex((id) => id === menuItem.id) > -1;

  // active menuItem item on page load
  useEffect(() => {
    if (pathname.includes(menuItem.url)) {
      dispatch(activeItem({ openItem: [menuItem.id] }));
    }
    // eslint-disable-next-line
  }, [pathname]);

  const textColor = "text.primary";
  const iconSelectedColor = "primary.main";
  const [open, setOpen] = useState(pathname.split("/").includes(menuItem.id));

  const handleClick = () => {
    if (menuItem?.children?.length) {
      setOpen(!open);
    } else {
      itemHandler(menuItem.id);
    }
  };

  return (

      <div>
        {/* {(auth?.is_super ||  show) && */}
        <ListItemButton
          {...listItemProps}
          onClick={handleClick}
          disabled={menuItem.disabled}
          selected={isSelected}
          sx={{
            zIndex: 1201,
            alignItems: "start",
            pl: drawerOpen ? `${level === 1 ? 28 : level * 10 + 28}px` : 1.5,
            py: !drawerOpen && level === 1 ? 1.25 : 1,
            ...(drawerOpen && {
              "&:hover": {
                bgcolor: "primary.lighter",
              },
              "&.Mui-selected": {
                bgcolor: "primary.lighter",
                borderRight: `2px solid ${theme.palette.primary.main}`,
                color: iconSelectedColor,
                "&:hover": {
                  color: iconSelectedColor,
                  bgcolor: "primary.lighter",
                },
              },
            }),
            ...(!drawerOpen && {
              "&:hover": {
                bgcolor: "transparent",
              },
              "&.Mui-selected": {
                "&:hover": {
                  bgcolor: "transparent",
                },
                bgcolor: "transparent",
              },
            }),
          }}
        >
          {menuItem?.icon && (
            <ListItemIcon
              sx={{
                pt: 0.8,
                color: isSelected ? iconSelectedColor : textColor,
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  width: 36,
                  height: 36,
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    bgcolor: "secondary.lighter",
                  },
                }),
                ...(!drawerOpen &&
                  isSelected && {
                    bgcolor: "primary.lighter",
                    "&:hover": {
                      bgcolor: "primary.lighter",
                    },
                  }),
              }}
            >
              {itemIcon}
            </ListItemIcon>
          )}
          <ListItemText
            primary={menuItem.title}
            sx={{ px: 0 }}
            primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
          />
          {menuItem?.children?.length && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        {/* } */}
          <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
        {menuItem?.children?.map((child) => (
          <NestedMenuItem
          key={child.id}
          menuItem={child}
          level={level + 1} // Pass the incremented level to child components
          />
          ))}
          </List>
          </Collapse>

      </div>

  );
};

NestedMenuItem.propTypes = {
    menuItem: PropTypes.object,
    level: PropTypes.number,
};

export default NestedMenuItem;
