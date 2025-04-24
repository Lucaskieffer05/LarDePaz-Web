import "./App.css";
import { theme } from './themes/Theme.js';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ResponsiveNavbar from '@components/Navbar/Navbar.jsx';
import Login from '@pages/login/Login.jsx';
import { Contrato } from "./pages/contrato/Contrato.jsx";
import { AuthContext } from '@context/AuthContext';
import { useContext } from 'react';
import { AuthProvider } from '@context/AuthProvider.jsx';
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute.jsx';

function Home() {
  return <h1>Bienvenido</h1>;
}

function Contact() {
  return <h1>Contacto</h1>;
}

const pages = [
  { name: 'Inicio', path: '/' },
  { name: 'Contratos', path: '/contratos' },
  { name: 'Contacto', path: '/contact' },
];
const settings = [
  { name: 'Perfil', path: '/profile' },
  { name: 'Cuenta', path: '/account' },
  { name: 'Panel', path: '/dashboard' },
  { name: 'Cerrar sesión', path: '/logout' },
];

function AppContent() {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== '/login') {
    return null; // O un spinner de carga mientras verifica
  }

  return (
    <>
      {isAuthenticated && <ResponsiveNavbar pages={pages} settings={settings} />}
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/contratos" element={
            <ProtectedRoute>
              <Contrato />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}