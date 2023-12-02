import { TPlaceCard } from '../../components/place-card/place-card';
import { NameSpace } from '../../const';
import { AppState } from '../store.types';

export const getOffers = (state: AppState): Array<TPlaceCard> | null => state[NameSpace.Data].offersList;
