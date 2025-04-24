import "./App.css";
import { theme } from './themes/Theme.js'; // Importa el tema de Material-UI
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ResponsiveNavbar from './components/Navbar/Navbar.jsx';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <ResponsiveNavbar />
      <div className="App">
        {/* Contenido principal */}
        <div className="page-content">
          <h1>Bienvenido</h1>
          <Button variant="contained">Click aquí</Button>
        </div>
      </div>
    </ThemeProvider>
  )
}

