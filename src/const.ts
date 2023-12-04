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

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

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
