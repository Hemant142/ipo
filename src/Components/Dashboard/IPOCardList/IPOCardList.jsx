import React from 'react';
import { Box, CircularProgress, Grid, Typography, Skeleton } from '@mui/material';
import IPOCard from '../IPOCard/IPOCard';

export default function IPOCardList({ baskets, loading }) {
  const renderSkeletonCards = () => {
    return Array.from({ length: 6 }).map((_, index) => (
      <Grid item key={index} xs={12} sm={6} md={4}>
        <Box
          sx={{
            borderRadius: '12px',
            padding: '24px',
            boxShadow: 3,
            backgroundColor: '#f0f0f0',
            // height: '300px', // Increased height
            height: '450px', // Fixed card height
          }}
        >
          <Skeleton variant="text" height={40} width="90%" /> {/* Increased height and width */}
          <Skeleton variant="text" height={30} width="70%" sx={{ marginTop: '10px' }} />
          <Skeleton
            variant="rectangular"
            height={180} // Increased height
            width="100%"
            sx={{ marginTop: '15px', borderRadius: '12px' }}
          />
          <Skeleton variant="text" height={30} width="60%" sx={{ marginTop: '15px' }} />
          <Skeleton variant="text" height={30} width="80%" />
        </Box>
      </Grid>
    ));
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Upcoming IPOs
      </Typography>
      {baskets.length === 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {renderSkeletonCards()}
        </Grid>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {baskets.map((basket) => (
            <Grid item key={basket._id} xs={12} sm={6} md={4}>
              <IPOCard basket={basket} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
