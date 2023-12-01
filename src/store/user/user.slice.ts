import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthStatus, NameSpace } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { UserData } from '../store.types';

const initialState: {
  authStatus: AuthStatus;
  userData: UserData | null;
} = {
  authStatus: AuthStatus.Unknown,
  userData: null,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.authStatus = AuthStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action: PayloadAction<UserData>) => {
        state.authStatus = AuthStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.userData = null;
      });
  },
});
