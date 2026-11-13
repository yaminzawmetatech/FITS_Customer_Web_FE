import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loadable from '../components/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// Redirection Wrapper for authenticated users
const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = user?.access_token;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('../pages/authentication/Register')));

const LoginRoutes = [
  {
    path: '/',
    element: <MinimalLayout />,
    children: [
      {
        path: 'login',
        element: (
          <PublicRoute>
            <AuthLogin />
          </PublicRoute>
        ),
      },
      {
        path: 'register',
        element: <AuthRegister />,
      },
    ],
  },
];

export default LoginRoutes;