import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AuthData, AppState, UserData } from './store.types';
import { AxiosInstance } from 'axios';
import { TPlaceCard } from '../components/place-card/place-card';
import { redirectToRoute } from './actions';
import { AppRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { dropToken, saveToken } from '../services/token';
import { setError } from './cities/cities.slice';

export const fetchOffersAction = createAsyncThunk<
  Array<TPlaceCard>,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>('DATA/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Array<TPlaceCard>>('/offers');
  return data;
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
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>('/login');
  return data;
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>('USER/login', async ({ login: email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>('/login', { email, password });
  saveToken(data.token);
  dispatch(redirectToRoute(AppRoute.Main));
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>('USER/logout', async (_arg, { extra: api }) => {
  await api.delete('/logout');
  dropToken();
});
