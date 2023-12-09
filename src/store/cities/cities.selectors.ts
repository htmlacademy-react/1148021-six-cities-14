import { createSelector } from '@reduxjs/toolkit';
import { SortOptions } from '../../components/offers-sorting/offers-sorting.types';
import { TPlaceCard } from '../../components/place-card/place-card.types';
import { CityName, NameSpace } from '../../const';
import { AppState } from '../store.types';

const offersSortings = {
  [SortOptions.Popular]: (offers: Array<TPlaceCard>) => offers.slice(),
  [SortOptions.Price_low_to_high]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => a.price - b.price),
  [SortOptions.Price_high_to_low]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => b.price - a.price),
  [SortOptions.Top_rated_first]: (offers: Array<TPlaceCard>) => offers.toSorted((a, b) => b.rating - a.rating),
};

export const getError = (state: AppState): string | null => state[NameSpace.Cities].error;

export const selectOffersByCityAndSort = createSelector(
  [
    (state: AppState, cityName: CityName, option: SortOptions) => ({
      offers: state[NameSpace.Data].offersList,
      cityName,
      option,
    }),
  ],
  (values) => {
    const { offers, cityName, option } = values;

    if (!offers) {
      return null;
    }

    let newOffers = offers;

    if (cityName) {
      newOffers = newOffers.filter((offer) => offer.city.name === cityName);
    }

    if (option && offersSortings[option]) {
      newOffers = offersSortings[option](newOffers);
    }

    return newOffers;
  }
);
