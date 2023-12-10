import { NameSpace } from '../../const';
import { makeMockOffer } from '../../utils/mocks';
import { fetchFavoritesAction, fetchOffersAction, logoutAction } from '../api-actions';
import { AppState } from '../store.types';
import { dataSlice } from './data.slice';

describe('Data slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: AppState[NameSpace.Data] = {
      offersList: null,
      favoritesIds: [],
    };

    const result = dataSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const initialState: AppState[NameSpace.Data] = {
      offersList: null,
      favoritesIds: [],
    };

    const result = dataSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set offers list with "fetchOffersAction.fulfilled"', () => {
    const mockOffersList = makeMockOffer();
    const initialState: AppState[NameSpace.Data] = {
      offersList: null,
      favoritesIds: [],
    };

    const result = dataSlice.reducer(initialState, fetchOffersAction.fulfilled([mockOffersList], '', undefined));
    const expectedState = { ...initialState, offersList: [mockOffersList] };

    expect(result).toEqual(expectedState);
  });

  it('should set offers list = [] with "fetchOffersAction.rejected"', () => {
    const initialState: AppState[NameSpace.Data] = {
      offersList: null,
      favoritesIds: [],
    };

    const result = dataSlice.reducer(initialState, fetchOffersAction.rejected);
    const expectedState = { ...initialState, offersList: [] };

    expect(result).toEqual(expectedState);
  });

  it('should set favorites with "fetchFavoritesAction.fulfilled"', () => {
    const initialState: AppState[NameSpace.Data] = {
      offersList: null,
      favoritesIds: [],
    };

    const mockFavsList = [makeMockOffer(1), makeMockOffer(4)];
    const result = dataSlice.reducer(initialState, fetchFavoritesAction.fulfilled(mockFavsList, '', undefined));
    const expectedState = { ...initialState, favoritesIds: [1, 4] };

    expect(result).toEqual(expectedState);
  });

  it('should set favorites = [] with "fetchFavoritesAction.rejected"', () => {
    const initialState: AppState[NameSpace.Data] = {
      offersList: null,
      favoritesIds: [7, 9],
    };

    const result = dataSlice.reducer(initialState, fetchFavoritesAction.rejected);
    const expectedState = { ...initialState, favoritesIds: [] };

    expect(result).toEqual(expectedState);
  });

  it('should set favorites = [] with "logoutAction.fulfilled"', () => {
    const favIds = [1, 3, 4];
    const mockOffersList = [makeMockOffer(1), makeMockOffer(2), makeMockOffer(3), makeMockOffer(4), makeMockOffer(5)];
    const initialState: AppState[NameSpace.Data] = {
      offersList: mockOffersList,
      favoritesIds: favIds,
    };

    const result = dataSlice.reducer(initialState, logoutAction.fulfilled);
    const expectedState = { ...initialState, favoritesIds: [] };

    expect(result).toEqual(expectedState);
  });
});
