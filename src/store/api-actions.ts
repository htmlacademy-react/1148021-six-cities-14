import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from './store.types';
import { AxiosInstance } from 'axios';
import { TPlaceCard } from '../components/place-card/place-card';
import { loadOffers } from './actions';

export const fetchOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Array<TPlaceCard>>('/offers').catch(() => ({ data: [] }));
  dispatch(loadOffers(data));
});
