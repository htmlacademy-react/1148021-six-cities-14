import { TPlaceCard } from '../../components/place-card/place-card.types';
import { NameSpace } from '../../const';
import { AppState } from '../store.types';

export const getOffers = (state: AppState): Array<TPlaceCard> | null => state[NameSpace.Data].offersList;
export const getFavoritesCount = (state: AppState): number => state[NameSpace.Data].favoritesIds.length;
export const getFavoritesIds = (state: AppState): Array<TPlaceCard['id']> => state[NameSpace.Data].favoritesIds;
