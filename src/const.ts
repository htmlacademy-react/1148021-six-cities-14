export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  NotFound = '/404',
}

export const APP_TITLE = '6 cities';

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT = '../markup/img/pin.svg';

export const URL_MARKER_CURRENT = '../markup/img/pin-active.svg';

export enum CityName {
  'Paris' = 'Paris',
  'Cologne' = 'Cologne',
  'Brussels' = 'Brussels',
  'Amsterdam' = 'Amsterdam',
  'Hamburg' = 'Hamburg',
  'Dusseldorf' = 'Dusseldorf',
}

export const APP_CITIES = [
  CityName.Paris,
  CityName.Cologne,
  CityName.Brussels,
  CityName.Amsterdam,
  CityName.Hamburg,
  CityName.Dusseldorf,
] as const;
export const DEFAULT_CITY: CityName = CityName.Paris;

export enum ApartmentType {
  apartment = 'Apartment',
  room = 'Room',
  house = 'House',
  hotel = 'Hotel',
}

export const TIMEOUT_SHOW_ERROR = 5000;

export enum NameSpace {
  Data = 'DATA',
  Cities = 'CITIES',
  User = 'USER',
}

export const SORT_BY_SEARCH_PARAM_NAME = 'sortBy';

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
}

export enum APIAction {
  FetchFavorites = 'data/fetchFavorites',
  FetchOffers = 'data/fetchOffers',
  ClearError = 'cities/clearError',
  RedirectToRoute = 'cities/redirectToRoute',
  UserLogin = 'user/login',
  UserLogout = 'user/logout',
  UserCheckAuth = 'user/checkAuth',
}

export const MAX_OFFER_PHOTOS_COUNT = 6;
export const MAX_OFFER_NEARBIES_COUNT = 3;

export enum ReviewTextLength {
  Min = 50,
  Max = 300,
}

export const STARS = [
  { count: 5, title: 'perfect' },
  { count: 4, title: 'good' },
  { count: 3, title: 'not bad' },
  { count: 2, title: '' },
  { count: 1, title: '' },
] as const;
