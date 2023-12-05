import { citiesSlice, setError, updateCity, updateCityOffers } from './cities.slice';
import { CityName } from '../../const';
import { AxiosError } from 'axios';
import { makeMockOfferForCity } from '../../utils/mock';
import { AppState } from '../store.types';
import { logoutAction } from '../api-actions';

describe('Cities slice', () => {
  it('Should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: AppState['CITIES'] = {
      city: 'Paris' as CityName,
      cityOffers: [],
      error: null,
    };

    const result = citiesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const initialState: AppState['CITIES'] = {
      city: null,
      cityOffers: [],
      error: null,
    };

    const result = citiesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should update city with "updateCity" action', () => {
    const initialState: AppState['CITIES'] = {
      city: CityName.Amsterdam,
      cityOffers: [],
      error: null,
    };
    const newCity = CityName.Cologne;
    const expectedState = { ...initialState, city: newCity };

    const result = citiesSlice.reducer(initialState, updateCity(newCity));

    expect(result).toEqual(expectedState);
  });

  it('should set error with "setError" action', () => {
    const initialState: AppState['CITIES'] = {
      city: CityName.Amsterdam,
      cityOffers: [],
      error: null,
    };
    const error = new AxiosError('Test error');
    const expectedState = { ...initialState, error: error.message };

    const result = citiesSlice.reducer(initialState, setError(error.message));

    expect(result).toEqual(expectedState);
  });

  it('should update city offers with "updateCityOffers" action', () => {
    const initialState: AppState['CITIES'] = {
      city: null,
      cityOffers: [],
      error: null,
    };
    const newCityOffers = [
      makeMockOfferForCity(CityName.Amsterdam),
      makeMockOfferForCity(CityName.Amsterdam),
      makeMockOfferForCity(CityName.Brussels),
      makeMockOfferForCity(CityName.Cologne),
    ];

    const result = citiesSlice.reducer(initialState, updateCityOffers({ offers: newCityOffers }));
    const expectedState = { ...initialState, cityOffers: newCityOffers };
    expect(result).toEqual(expectedState);
  });

  it('should update city offers (with filtering by city) with "updateCityOffers" action', () => {
    const initialState: AppState['CITIES'] = {
      city: null,
      cityOffers: [],
      error: null,
    };
    const newCityOffers = [
      makeMockOfferForCity(CityName.Amsterdam),
      makeMockOfferForCity(CityName.Amsterdam),
      makeMockOfferForCity(CityName.Brussels),
      makeMockOfferForCity(CityName.Cologne),
    ];

    const result = citiesSlice.reducer(
      initialState,
      updateCityOffers({ offers: newCityOffers, cityName: CityName.Amsterdam })
    );
    const expectedState = {
      ...initialState,
      cityOffers: [makeMockOfferForCity(CityName.Amsterdam), makeMockOfferForCity(CityName.Amsterdam)],
    };
    expect(result).toMatchObject(expectedState);
  });

  it('should reset isFavorite = false in all cityOffers with "logoutAction.fulfilled"', () => {
    const mockCityOffers = [
      { ...makeMockOfferForCity(CityName.Cologne, 1), isFavorite: true },
      makeMockOfferForCity(CityName.Cologne, 2),
      { ...makeMockOfferForCity(CityName.Cologne, 3), isFavorite: true },
    ];
    const initialState: AppState['CITIES'] = {
      cityOffers: mockCityOffers,
      city: CityName.Cologne,
      error: null,
    };

    const result = citiesSlice.reducer(initialState, logoutAction.fulfilled);
    const expectedState = {
      ...initialState,
      cityOffers: mockCityOffers.map((offer) => ({ ...offer, isFavorite: false })),
    };

    expect(result.cityOffers).toMatchObject(expectedState.cityOffers);
  });
});
