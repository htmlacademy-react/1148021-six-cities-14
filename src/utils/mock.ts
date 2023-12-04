import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { TPlaceCard } from '../components/place-card/place-card.types';
import { AuthStatus, CityName, NameSpace } from '../const';
import { AppState, AuthData, UserData } from '../store/store.types';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';

export const makeMockOffer = (id?: TPlaceCard['id']): TPlaceCard => ({
  city: {
    name: CityName.Amsterdam,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  previewImage: 'https://14.react.pages.academy/static/offer/13.jpg',
  images: [
    'https://14.react.pages.academy/static/offer/11.jpg',
    'https://14.react.pages.academy/static/offer/2.jpg',
    'https://14.react.pages.academy/static/offer/15.jpg',
    'https://14.react.pages.academy/static/offer/9.jpg',
    'https://14.react.pages.academy/static/offer/14.jpg',
    'https://14.react.pages.academy/static/offer/1.jpg',
    'https://14.react.pages.academy/static/offer/4.jpg',
    'https://14.react.pages.academy/static/offer/3.jpg',
    'https://14.react.pages.academy/static/offer/5.jpg',
  ],
  title: 'Amazing and Extremely Central Flat',
  isFavorite: false,
  isPremium: true,
  rating: 3.7,
  type: 'hotel',
  bedrooms: 1,
  maxAdults: 10,
  price: 218,
  goods: ['Washer', 'Laptop friendly workspace', 'Breakfast'],
  host: {
    id: 25,
    name: 'Angelina',
    isPro: true,
    avatarUrl: 'img/avatar-angelina.jpg',
  },
  description:
    'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
  location: {
    latitude: 48.87861,
    longitude: 2.357499,
    zoom: 16,
  },
  id: id || 1,
});

export const makeMockOfferForCity = (cityName: CityName, id?: TPlaceCard['id']): TPlaceCard => {
  const offer = makeMockOffer(id);
  offer.city.name = cityName;
  return offer;
};

export const mockUserData = (): UserData => ({
  id: 1,
  email: 'test@yandex.ru',
  name: 'testName',
  avatarUrl: 'https://14.react.pages.academy/static/avatar/7.jpg',
  isPro: false,
  token: 'jhjyo7by7ybp97yp9ypb',
});

export const mockAuthData = (): AuthData => ({
  login: 'test',
  password: 'jhkv6ikhGgf',
});

export const mockStore = (): AppState => ({
  [NameSpace.Cities]: {
    city: CityName.Paris,
    cityOffers: [
      makeMockOfferForCity(CityName.Paris, 1),
      makeMockOfferForCity(CityName.Paris, 2),
      makeMockOfferForCity(CityName.Paris, 3),
      makeMockOfferForCity(CityName.Paris, 4),
    ],
    error: null,
  },
  [NameSpace.User]: {
    authStatus: AuthStatus.Auth,
    userData: mockUserData(),
  },
  [NameSpace.Data]: {
    offersList: [
      makeMockOfferForCity(CityName.Paris, 1),
      makeMockOfferForCity(CityName.Paris, 2),
      makeMockOfferForCity(CityName.Paris, 3),
      makeMockOfferForCity(CityName.Paris, 4),

      makeMockOfferForCity(CityName.Amsterdam, 5),
      makeMockOfferForCity(CityName.Brussels, 6),
    ],
    favoritesList: [makeMockOfferForCity(CityName.Paris, 2), makeMockOfferForCity(CityName.Paris, 3)],
    favoritesCount: 2,
  },
});

export type AppThunkDispatch = ThunkDispatch<AppState, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export function getFakeStore() {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<AppState, Action<string>, AppThunkDispatch>(middleware);

  return { axios, mockAxiosAdapter, middleware, mockStoreCreator };
}
