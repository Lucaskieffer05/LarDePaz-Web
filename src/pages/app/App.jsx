import "./App.css";
import { theme } from '../../themes/Theme.js';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import ResponsiveNavbar from '@components/Navbar/Navbar.jsx';
import { AuthProvider } from '@context/AuthProvider.jsx';
import { pages, settings } from "@constants/NavOptions.js";
import { AppRouter } from '@routes/AppRouter';
import { ToastContainer } from "react-toastify";

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ToastContainer />
        <AuthProvider>
          <ResponsiveNavbar pages={pages} settings={settings}/>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}