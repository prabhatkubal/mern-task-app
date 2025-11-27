import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ThemeToggle from './ThemeToggle';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header(){
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav('/signin');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{color:'inherit', textDecoration:'none', flexGrow:1}}>
          Task Manager
        </Typography>
        <Box sx={{display:'flex', gap:1, alignItems:'center'}}>
          {user ? (
            <>
              <Typography>{user.name}</Typography>
              <Button onClick={() => nav('/task/new')} color="inherit">Add Task</Button>
              <Button onClick={onLogout} color="inherit">Logout</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/signin" color="inherit">Sign In</Button>
              <Button component={Link} to="/signup" color="inherit">Sign Up</Button>
            </>
          )}
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
