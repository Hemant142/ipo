import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  useTheme,
  Autocomplete,
  Snackbar,
  Alert,
} from "@mui/material";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { createIPO } from "../../../Redux/basketReducer/action";

const IPOForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = Cookies.get("login_token_ipo");

  const [formData, setFormData] = useState({
    ipoName: "",
    issueNumber: "",
    ipoType: "IPO",
    issueSize: "",
    faceValue: "",
    lotSize: "",
    minLotSize: "",
    maxLotSize: "",
    lowerPrice: "",
    higherPrice: "",
    cutoffTime: "",
    preDate: "",
    startDate: "",
    endDate: "",
    allocationDate: "",
    listingDate: "",
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAutoCompleteChange = (event, value) => {
    setFormData({ ...formData, ipoType: value || "" });
  };

  const validateFields = () => {
    const fieldErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && formData[key] !== true) {
        fieldErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setIsSubmitting(true); // Disable the submit button
    try {
      const response = await dispatch(createIPO(formData, token));
      console.log(response,"response")
      if (response.data.status === "success") {
        setAlert({
          open: true,
          message: "IPO created successfully!",
          severity: "success",
        });
        setFormData({
          ipoName: "",
          issueNumber: "",
          ipoType: "IPO",
          issueSize: "",
          faceValue: "",
          lotSize: "",
          minLotSize: "",
          maxLotSize: "",
          lowerPrice: "",
          higherPrice: "",
          cutoffTime: "",
          preDate: "",
          startDate: "",
          endDate: "",
          allocationDate: "",
          listingDate: "",
          isActive: true,
        });
      } else {
        setAlert({
          open: true,
          message: response.data.message,
          severity: "error",
        });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: error.message || "Something went wrong.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "800px",
        margin: "auto",
        backgroundColor: theme.palette.background.default,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          color: theme.palette.primary.main,
        }}
      >
        Create IPO
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="IPO Name"
              name="ipoName"
              value={formData.ipoName}
              onChange={handleChange}
              error={!!errors.ipoName}
              helperText={errors.ipoName}
              required
              sx={{ bgcolor: theme.palette.background.paper, borderRadius: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Issue Number"
              name="issueNumber"
              value={formData.issueNumber}
              onChange={handleChange}
              error={!!errors.issueNumber}
              helperText={errors.issueNumber}
              required
              sx={{ bgcolor: theme.palette.background.paper, borderRadius: 1 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              options={["IPO", "SME"]}
              value={formData.ipoType}
              onChange={handleAutoCompleteChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="IPO Type"
                  error={!!errors.ipoType}
                  helperText={errors.ipoType}
                  required
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 1,
                  }}
                />
              )}
            />
          </Grid>

          {[
            { name: "issueSize", label: "Issue Size (₹)" },
            { name: "faceValue", label: "Face Value (₹)" },
            { name: "lotSize", label: "Lot Size" },
            { name: "minLotSize", label: "Min Lot Size" },
            { name: "maxLotSize", label: "Max Lot Size" },
            { name: "lowerPrice", label: "Lower Price (₹)" },
            { name: "higherPrice", label: "Higher Price (₹)" },
            { name: "cutoffTime", label: "Cutoff Rate" },
          ].map((field) => (
            <Grid item xs={6} key={field.name}>
              <TextField
                fullWidth
                label={field.label}
                name={field.name}
                type="number"
                value={formData[field.name]}
                onChange={handleChange}
                error={!!errors[field.name]}
                helperText={errors[field.name]}
                required
                sx={{
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 1,
                }}
              />
            </Grid>
          ))}

          {[
            { name: "startDate", label: "Start Date" },
            { name: "endDate", label: "End Date" },
            { name: "allocationDate", label: "Allocation Date" },
            { name: "listingDate", label: "Listing Date" },
          ].map((dateField) => (
            <Grid item xs={6} key={dateField.name}>
              <TextField
                fullWidth
                label={dateField.label}
                name={dateField.name}
                type="date"
                value={formData[dateField.name]}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors[dateField.name]}
                helperText={errors[dateField.name]}
                required
                sx={{
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 1,
                }}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit IPO"}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default IPOForm;
