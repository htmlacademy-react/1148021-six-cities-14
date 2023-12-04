import { makeMockOffer } from '../../utils/mock';
import { fetchFavoritesAction, fetchOffersAction, logoutAction } from '../api-actions';
import { AppState } from '../store.types';
import { dataSlice } from './data.slice';

describe('Data slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: AppState['DATA'] = {
      offersList: null,
      favoritesList: null,
      favoritesCount: 0,
    };

    const result = dataSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const initialState: AppState['DATA'] = {
      offersList: null,
      favoritesList: null,
      favoritesCount: 0,
    };

    const result = dataSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set offers list with "fetchOffersAction.fulfilled"', () => {
    const mockOffersList = makeMockOffer();
    const initialState: AppState['DATA'] = {
      offersList: null,
      favoritesList: null,
      favoritesCount: 0,
    };

    const result = dataSlice.reducer(initialState, fetchOffersAction.fulfilled([mockOffersList], '', undefined));
    const expectedState = { ...initialState, offersList: [mockOffersList] };

    expect(result).toEqual(expectedState);
  });

  it('should set offers list = [] with "fetchOffersAction.rejected"', () => {
    const initialState: AppState['DATA'] = {
      offersList: null,
      favoritesList: null,
      favoritesCount: 0,
    };

    const result = dataSlice.reducer(initialState, fetchOffersAction.rejected);
    const expectedState = { ...initialState, offersList: [] };

    expect(result).toEqual(expectedState);
  });

  it('should set favorites list with "fetchFavoritesAction.fulfilled"', () => {
    const mockFavsList = makeMockOffer();
    const initialState: AppState['DATA'] = {
      offersList: null,
      favoritesList: null,
      favoritesCount: 0,
    };

    const result = dataSlice.reducer(initialState, fetchFavoritesAction.fulfilled([mockFavsList], '', undefined));
    const expectedFavsList = [mockFavsList];
    const expectedState = { ...initialState, favoritesList: expectedFavsList, favoritesCount: expectedFavsList.length };

    expect(result).toEqual(expectedState);
    expect(result.favoritesCount).toBe(expectedFavsList.length);
  });

  it('should set favorites list = [] and favoritesCount = 0 with "fetchFavoritesAction.rejected"', () => {
    const initialState: AppState['DATA'] = {
      offersList: null,
      favoritesList: null,
      favoritesCount: 0,
    };

    const result = dataSlice.reducer(initialState, fetchFavoritesAction.rejected);
    const expectedState = { ...initialState, favoritesList: [], favoritesCount: 0 };

    expect(result).toEqual(expectedState);
    expect(result.favoritesCount).toBe(0);
  });

  it('should set favorites list = [] and favoritesCount = 0 with "logoutAction.fulfilled"', () => {
    const mockFavsList = [makeMockOffer(), makeMockOffer(), makeMockOffer()];
    const initialState: AppState['DATA'] = {
      offersList: [makeMockOffer()],
      favoritesList: mockFavsList,
      favoritesCount: mockFavsList.length,
    };

    const result = dataSlice.reducer(initialState, logoutAction.fulfilled);
    const expectedState = { ...initialState, favoritesList: [], favoritesCount: 0 };

    expect(result).toEqual(expectedState);
    expect(result.favoritesCount).toBe(0);
  });
});
