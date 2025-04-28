// src/routes/routes.js
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Home = lazy(() => import('@pages/home/Home'));
const Contrato = lazy(() => import('@pages/contrato/Contrato'));
const Clientes = lazy(() => import('@pages/clientes/Clientes'));
const Login = lazy(() => import('@pages/login/Login'));
const AddCliente = lazy(() => import('@pages/clientes/AddCliente/AddCliente'));

export const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
  },
];

export const protectedRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/contratos',
    element: <Contrato />,
  },
  {
    path: '/clientes',
    element: <Clientes />,
  },
  {
    path: '/clientes/nuevo-cliente',
    element: <AddCliente />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];