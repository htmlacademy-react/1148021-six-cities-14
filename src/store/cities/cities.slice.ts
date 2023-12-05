import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CityName, NameSpace } from '../../const';
import { SortOptions } from '../../components/offers-sorting/offers-sorting.types';
import { TPlaceCard } from '../../components/place-card/place-card.types';
import { logoutAction } from '../api-actions';

const initialState: {
  city: CityName | null;
  cityOffers: Array<TPlaceCard>;
  error: string | null;
} = {
  city: null,
  cityOffers: [],
  error: null,
};

const offersSortFunctions = {
  [SortOptions.Popular]: (offers: Array<TPlaceCard>) => offers.slice(),
  [SortOptions.Price_low_to_high]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => a.price - b.price),
  [SortOptions.Price_high_to_low]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => b.price - a.price),
  [SortOptions.Top_rated_first]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => b.rating - a.rating),
};

export const citiesSlice = createSlice({
  name: NameSpace.Cities,
  initialState,
  reducers: {
    updateCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
    updateCityOffers: (
      state,
      action: PayloadAction<{ offers: Array<TPlaceCard>; cityName?: CityName; option?: SortOptions }>
    ) => {
      const { offers, cityName, option } = action.payload;
      let newCityOffers = offers;

      if (cityName) {
        newCityOffers = newCityOffers.filter((offer) => offer.city.name === cityName);
      }

      if (option && offersSortFunctions[option]) {
        newCityOffers = offersSortFunctions[option](newCityOffers);
      }

      state.cityOffers = newCityOffers;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(logoutAction.fulfilled, (state) => {
      const clearedCityOffers = state.cityOffers.map((offer) => ({ ...offer, isFavorite: false }));
      state.cityOffers = clearedCityOffers;
    });
  },
});

export const { updateCity, updateCityOffers, setError } = citiesSlice.actions;
