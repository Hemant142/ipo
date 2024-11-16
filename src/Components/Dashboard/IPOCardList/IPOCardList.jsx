import React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import IPOCard from '../IPOCard/IPOCard';


export default function IPOCardList({ baskets, loading }) {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5" align="center" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
        Upcoming IPOs
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" padding="20px">
          <CircularProgress />
        </Box>
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
