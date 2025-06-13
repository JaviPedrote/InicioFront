import api from './api';

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>('/login', { email, password });
  localStorage.setItem('token', data.token);
  return data;
};

export const forgotPassword = async (email: string): Promise<void> => {
  await api.post('/forgot-password', { email });
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  await api.post('/reset-password', { token, password: newPassword });
};
