import { citiesSlice } from './cities.slice';
import { CityName } from '../../const';

describe('Cities slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '', payload: '' };
    const expectedState = {
      city: 'Paris' as CityName,
      cityOffers: [],
      error: null,
    };

    const result = citiesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
