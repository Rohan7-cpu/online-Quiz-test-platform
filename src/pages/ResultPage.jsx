import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const nav = useNavigate();
  const r = JSON.parse(localStorage.getItem('quiz_result') || 'null');

  if (!r) return <Typography>No result found.</Typography>;

  const percentage = (r.score / r.total) * 100;
  const message = percentage >= 50 ? 'You scored good!' : 'Better luck next time!';

  return (
    <Box style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4">Quiz Result</Typography>
      <Typography>Name: {r.name}</Typography>
      <Typography>Score: {r.score} / {r.total}</Typography>
      <Typography>Date: {new Date(r.date).toLocaleString()}</Typography>
      <Typography style={{ marginTop: '10px', color: percentage >= 50 ? 'green' : 'red', fontWeight: 'bold' }}>
        {message}
      </Typography>
      <Button 
        style={{ marginTop: '20px' }} 
        variant="contained" 
        onClick={() => nav('/')}
      >
        Back to Home
      </Button>
    </Box>
  );
}

