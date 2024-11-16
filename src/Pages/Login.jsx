import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginImage from "../Components/Login/LoginImage/LoginImage";
import LoginForm from "../Components/Login/LoginForm/LoginForm";
import OtpForm from "../Components/Login/OtpForm/OtpForm";
import Cookies from 'js-cookie'; 


export default function Login() {
  const [flipLoginBox, setFlipLoginBox] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [timer, setTimer] = useState(60);
  const [otpSent, setOtpSent] = useState(false);
console.log(authToken,"authToken")
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
            height: "100%", // Ensure this for full height alignment
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
                setFlipLoginBox={setFlipLoginBox}
                setAuthToken={setAuthToken}
                setTimer={setTimer}
                setOtpSent={setOtpSent}
              />
            ) : (
              <OtpForm authToken={authToken}  setFlipLoginBox={setFlipLoginBox}/>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
