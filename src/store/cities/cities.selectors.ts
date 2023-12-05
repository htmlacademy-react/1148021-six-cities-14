import { TPlaceCard } from '../../components/place-card/place-card.types';
import { CityName, NameSpace } from '../../const';
import { AppState } from '../store.types';

export const getCity = (state: AppState): CityName | null => state[NameSpace.Cities].city;
export const getCityOffers = (state: AppState): Array<TPlaceCard> => state[NameSpace.Cities].cityOffers;
export const getError = (state: AppState): string | null => state[NameSpace.Cities].error;
