import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Checkbox,
  Grid,
  Link,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import loginBG from "./../assets/loginBG.png";
import acx_icon_nav from "./../assets/acx_icon_nav.png";
import axios from "axios";
import CryptoJS from "crypto-js";

const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setusernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const encrypt = (text) => {
    const secretKey = import.meta.env.VITE_JWT_SECRET;
    return CryptoJS.AES.encrypt(text, secretKey).toString();
  };

  const decrypt = (cipherText) => {
    const secretKey = import.meta.env.VITE_JWT_SECRET;
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const LoginUser = async (username, password) => {
    try {
      const site = import.meta.env.VITE_SITE;
      const login = await axios.post(`http://${site}:3000/api/user/login`, {
        username,
        password: password,
      });

      const token = login.data.token;
      const _id = login.data._id;
      localStorage.setItem("_id", _id);
      localStorage.setItem("token", token);

      handleSnackbar(true, "success", "Access granted. Welcome back!");
      saveCredentialsToLocalStorage(username, password);
      return true;
    } catch (error) {
      console.error(`LoginUser ERROR: ${error}`);
      handleSnackbar(
        true,
        "error",
        "Access denied. Please verify your login details."
      );
      return false;
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe((prev) => !prev);
  };

  const saveCredentialsToLocalStorage = (username, password) => {
    if (rememberMe) {
      const encryptedusername = encrypt(username);
      const encryptedPassword = encrypt(password);
      localStorage.setItem("rememberedUsername", encryptedusername);
      localStorage.setItem("rememberedPassword", encryptedPassword);
      localStorage.setItem("rememberUser", rememberMe);
    } else {
      localStorage.removeItem("rememberedUsername");
      localStorage.removeItem("rememberedPassword");
    }
  };

  const getRememberedCredentialsFromLocalStorage = () => {
    const rememberedUsername = localStorage.getItem("rememberedUsername");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    const rememberUser = localStorage.getItem("rememberUser");

    if (rememberedUsername && rememberedPassword) {
      const decryptedusername = decrypt(rememberedUsername);
      const decryptedPassword = decrypt(rememberedPassword);
      setRememberMe(Boolean(rememberUser));
      setusername(decryptedusername);
      setPassword(decryptedPassword);
    }
  };

  const handleLogin = async () => {
    if (!username) {
      setusernameError(true);
    } else {
      setusernameError(false);
    }

    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (username && password) {
      const result = await LoginUser(username, password);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSnackbar = (open, severity, message) => {
    if (open === true) {
      setSnackbarOpen(open);
      setSnackbarSeverity(severity);
      setSnackbarMessage(message);
    } else {
      setSnackbarOpen(open);
    }
  };

  useEffect(() => {
    getRememberedCredentialsFromLocalStorage();
  }, []);

  return (
    <div
      className="bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${loginBG})` }}
    >
      <Box className="flex flex-col gap-2 max-w-2xl pl-20 pr-20 pt-[8rem] pb-[8rem] bg-white shadow-md rounded-[10%] mx-auto mr-[10%]">
        <div className="flex flex-col items-center mb-4">
          <img src={acx_icon_nav} alt="Logo" className="mb-6" />
          <p variant="h4" className="font-black text-[30px]">
            Welcome Back!
          </p>
        </div>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => {
            setusername(e.target.value);
            setusernameError(false);
            setPasswordError(false);
          }}
          className="w-full"
          error={usernameError}
          helperText={usernameError ? "username cannot be empty" : ""}
          sx={{
            width: "350px",
            marginBottom: "1rem",
          }}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setusernameError(false);
            setPasswordError(false);
          }}
          error={passwordError}
          helperText={passwordError ? "Password cannot be empty" : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: "350px",
            marginBottom: "1rem",
          }}
        />
        <Grid container spacing={2} className="mt-2 pb-3">
          <Grid item xs={6}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={2.5}>
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
              </Grid>
              <Grid item xs={8.5}>
                <Typography variant="body2">Remember Me</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} className="text-right">
            <Typography variant="body2" className="pt-[10px]">
              <Link href="#" color="primary">
                Forgot Password?
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          onClick={async () => {
            await handleLogin();
          }}
          className="mt-4"
        >
          Login
        </Button>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={() => {
          handleSnackbar(false, "", "");
          navigate("/");
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          marginTop: "5rem",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => {
            handleSnackbar(false, "", "");
            navigate("/");
          }}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Login;
