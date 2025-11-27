import React from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../context/ThemeContext';

export default function ThemeToggle(){
  const { mode, toggle } = useThemeContext();
  return (
    <IconButton onClick={toggle} size="large" edge="end" color="inherit" aria-label="toggle theme">
      {mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
    </IconButton>
  );
}
