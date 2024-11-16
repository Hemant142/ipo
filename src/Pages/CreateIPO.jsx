import { Box } from '@mui/material';
import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import TabSwitcher from '../Components/Dashboard/TabSwitcher/TabSwitcher';
import IPOForm from '../Components/CreateIPO/IPOForm/IPOForm';

export default function CreateIPO() {
  
  return (
    <Box
      sx={{
        backgroundColor: '#f4f6f8',
        minHeight: '100vh',
        // py: 3,
      }}
    >
      <Navbar />
      <TabSwitcher />
      <Box sx={{ mt: 5 }}>
        <IPOForm />
      </Box>
    </Box>
  );
}
