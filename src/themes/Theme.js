import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
  palette: {
    primary: {
      main: '#6ecc72',      // Verde
    },
    navbar: {
      main: '#d9ddcd',
      contrastText: '#6d7578' // Definido manualmente
    },
  }
});