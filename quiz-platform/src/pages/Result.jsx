import React from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function Result() {
  const { state } = useLocation();
  if (!state) 
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography variant="h6" color="textSecondary">No result data</Typography>
      </Box>
    );

  const { score, total } = state;
  const percentage = Math.round((score / total) * 100);

  return (
    <Box 
      sx={{ 
        p: 4, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '70vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Paper 
        elevation={6} 
        sx={{ 
          p: 4, 
          borderRadius: 3, 
          textAlign: 'center', 
          maxWidth: 400, 
          width: '100%' 
        }}
      >
        <Typography variant='h4' sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
          🎉 Your Result
        </Typography>

        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
          <CircularProgress 
            variant="determinate" 
            value={percentage} 
            size={120} 
            thickness={5} 
            sx={{ color: percentage > 50 ? '#4caf50' : '#f44336' }} 
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" component="div" color="textPrimary">
              {percentage}%
            </Typography>
          </Box>
        </Box>

        <Typography variant='h6' sx={{ mb: 1 }}>
          Score: {score} / {total}
        </Typography>
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          {percentage >= 50 ? 'Great job! Keep it up! 👍' : 'Don’t worry! Try again. 💪'}
        </Typography>
      </Paper>
    </Box>
  );
}
