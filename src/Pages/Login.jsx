import { Box, Grid, Typography, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoginImage from "../Components/Login/LoginImage/LoginImage";
import LoginForm from "../Components/Login/LoginForm/LoginForm";
import OtpForm from "../Components/Login/OtpForm/OtpForm";
import { gernateOTP } from "../Redux/authReducer/action";

export default function Login() {
  const [flipLoginBox, setFlipLoginBox] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button loading
  const [timer, setTimer] = useState(60);

  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const startTimer = () => {
    setTimer(60);
  };

  const handleGernateOTP = () => {
   
    setIsSubmitting(true)
    dispatch(gernateOTP(formData))
      .then((res) => {
        if (res.data.status === "failed") {
          showSnackbar(res.data.message, "error");
          setIsSubmitting(false)
        } else if (res.data.status === "success") {
          setIsSubmitting(false)
          const token = res.data.data.otp_access_token;
          setAuthToken(token);
          showSnackbar("Please Wait", "success");
          setFlipLoginBox(true); // Flip the login box to show OTP verification
          startTimer(); // Start the timer on successful OTP generation
        }
      })
      .catch((error) => {
        setIsSubmitting(false)
        const errorMessage = error.response?.data?.detail || "Login failed";
        showSnackbar(errorMessage, "error");
      });
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", backgroundColor: "#f0f4fa" }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        {/* Left Side (Login Image) */}
        <Grid
          item
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <LoginImage />
        </Grid>

        {/* Right Side (Form Section) */}
        <Grid
          item
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box sx={{ width: "80%", margin: "auto" }}>
            <Typography
              variant="h4"
              align="center"
              sx={{ color: "#244C9B", marginBottom: "20px" }}
            >
              Welcome To IPO Portal
            </Typography>

            {/* Flip between Login Form and OTP Form */}
            {!flipLoginBox ? (
              <LoginForm
                formData={formData}
                setFormData={setFormData}
                onLoginSubmit={handleGernateOTP}
                isSubmitting={isSubmitting}
              />
            ) : (
              <OtpForm
                authToken={authToken}
                onResendOTP={handleGernateOTP}
                timer={timer}
                setTimer={setTimer}
                isResendingOTP={isSubmitting}
                setFlipLoginBox={setFlipLoginBox}
              />
            )}
          </Box>
        </Grid>
      </Grid>

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
