import {api} from './api'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface UserResponse {
  id: number
  email: string
  username: string
  firstName: string
  lastName: string
  phoneNumber: string
}

export interface AuthResponse {
  message: string
  user: UserResponse
}

export const authService = {
  login: (data: LoginRequest) => api.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) => api.post<AuthResponse>('/auth/register', data),

  logout: () => api.post('/auth/logout'),
}
