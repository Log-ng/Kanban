import { User } from './user';

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface AuthResponse {
  data: {
    message: string;
    status: string;
    fullName?: string;
  };
}
