import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { validateFullName } from '../utils/validators';

export default function AuthPage(){
  const [name, setName] = useState('');
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const handleLogin = () => {
    const v = validateFullName(name);
    if (v) { setErr(v); return; }
    localStorage.setItem('quiz_user', name);
    nav('/');
  };

  return (
    <Box sx={{ maxWidth: 480 }}>
      <Typography variant="h5">Enter your full name to continue</Typography>
      <TextField fullWidth label="Full Name"
       value={name} 
       onChange={(e)=>setName(e.target.value)} 
       sx={{mt:2}} />
      {err && <Typography color="error">{err}</Typography>}
      <Button variant="contained" onClick={handleLogin} sx={{mt:2}}>Start</Button>
    </Box>
  );
}
