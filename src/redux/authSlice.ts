import { AuthState } from 'shared/types/auth';
import { User } from 'shared/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  isLoggedIn: false,
  currentUser: undefined,
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

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

export const { loginSuccess, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer;
