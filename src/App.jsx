import "./App.css";
import { theme } from './themes/Theme.js';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ResponsiveNavbar from '@components/Navbar/Navbar.jsx';
import Login from '@pages/login/Login.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from '@services/LocalStorage';
import { Contrato } from "./pages/contrato/Contrato.jsx";

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
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    const token = LocalStorage.getToken();
    if (!token && !isLoginPage) {
      navigate('/login'); // Redirige al login si no hay token
    }
  }, [isLoginPage, navigate]);

  return (
    <>
      {!isLoginPage && <ResponsiveNavbar pages={pages} settings={settings}/>}
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/contratos" element={<Contrato />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}