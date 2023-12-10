import { renderHook } from '@testing-library/react';
import useMap from './use-map';
import { makeMockOffer } from '../utils/mocks';

describe('Hook: useMap', () => {
  it('Should return "null" if Ref = null', () => {
    const city = makeMockOffer().city;
    const mapRef = { current: null };

    const { result } = renderHook(() => useMap(mapRef, city));

    expect(result.current).toBe(null);
  });

  it('Should return Map-instance if Ref = HTMLElement', () => {
    const city = makeMockOffer().city;
    const mapRef = { current: document.createElement('section') };

    const { result } = renderHook(() => useMap(mapRef, city));

    expect(result.current).not.toBe(null);
    expect(result.current).toBeDefined();
  });
});
