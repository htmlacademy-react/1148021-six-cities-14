import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AuthData, State, UserData } from './store.types';
import { AxiosInstance } from 'axios';
import { TPlaceCard } from '../components/place-card/place-card';
import { loadOffers, redirectToRoute, requireAuthorization, setError, setUserData } from './actions';
import { AppRoute, AuthStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { dropToken, saveToken } from '../services/token';

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('cities/data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Array<TPlaceCard>>('/offers').catch(() => ({ data: [] }));
  dispatch(loadOffers(data));
});

export const clearErrorAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
  }
>('cities/clearError', (_arg, { dispatch }) => {
  setTimeout(() => dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('cities/user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<UserData>('/login');
    dispatch(setUserData(data));
    dispatch(requireAuthorization(AuthStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('cities/user/login', async ({ login: email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>('/login', { email, password });
  saveToken(data.token);
  dispatch(setUserData(data));
  dispatch(requireAuthorization(AuthStatus.Auth));
  dispatch(redirectToRoute(AppRoute.Main));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete('/logout');
  dropToken();
  dispatch(setUserData(null));
  dispatch(requireAuthorization(AuthStatus.NoAuth));
});
