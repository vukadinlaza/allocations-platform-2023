'use client';
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
      letterSpacing: '0.5',
      fontWeight: 700,
      backgroundColor: '#3db278'
    }
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#3db278'
    }
  }
});
