import axios from 'axios';
import type { RegisterDto, LoginDto, LoginResponse, User, UsersResponse } from '@/types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint = error.config?.url?.startsWith('/auth');
    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (data: RegisterDto) => api.post<User>('/auth/register', data),
  login: (data: LoginDto) => api.post<LoginResponse>('/auth/login', data),
  me: () => api.get<User>('/auth/me'),
};

export const usersApi = {
  getAll: () => api.get<UsersResponse>('/users'),
  getById: (id: string) => api.get<User>(`/users/${id}`),
  block: (id: string) => api.patch<User>(`/users/${id}/block`),
};

export default api;
