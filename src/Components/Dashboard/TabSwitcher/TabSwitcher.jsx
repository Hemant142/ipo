import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';

// Centered tab container styling
const TabContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '30px',
});

// Styled Tabs component for a more elegant design
const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  padding: '4px 8px',
  minWidth: '300px',
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 80,
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
}));

// Styled Tab component with a cleaner look
const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  transition: 'color 0.3s',
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
}));

export default function TabSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the current tab based on the URL
  const currentTab = location.pathname === '/create-ipo' ? 1 : 0;

  // Handle tab change
  const handleChange = (event, newValue) => {
    if (newValue === 0) navigate('/dashboard');
    if (newValue === 1) navigate('/create-ipo');
  };

  return (
    <TabContainer>
      <StyledTabs
        value={currentTab}
        onChange={handleChange}
        aria-label="Dashboard and Create IPO Tabs"
        centered
        TabIndicatorProps={{
          children: <span className="MuiTabs-indicatorSpan" />,
        }}
      >
        <StyledTab label="Dashboard" />
        <StyledTab label="Create IPO" />
      </StyledTabs>
    </TabContainer>
  );
}
