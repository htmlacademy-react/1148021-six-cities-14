import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AuthData, AppState, UserData } from './store.types';
import { AxiosInstance } from 'axios';
import { redirectToRouteAction } from './actions';
import { APIAction, APIRoute, AppRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { dropToken, saveToken } from '../services/token';
import { setError } from './cities/cities.slice';
import { TPlaceCard } from '../components/place-card/place-card.types';

export const fetchFavoritesAction = createAsyncThunk<
  Array<TPlaceCard>,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>(APIAction.FETCH_FAVORITES, async (_arg, { extra: api }) => {
  const { data } = await api.get<Array<TPlaceCard>>(APIRoute.Favorite);
  return data;
});

export const fetchOffersAction = createAsyncThunk<
  Array<TPlaceCard>,
  undefined,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>(APIAction.FETCH_OFFERS, async (_arg, { extra: api }) => {
  const { data } = await api.get<Array<TPlaceCard>>(APIRoute.Offers);
  return data;
});

export const clearErrorAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
  }
>(APIAction.CLEAR_ERROR, (_arg, { dispatch }) => {
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
>(APIAction.USER_CHECK_AUTH, async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
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
>(APIAction.USER_LOGIN, async ({ login: email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
  saveToken(data.token);
  dispatch(redirectToRouteAction(AppRoute.Main));
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
>(APIAction.USER_LOGOUT, async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});
