import { Box, Grid, Typography, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoginImage from "../Components/Login/LoginImage/LoginImage";
import LoginForm from "../Components/Login/LoginForm/LoginForm";
import OtpForm from "../Components/Login/OtpForm/OtpForm";
import { gernateOTP } from "../Redux/authReducer/action";
import CustomSnackbar from "../Components/CustomSnackbar/CustomSnackbar";

export default function Login() {
  const [flipLoginBox, setFlipLoginBox] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button loading
  const [timer, setTimer] = useState(60);
  const [snackbarConfig,setSnackbarConfig] = useState({
    open :false,
    message: "", 
    severity : "info",
  }) 

  const dispatch = useDispatch();

  const startTimer = () => {
    setTimer(60);
  };

  const handleGernateOTP = () => {
   
    setIsSubmitting(true)
    dispatch(gernateOTP(formData))
      .then((res) => {
        if (res.data.status === "failed") {
          setSnackbarConfig({
            open:true,
            message: res.data.message,
            severity :"error",
          })
          // showSnackbar(res.data.message, "error");
          setIsSubmitting(false)
        } else if (res.data.status === "success") {
          setIsSubmitting(false)
          const token = res.data.data.otp_access_token;
          setAuthToken(token);
          // showSnackbar("Please Wait", "success");
          setSnackbarConfig({
            open: true,
            message: "OTP sent successfully! Please check your phone.",
            severity: "success",
          });
          setFlipLoginBox(true); // Flip the login box to show OTP verification
          startTimer(); // Start the timer on successful OTP generation
        }
      })
      .catch((error) => {
        setIsSubmitting(false)
        const errorMessage = error.response?.data?.detail || "Login failed.";
        setSnackbarConfig({
          open: true,
          message: errorMessage,
          severity: "error",
        });
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

      {/* Conditionally Render Custom Snackbar */}
      {snackbarConfig.open && (
        <CustomSnackbar
          open={snackbarConfig.open}
          message={snackbarConfig.message}
          severity={snackbarConfig.severity}
          onClose={() => setSnackbarConfig({ ...snackbarConfig, open: false })}
        />
      )}
    </Box>
  );
}

