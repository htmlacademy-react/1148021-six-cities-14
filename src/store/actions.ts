import { ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';
import { TPlaceCard } from '../components/place-card/place-card';
import { SortOptions } from '../components/offers-sorting/offers-sorting.types';
import { AppRoute, AuthStatus, CityName } from '../const';
import { RedirectToRouteActionType } from './middlewares/redirect';
import { UserData } from './store.types';

export const updateCity = createAction<CityName>('cities/updateCity');
export const updateCityOffers = createAction<{ cityName: CityName; offers: Array<TPlaceCard> }>(
  'cities/offers/updateByCity'
);

type SortingActionType = { offers: Array<TPlaceCard>; name: string };
export const sortingActions: { [key: string]: ActionCreatorWithPayload<SortingActionType> } = {};
Object.entries(SortOptions).forEach(([, option]) => {
  sortingActions[option] = createAction<SortingActionType>(`cities/offers/sort/${option}`);
});

export const loadOffers = createAction<Array<TPlaceCard>>('cities/data/loadOffers');

export const requireAuthorization = createAction<AuthStatus>('cities/user/requireAuthorization');

export const setError = createAction<string | null>('cities/setError');

export const redirectToRoute = createAction<AppRoute>(RedirectToRouteActionType);

export const setUserData = createAction<UserData | null>('cities/user/setData');
