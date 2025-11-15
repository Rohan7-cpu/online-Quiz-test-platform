import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminLogin from '../pages/AdminLogin';

export default function Navbar() {
  const navigate = useNavigate();

  // Get user info from Redux
  const { fullName, role } = useSelector((state) => state.auth || {});

const handleCreateClick = () => {
  if (role?.toLowerCase() === 'admin') {
    navigate('/create'); // admin directly goes to create
  } else {
    navigate('/admin-login', { state: { from: '/create' } }); // remember intended page
  }
};

const handleMyQuizzesClick = () => {
  if (role?.toLowerCase() === 'admin') {
    navigate('/my'); // admin directly
  } else {
    navigate('/admin-login', { state: { from: '/my' } }); // remember intended page
  }
};


  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="h6">Quizzy</Typography>
          <Button component={NavLink} to='/' color='inherit'>Home</Button>

          <Button onClick={handleCreateClick} color='inherit'>Create Quiz</Button>
          <Button onClick={handleMyQuizzesClick} color='inherit'>My Quizzes</Button>
          <Button component={NavLink} to='/play' color='inherit'>Play Quiz</Button>
        </Box>
        <Typography sx={{ ml: 2 }}>{fullName || ''}</Typography>
      </Toolbar>
    </AppBar>
  );
}
