import { AccountCircle, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function LoginForm({ formData, setFormData, onLoginSubmit ,isSubmitting }) {
  const [showPassword, setShowPassword] = useState(false);
 

  const isFormValid = formData.userId.trim() !== "" && formData.password.trim() !== ""; // Check if fields are filled

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return; // Prevent submission if form is invalid
  
    try {
      await onLoginSubmit(); // Trigger the parent's login function
    } catch (error) {
      console.error("Error during login submission:", error);
    }
  };
  
  console.log(isSubmitting,"isSubmitting")

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
        <FormControl fullWidth sx={{ marginBottom: "20px" }} required>
          <FormLabel>User ID</FormLabel>
          <Input
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            placeholder="Enter Your User ID"
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: "20px" }} required>
          <FormLabel>Password</FormLabel>
          <Input
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            startAdornment={
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </InputAdornment>
            }
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          disabled={!isFormValid || isSubmitting} // Disable button if invalid or loading
          sx={{
            backgroundColor: isSubmitting ? "#d3d3d3" : isFormValid ? "#758DE5" : "#d3d3d3",
            color: "#fff",
            ":hover": { backgroundColor: isSubmitting || !isFormValid ? "#d3d3d3" : "#5f8aeb" },
          }}
        >
          {isSubmitting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Get OTP"}
        </Button>
      </form>
    </Box>
  );
}
