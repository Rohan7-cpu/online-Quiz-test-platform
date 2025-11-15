import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';


export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // default admin credentials
  const ADMIN_USER = 'Rohan';
  const ADMIN_PASS = 'Rohan123';

  const from = location.state?.from || '/';

  const handleSubmit = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      navigate(from); // redirect to original page
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Paper sx={{ p: 4, width: 300 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>Admin Login</Typography>
        <TextField
          label='Username'
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label='Password'
          type='password'
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        {error && <Typography color='error' sx={{ mb: 1 }}>{error}</Typography>}
        <Button variant='contained' fullWidth onClick={handleSubmit}>Login</Button>
      </Paper>
    </Box>
  );
}
