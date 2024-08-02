import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Custom theme settings
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  // You can add more customizations here
});

export default theme;
