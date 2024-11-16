import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, FormControl, FormLabel, Input, InputAdornment, Typography, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { gernateOTP, requestOTP } from '../../../Redux/authReducer/action';

export default function LoginForm({ setFlipLoginBox, setAuthToken, setTimer, setOtpSent }) {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(gernateOTP(formData))
      .then((res) => {
      console.log(res,"RESponse gernateOTP")
        if (res.data.status === "failed") {
          showSnackbar(res.data.message, "error");
        } else if (res.data.status === "success") {
          const token = res.data.data.otp_access_token;
          setAuthToken(token);

          showSnackbar("Please Wait", "success");
          setFlipLoginBox(true); // Flip the login box to show OTP verification
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.detail || "Login failed";
        showSnackbar(errorMessage, "error");
      });
  };

  return (
    <Box
      sx={{
        padding: "20px",
        margin: "auto",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0px 5px 12.1px 0px #758DE594",
        width: "100%",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", color: "#244C9B" }}>
        IPO Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <FormLabel>User ID</FormLabel>
          <Input
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            startAdornment={<InputAdornment position="start"><AccountCircle /></InputAdornment>}
            placeholder="Enter Your User ID"
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "20px" }}>
          <FormLabel>Password</FormLabel>
          <Input
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            startAdornment={<InputAdornment position="start"><Lock /></InputAdornment>}
            endAdornment={
              <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </InputAdornment>
            }
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
          />
        </FormControl>

        <Button type="submit" fullWidth sx={{ backgroundColor: "#758DE5", color: "#fff", ":hover": { backgroundColor: "#5f8aeb" } }}>
          Get OTP
        </Button>
        <Button
          sx={{ marginTop: "10px", textAlign: "center", color: "#244c9c", ":hover": { textDecoration: "underline" } }}
          onClick={() => setFlipLoginBox(true)}
        >
          Forgot Password?
        </Button>
      </form>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
