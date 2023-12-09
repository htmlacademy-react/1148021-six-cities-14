import { render, screen } from '@testing-library/react';
import Map from './map';
import { makeMockOffer } from '../../utils/mocks';
import { TPoint } from './map.types';

describe('Component: OffersSorting', () => {
  it('Should render correct', () => {
    const mockOffer = makeMockOffer();
    const points = [
      [0, 0],
      [0, 9],
    ] as Array<TPoint>;

    render(
      <Map
        city={mockOffer.city}
        points={points}
        selectedPoint={points[0]}
        section="cities"
        style={{ color: 'white' }}
      />
    );

    expect(screen.getByTestId('mapEl')).toBeInTheDocument();
  });
});
