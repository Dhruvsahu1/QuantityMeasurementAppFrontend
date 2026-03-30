import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

function extractUser(data) {
  return {
    id: data.userId,
    email: data.email,
    fullName: data.fullName,
    provider: data.provider,
  };
}

const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const data = response.data;
    const user = extractUser(data);
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { ...data, user };
  },

  async register(fullName, email, password) {
    const response = await api.post('/auth/register', { fullName, email, password });
    return response.data;
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  getUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  handleOAuthCallback(token, email) {
    const user = { email, fullName: email, provider: 'google' };
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  initiateGoogleLogin() {
    window.location.href = '/oauth2/authorization/google';
  },
};

export default authService;
