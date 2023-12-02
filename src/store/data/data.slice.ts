import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TPlaceCard } from '../../components/place-card/place-card';
import { fetchFavoritesAction, fetchOffersAction } from '../api-actions';

const initialState: {
  offersList: Array<TPlaceCard> | null;
  favoritesList: Array<TPlaceCard> | null;
  favoritesCount: number;
} = {
  offersList: null,
  favoritesList: null,
  favoritesCount: 0,
};

export const dataSlice = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    incrementFavoritesCount: (state, action: PayloadAction<1 | -1>) => {
      state.favoritesCount = state.favoritesCount + action.payload;
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
        state.favoritesList = action.payload;
        state.favoritesCount = action.payload?.length || 0;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favoritesList = [];
        state.favoritesCount = 0;
      });
  },
});

export const { incrementFavoritesCount } = dataSlice.actions;
