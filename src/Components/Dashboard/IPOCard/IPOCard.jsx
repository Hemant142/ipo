import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[10],
  },
  backgroundColor: theme.palette.background.default,
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  backgroundColor: theme.palette.divider,
}));

export default function IPOCard({ basket }) {
  const { ipoName, issueNumber, ipoType, issueSize, faceValue, lotSize, minLotSize, maxLotSize, 
          lowerPrice, higherPrice, cutoffTime, startDate, endDate, allocationDate, 
          listingDate, createdAt, isActive } = basket;

  const statusColor = isActive ? 'success' : 'error';

  return (
    <StyledCard>
      <CardContent>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            {ipoName}
          </Typography>
          <Chip label={isActive ? 'Active' : 'Inactive'} color={statusColor} variant="outlined" />
        </Box>

        {/* Issue Details */}
        <Typography variant="body1" color="textSecondary" display="flex" alignItems="center">
          <FormatListNumberedIcon fontSize="small" sx={{ mr: 1 }} /> Issue Number: {issueNumber}
        </Typography>
        <Typography variant="body1" color="textSecondary" display="flex" alignItems="center">
          <AttachMoneyIcon fontSize="small" sx={{ mr: 1 }} /> Issue Size: ₹{Intl.NumberFormat().format(issueSize)}
        </Typography>
        <StyledDivider />
        
        {/* IPO Info */}
        <Typography variant="body1" color="textSecondary" display="flex" alignItems="center">
          <TrendingUpIcon fontSize="small" sx={{ mr: 1 }} /> IPO Type: {ipoType}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Face Value: ₹{faceValue}
        </Typography>
        <StyledDivider />
        
        {/* Lot Size Info */}
        <Typography variant="body1" color="textSecondary">
          Lot Size: {lotSize} (Min: {minLotSize}, Max: {maxLotSize})
        </Typography>
        
        {/* Price Range */}
        <Typography variant="body1" color="textSecondary">
          Price Range: ₹{lowerPrice} - ₹{higherPrice}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Cut-off Time: {cutoffTime}
        </Typography>
        <StyledDivider />

        {/* Dates */}
        <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
          <EventIcon fontSize="small" sx={{ mr: 1 }} /> Start Date: {startDate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          End Date: {endDate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Allocation Date: {allocationDate}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Listing Date: {listingDate}
        </Typography>
        <StyledDivider />

        {/* Footer */}
        <Typography variant="caption" color="textSecondary" align="right">
          Created At: {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}
 