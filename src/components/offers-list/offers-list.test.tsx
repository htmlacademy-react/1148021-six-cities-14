import { render, screen } from '@testing-library/react';
import OffersList from './offers-list';
import { makeMockOffer } from '../../utils/mocks';
import { withMockHistoryStore } from '../../utils/mock-components';
import { DEFAULT_CITY } from '../../const';

describe('Component: OffersList', () => {
  it('Should render correct', () => {
    const offers = [makeMockOffer(1), makeMockOffer(2)];
    const { withStoreComponent } = withMockHistoryStore(<OffersList offers={offers} city={DEFAULT_CITY} />);

    render(withStoreComponent);
    const placeCards = screen.getAllByTestId('placeCardEl');

    placeCards.forEach((card) => expect(card).toBeInTheDocument());
    expect(placeCards.length).toBe(offers.length);
  });
});
