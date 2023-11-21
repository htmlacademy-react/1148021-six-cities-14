import { store } from '.';
import { TPlaceCard } from '../components/place-card/place-card';
import { CityName } from '../const';

export type State = {
  city: CityName | null;
  offersList: Array<TPlaceCard> | null;
  cityOffers: Array<TPlaceCard>;
};

export type AppDispatch = typeof store.dispatch;
