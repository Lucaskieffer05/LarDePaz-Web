import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
  palette: {
    primary: {
      main: '#6ecc72',      // Verde
    },
    navbar: {
      main: '#dedede',
      contrastText: '#000000' // Definido manualmente
    },
  }
});