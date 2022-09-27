import { AuthState } from 'shared/types/auth';
import { User } from 'shared/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  isLoggedIn: false,
  currentUser: {
    username: '',
    fullname: ''
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
