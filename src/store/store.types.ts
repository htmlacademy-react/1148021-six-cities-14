import { store } from '.';
import { CityName, TPlaceCard } from '../components/place-card/place-card';

export type State = {
  city: CityName;
  offersList: Array<TPlaceCard>;
};

export type AppDispatch = typeof store.dispatch;
