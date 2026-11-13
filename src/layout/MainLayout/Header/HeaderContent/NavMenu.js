// components/NavMenu.js
import PropTypes from "prop-types";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";



const NavMenu = ({ links }) => {
  return (
    <List sx={{ width: '100%' }}>
      {links.map(({ label, to, icon }, idx) => (
        <ListItem key={idx} disablePadding>
          <ListItemButton
            component={RouterLink}
            to={to}
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: "1px solid",
              borderColor: "grey.300",
              '&:hover': {
                bgcolor: 'grey.100',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'grey.600' }}>
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={label}
              primaryTypographyProps={{
                fontSize: 15,
                color: 'grey.800',
                fontWeight: '500',
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

NavMenu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    })
  ).isRequired,
};

export default NavMenu;
