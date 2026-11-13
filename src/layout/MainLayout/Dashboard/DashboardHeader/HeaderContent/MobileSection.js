import { useState } from "react";
import {
  useTheme,
  useMediaQuery,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Link,
  Typography
} from "@mui/material";

// project imports
import Search from "./Search";
import Profile from "./Profile";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CalculateIcon from "@mui/icons-material/Calculate";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import CloseIcon from "@mui/icons-material/Close";

// assets
import { MoreOutlined } from "@ant-design/icons";
import NavMenu from "./NavMenu";

// ==============================|| HEADER CONTENT - MOBILE (Drawer) ||============================== //

const MobileSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:760px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/", icon: <HomeIcon /> },
    { label: "About Us", to: "/about", icon: <InfoIcon /> },
    { label: "Loan Calculator", to: "/loan-calculator", icon: <CalculateIcon /> },
    { label: "Apply Now", to: "/apply-now", icon: <AssignmentIcon /> },
    { label: "Contact Us", to: "/contact", icon: <ContactPhoneIcon /> },
  ];

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <Box sx={{ flexShrink: 0 }}>
        <IconButton
          color="inherit"
          onClick={toggleDrawer(true)}
          sx={{ bgcolor: "grey.100" }}
        >
          <MoreOutlined />
        </IconButton>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { width: '80vw', maxWidth: 300 } }}
      >
        <Box sx={{ px: 2 }}>
          <Toolbar sx={{ justifyContent: "flex-end", px: 0 }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Toolbar>

          {/* Optional Search */}
          {/* <Box sx={{ mb: 2 }}>
            <Search />
          </Box> */}

          {/* Profile */}
          <Box sx={{ mb: 2 }}>
            <Profile />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Navigation */}
          {/* <List>
            {navLinks.map(({ label, to, icon }, idx) => (
              <ListItem key={idx} disablePadding>
                <ListItemButton
                  component={Link}
                  href={to}
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: "1px solid",
                    borderColor: "grey.300",
                    '&:hover': {
                      bgcolor: 'grey.100',
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 36,
                      color: 'grey.600',
                    }}
                  >
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
          </List> */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <NavMenu links={navLinks} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileSection;
