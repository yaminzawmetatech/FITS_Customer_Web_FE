import { useRef, useState } from "react";
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  ClickAwayListener,
  IconButton,
  Stack,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

import { logout, reset } from "../../../../../features/auth/authSlice";
import avatar3 from "../../../../../assets/images/users/avator3.jpg";
import ProfileTab from "./ProfileTab";

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userName = user?.username || "";

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={{ position: "relative", flexShrink: 0, ml: 0.75 }}>
        <ButtonBase
          ref={anchorRef}
          onClick={handleToggle}
          sx={{
            p: 0.25,
            borderRadius: 1,
            bgcolor: open ? "grey.300" : "transparent",
            "&:hover": { bgcolor: "secondary.lighter" },
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
            <Avatar alt="profile user" src={avatar3} sx={{ width: 45, height: 45 }} />
            <Typography variant="subtitle1">{userName}</Typography>
          </Stack>
        </ButtonBase>

        {open && (
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              right: 0,
              top: "100%",
              mt: 1,
              zIndex: 10,
              width: 260,
              borderRadius: 1,
              boxShadow: theme.customShadows?.z1 || theme.shadows[3],
            }}
          >
            <Box sx={{ p: 2 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar src={avatar3} sx={{ width: 45, height: 45 }} />
                <Typography variant="h6" noWrap>
                  {userName}
                </Typography>
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              <Stack>
                <ProfileTab  handleLogout={handleLogout}/>
              </Stack>
            </Box>
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export default Profile;
