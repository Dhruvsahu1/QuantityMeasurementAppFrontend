import { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = authService.getToken();
    const storedUser = authService.getUser();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);
    setToken(data.token);
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (fullName, email, password) => {
    return await authService.register(fullName, email, password);
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
  }, []);

  const setUserFromOAuth = useCallback((tokenValue, email) => {
    const userData = authService.handleOAuthCallback(tokenValue, email);
    setToken(tokenValue);
    setUser(userData);
  }, []);

  const googleLogin = useCallback(() => {
    authService.initiateGoogleLogin();
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    googleLogin,
    setUserFromOAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
