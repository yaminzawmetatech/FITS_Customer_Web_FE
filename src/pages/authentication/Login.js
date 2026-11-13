import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../../features/auth/authSlice";
import Paper from "@mui/material/Paper";
import {
  Box,
  Grid,
  Backdrop,
  CircularProgress,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import AuthBackground from "../../assets/images/auth/AuthBackground";
import Logo from "../../components/Logo";
import { toast } from 'react-toastify'; // Make sure to install and configure react-toastify

function Login() {
  const [formData, setFormData] = useState({
    personal_email: "",
    password: "",
  });

  const { personal_email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }
    
  //   // Only navigate and reset the state when a user is successfully logged in.
  //   if (isSuccess && user) {
  //     navigate("/");
  //     //dispatch(reset());
  //   }
  // }, [isError, isSuccess, user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      personal_email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AuthBackground />
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{
          minHeight: "100vh",
        }}
      >
        <Grid item xs={12} sx={{ ml: 3 }}>
          <Logo />
        </Grid>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="start"
            padding="30px"
            sx={{
              mt: 5,
              py: 5,
              minHeight: {
                xs: "calc(100vh - 134px)",
                md: "calc(100vh - 112px)",
              },
            }}
          >
            <Grid item>
              <Paper sx={{ p: 3, boxShadow: 15 }}>
                <Typography variant="h4" gutterBottom>
                  Login To Your Account
                </Typography>
                <form onSubmit={onSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="personal_email"
                        name="personal_email"
                        label="Email Address"
                        variant="outlined"
                        value={personal_email}
                        onChange={onChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={onChange}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
