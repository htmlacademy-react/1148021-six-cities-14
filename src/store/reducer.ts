import { createReducer } from '@reduxjs/toolkit';
import { sortingActions, updateCity, updateOffersList } from './action';
import { State } from './store.types';
import { TPlaceCard } from '../components/place-card/place-card';
import { SortOptions } from '../components/offers-sorting/offers-sorting.types';

const initialState: State = {
  city: null,
  offersList: [],
};

const offersSortFunctions = {
  [SortOptions.Popular]: (offers: Array<TPlaceCard>) => offers.slice(),
  [SortOptions.Price_low_to_high]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => a.price - b.price),
  [SortOptions.Price_high_to_low]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => b.price - a.price),
  [SortOptions.Top_rated_first]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => b.rating - a.rating),
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(updateCity, (state, { payload }) => {
    state.city = payload;
  });
  builder.addCase(updateOffersList, (state, { payload }) => {
    state.offersList = payload.offers.filter((offer) => offer.city.name === payload.cityName);
  });
  Object.entries(SortOptions).forEach(([, option]) => {
    const actionName = sortingActions[option];
    builder.addCase(actionName, (state, { payload }) => {
      state.offersList = offersSortFunctions[option](payload.offers);
    });
  });
});

export { reducer };
