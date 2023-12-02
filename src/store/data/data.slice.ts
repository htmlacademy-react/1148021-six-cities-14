import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TPlaceCard } from '../../components/place-card/place-card';
import { fetchOffersAction } from '../api-actions';

const initialState: {
  offersList: Array<TPlaceCard> | null;
} = {
  offersList: null,
};

export const dataSlice = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offersList = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersList = [];
      });
  },
});
