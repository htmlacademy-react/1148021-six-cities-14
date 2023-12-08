import { citiesSlice, setError } from './cities.slice';
import { NameSpace } from '../../const';
import { AxiosError } from 'axios';
import { AppState } from '../store.types';

describe('Cities slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: AppState[NameSpace.Cities] = {
      error: null,
    };

    const result = citiesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const initialState: AppState[NameSpace.Cities] = {
      error: null,
    };

    const result = citiesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should set error with "setError" action', () => {
    const initialState: AppState[NameSpace.Cities] = {
      error: null,
    };
    const error = new AxiosError('Test error');
    const expectedState = { ...initialState, error: error.message };

    const result = citiesSlice.reducer(initialState, setError(error.message));

    expect(result).toEqual(expectedState);
  });
});
