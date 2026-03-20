export interface User {
  id: string;
  fullName: string;
  birthDate: string;
  email: string;
  role: 'admin' | 'user';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterDto {
  fullName: string;
  birthDate: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface UsersResponse {
  users: User[];
  total: number;
}
