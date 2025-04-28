// src/routes/AppRouter.jsx
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes, protectedRoutes } from './routes.jsx';
import { ProtectedRoute } from '@routes/ProtectedRoute';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="App">

        <Routes>
          {/* Rutas públicas */}
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {/* Rutas protegidas */}
          {protectedRoutes.map((route) => (
            <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
            />
          ))}
        </Routes>
      </div>
    </Suspense>
  );
};