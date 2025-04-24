import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { LocalStorage } from '@services/LocalStorage';
import { useNavigate } from 'react-router-dom';
import { Roles } from '@constants/Roles';

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const isAdmin = () => {
        const role = LocalStorage.getUserRole();
        return role && role === Roles.Admin;
    };

    const isEmployee = () => {
        const role = LocalStorage.getUserRole();
        return role && role === Roles.Employee;
    };

  const verifyToken = () => {
        const token = LocalStorage.getToken();
        if (!token) return false;
    
        try {
            if (!LocalStorage.getUserId()) return false;

            const sessionExpiration = new Date(LocalStorage.getSessionExpiration());

            if (!sessionExpiration) return false;

            if (new Date() > sessionExpiration) {
                LocalStorage.clearSessionData();
                return false;
            }
            return true;
        } catch {
            return false;
        }
    };

    useEffect(() => {
        const checkAuth = () => {
            const isValid = verifyToken();
            setIsAuthenticated(isValid);
            if (!isValid && window.location.pathname !== '/login') {
            navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    const login = (data) => {
        LocalStorage.setToken(data.token);
        LocalStorage.setUserId(data.user.id);
        LocalStorage.setUserRole(data.user.role);
        LocalStorage.setUserName(data.user.fullName);
        LocalStorage.setUserEmail(data.user.email);
        LocalStorage.setSessionExpiration(data.sessionExpiration);
        setIsAuthenticated(true);
        navigate('/');
    };

    const logout = () => {
        LocalStorage.clearSessionData();
        setIsAuthenticated(false);
        navigate('/login');
    };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isAdmin, isEmployee }}>
      {children}
    </AuthContext.Provider>
  );
}