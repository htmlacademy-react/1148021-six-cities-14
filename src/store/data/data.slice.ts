import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchFavoritesAction, fetchOffersAction, logoutAction } from '../api-actions';
import { TPlaceCard } from '../../components/place-card/place-card.types';

const initialState: {
  offersList: Array<TPlaceCard> | null;
  favoritesIds: Array<TPlaceCard['id']>;
} = {
  offersList: null,
  favoritesIds: [],
};

export const dataSlice = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    updateOffersList: (state, action: PayloadAction<Array<TPlaceCard>>) => {
      state.offersList = action.payload;
    },
    updateFavoritesIds: (state, action: PayloadAction<{ id: TPlaceCard['id']; appendRemoveFlag: boolean }>) => {
      const { id, appendRemoveFlag } = action.payload;
      if (appendRemoveFlag) {
        state.favoritesIds.push(id);
      } else {
        state.favoritesIds = state.favoritesIds.filter((_id) => _id !== id);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offersList = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offersList = [];
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favoritesIds = action.payload.map((offer) => offer.id);
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favoritesIds = [];
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favoritesIds = [];
      });
  },
});

export const { updateOffersList, updateFavoritesIds } = dataSlice.actions;
