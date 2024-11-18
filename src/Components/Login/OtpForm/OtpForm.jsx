import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, FormLabel, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import { otpVarificationManager } from "../../../Redux/authReducer/action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import OTP from "../OTP/OTP";

export default function OtpForm({ authToken, onResendOTP, timer, setTimer, isResendingOTP }) {
  const [otp, setOtp] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [isOtpVerification, setIsOtpVerification] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer, setTimer]);

  const resendOtp = () => {
    setOtp("");
    onResendOTP();
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    handleOtpVerification(otp);
  };

  const handleOtpVerification = (otpValue) => {
    if (otpValue.length < 4) {
      setSnackbarMessage("Please enter a valid OTP");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const data = { otp: otpValue };
    setIsOtpVerification(true);
    dispatch(otpVarificationManager(data, authToken))
      .then((response) => {
        if (response.data.status === "success") {
          Cookies.set("login_token_ipo", `${response.data.data.otp_access_token}`);
          setSnackbarMessage("OTP verified successfully!");
          setSnackbarSeverity("success");
          setOpenSnackbar(true);
          setIsOtpVerification(false);

          setTimeout(() => {
            setSnackbarMessage("Login successful");
            setSnackbarSeverity("success");
            setOpenSnackbar(true);
            navigate("/dashboard");
          }, 1000);
        } else {
          const errorMessage = response.data.message === "OTP Expired" ? "OTP Expired!" : "Invalid OTP";
          setSnackbarMessage(errorMessage);
          setSnackbarSeverity("warning");
          setOpenSnackbar(true);
          setIsOtpVerification(false);
        }
      })
      .catch((error) => {
        setSnackbarMessage(error.response?.data?.detail || "Verification failed");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setIsOtpVerification(false);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0px 5px 12.1px 0px #758DE594",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", color: "#244C9B" }}>
        Enter OTP
      </Typography>
      <form onSubmit={handleOtpSubmit}>
        <FormControl fullWidth sx={{ marginBottom: "20px", textAlign: "center" }}>
          <FormLabel sx={{ textAlign: "center" }}>OTP</FormLabel>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <OTP
              separator={<span>-</span>}
              value={otp}
              onChange={setOtp}
              length={4}
              handleOtpVerification={handleOtpVerification}
            />
          </Box>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          sx={{
            backgroundColor: "#758DE5",
            color: "#fff",
            ":hover": { backgroundColor: "#5f8aeb" },
          }}
          disabled={isOtpVerification}
        >
          {isOtpVerification ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Verify OTP"
          )}
        </Button>
        <Button
          sx={{
            marginTop: "10px",
            textAlign: "center",
            color: "#244c9c",
            ":hover": { textDecoration: "underline" },
          }}
          onClick={resendOtp}
          disabled={timer > 0 || isResendingOTP}
        >
          {isResendingOTP ? (
            <CircularProgress size={20} sx={{ color: "#244c9c" }} />
          ) : timer > 0 ? (
            `Resend OTP in ${timer}s`
          ) : (
            "Resend OTP"
          )}
        </Button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
