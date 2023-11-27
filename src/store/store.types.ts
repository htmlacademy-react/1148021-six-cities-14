import { store } from '.';
import { TPlaceCard } from '../components/place-card/place-card';
import { AuthStatus, CityName } from '../const';

export type State = {
  city: CityName | null;
  offersList: Array<TPlaceCard> | null;
  cityOffers: Array<TPlaceCard>;
  authorizationStatus: AuthStatus;
  error: string | null;
  userData: UserData | null;
};

export type AppDispatch = typeof store.dispatch;

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
};
