import { createAction } from '@reduxjs/toolkit';
import { CityName, TPlaceCard } from '../components/place-card/place-card';

export const updateCity = createAction<CityName>('updateCity');
export const updateOffersList = createAction<{ cityName: CityName; offers: Array<TPlaceCard> }>('updateOffersList');
