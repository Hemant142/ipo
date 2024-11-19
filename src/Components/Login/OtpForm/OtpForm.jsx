import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, FormLabel, Typography, Snackbar, Alert, CircularProgress } from "@mui/material";
import { otpVarificationManager } from "../../../Redux/authReducer/action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import OTP from "../OTP/OTP";
import CustomSnackbar from "../../CustomSnackbar/CustomSnackbar";

export default function OtpForm({ authToken, onResendOTP, timer, setTimer, isResendingOTP }) {
  const [otp, setOtp] = React.useState("");
  const [isOtpVerification, setIsOtpVerification] = useState(false);
  const [snackbarConfig,setSnackbarConfig] = useState({
    open :false,
    message: "", 
    severity : "info",
  }) 
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
      setSnackbarConfig({
        open :true, 
        message: `OTP length is ${otpValue.length}. Please enter a valid OTP `, 
        severity : 'error'
      })
      return;
    }

    const data = { otp: otpValue };
    setIsOtpVerification(true);
    dispatch(otpVarificationManager(data, authToken))
      .then((response) => {
        if (response.data.status === "success") {
          Cookies.set("login_token_ipo", `${response.data.data.otp_access_token}`);
          setSnackbarConfig({
            open :true, 
            message: 'OTP verified successfully!', 
            severity : 'success'
          })
          setIsOtpVerification(false);

          setTimeout(() => {
            setSnackbarConfig({
              open :true, 
              message: 'Login successful', 
              severity : 'success'
            })
            navigate("/dashboard");
          }, 1000);
        } else {
          const errorMessage = response.data.message === "OTP Expired" ? "OTP Expired!" : "Invalid OTP";
     

          setSnackbarConfig({
            open :true, 
            message: errorMessage, 
            severity : 'warning'
          })
          setIsOtpVerification(false);
        }
      })
      .catch((error) => {
        setSnackbarConfig({
          open: true, // Opens the Snackbar
          message: error.response?.data?.detail || "Verification failed", // Displays the error message from the response or a default message
          severity: "error", // Sets the severity to 'error' for styling
        });
        
        setIsOtpVerification(false);
      });
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
