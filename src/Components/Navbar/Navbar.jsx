import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'cookies-js';
import Logo from "../../Assets/Images/logo.png";
import { useColorMode } from '../../Theme/ThemeProvider';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';

export default function Navbar() {
  const navigate = useNavigate();
  const token = Cookies.get('login_token_ipo');
  const { toggleColorMode } = useColorMode(); // Get the toggle function from context
  const theme = useTheme(); // Access the current theme

  const handleLogout = () => {
    Cookies.expire('username_ipo');
    Cookies.expire('login_token_ipo');
    navigate('/');
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: (theme) =>
          theme.palette.mode === 'dark' ? '0px 4px 15px rgba(255, 255, 255, 0.4)' : '0px 4px 15px rgba(0, 0, 0, 0.1)', // Adjusted shadow for more depth
        backgroundColor: (theme) => theme.palette.background.default, // Background color from theme
        transition: 'all 0.3s ease', // Smooth transition for background and shadow
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center" onClick={() => navigate('/dashboard')} sx={{ cursor: 'pointer' }}>
          <img src={Logo} alt="Logo" style={{ height: 50, width: 'auto' }} />
          {/* {token && (
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                ml: 2,
                color: theme.palette.text.primary, // Adjust text color based on theme
                transition: 'color 0.3s ease',
              }}
            >
              Welcome, {userName}
            </Typography>
          )} */}
        </Box>
        <Box display="flex" alignItems="center">
          <ThemeSwitch />
          {token && (
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{
                ml: 2,
                backgroundColor: theme.palette.mode === 'dark' ? '#5274ac' : '#244c9c', // Dynamic background color based on theme
                color: theme.palette.mode === 'dark' ? '#fff' : '#fff', // White text in both modes
                padding: '8px 20px', // Adjusted padding for a more comfortable button size
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? '#244c9c' : '#5274ac', // Dynamic hover color
                  transform: 'scale(1.05)', // Slight hover animation
                },
                transition: 'all 0.3s ease',
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
