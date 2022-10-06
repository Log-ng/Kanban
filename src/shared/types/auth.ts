import { User } from './user';

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser: User;
}

export interface AuthRequest {
  username: string;
  password: string;
  fullname?: string;
  controller: string;
}

export interface AuthResponse {
  data: {
    message: string;
    status: string;
    fullname?: string;
    accessToken: string;
  };
}

export interface LogoutRequest {
  username: string;
  controller: string;
}
export interface SignUpRequest {
  username: string;
  controller: string;
}

export interface SignUpResponse {
  data: {
    message: string;
    status: string;
    field: string;
  };
}
