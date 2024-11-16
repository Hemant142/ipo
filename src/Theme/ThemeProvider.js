import React, { createContext, useContext, useState } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

// Create a context to manage color mode
const ColorModeContext = createContext({ toggleColorMode: () => {} });

// Custom hook to use color mode context
export const useColorMode = () => useContext(ColorModeContext);

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#244c9c' : '#5274ac', // Adjust primary color for light/dark mode
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212', // Adjust background color
        paper: mode === 'light' ? '#ffffff' : '#333333', // Adjust paper color for cards and surfaces
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff', // Adjust text color for light/dark mode
      },
    },
    typography: {
      allVariants: {
        color: mode === 'light' ? '#000000' : '#ffffff', // Apply text color to all variants
      },
    },
  });

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProvider;
