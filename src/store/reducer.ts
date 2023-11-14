import { createReducer } from '@reduxjs/toolkit';
import { updateCity, updateOffersList } from './action';
import { State } from './store.types';

const initialState: State = {
  city: 'Paris',
  offersList: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(updateCity, (state, { payload }) => {
    state.city = payload;
  });
  builder.addCase(updateOffersList, (state, { payload }) => {
    state.offersList = payload.offers.filter((card) => card.city.name === payload.cityName);
  });
});

export { reducer };
