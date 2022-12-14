import { AuthState } from 'shared/types/auth';
import { User } from 'shared/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('token') ? true: false,
  currentUser: {
    username: localStorage.getItem('username') ?? '',
    fullname: localStorage.getItem('fullname') ?? '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.isLoggedIn = false;
    },

    logoutLocal(state) {
      localStorage.clear();
      state.isLoggedIn = false;
      state.currentUser = {
        username: '',
        fullname: '',
      };

    },
  },
});

export const { loginSuccess, loginFailed, logoutLocal } = authSlice.actions;
export default authSlice.reducer;
