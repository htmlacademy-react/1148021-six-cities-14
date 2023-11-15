import { ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';
import { TPlaceCard } from '../components/place-card/place-card';
import { SortOptions } from '../components/offers-sorting/offers-sorting.types';
import { CityName } from '../const';

export const updateCity = createAction<CityName>('updateCity');
export const updateOffersList = createAction<{ cityName: CityName; offers: Array<TPlaceCard> }>('offers/updateByCity');

type SortingActionType = { offers: Array<TPlaceCard>; name: string };
export const sortingActions: { [key: string]: ActionCreatorWithPayload<SortingActionType> } = {};
Object.entries(SortOptions).forEach(([, option]) => {
  sortingActions[option] = createAction<SortingActionType>(`offers/sort/${option}`);
});
