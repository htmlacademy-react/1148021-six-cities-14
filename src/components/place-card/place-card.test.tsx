import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeMockOffer } from '../../utils/mocks';
import { withMockHistoryStore } from '../../utils/mock-components';
import PlaceCard from './place-card';

describe('[Component: Card-place:]', () => {
  it('Should render correct', () => {
    const mockOffer = makeMockOffer();
    mockOffer.isPremium = false;

    const { withStoreComponent } = withMockHistoryStore(<PlaceCard card={mockOffer} section="cities" />);

    render(withStoreComponent);

    expect(screen.getByTestId('placeCardEl')).toBeInTheDocument();
    expect(screen.queryByTestId('placeCardPremiumEl')).toBeNull();
    expect(screen.getByTestId('placeCardImageEl')).toBeInTheDocument();
  });

  it('Should correct react onCardHover/onCardDelete', async () => {
    const user = userEvent.setup();
    const mockOffer = makeMockOffer();
    const onCardHover = vi.fn();
    const onCardDelete = vi.fn();
    const { withStoreComponent } = withMockHistoryStore(
      <PlaceCard card={mockOffer} section="favorites" onCardHover={onCardHover} onCardDelete={onCardDelete} />
    );

    render(withStoreComponent);

    const placeCard = screen.getByTestId('placeCardEl');

    expect(screen.queryByTestId('placeCardPremiumEl')).not.toBeNull();

    expect(onCardHover).toBeCalledTimes(0);
    expect(onCardDelete).toBeCalledTimes(0);

    await user.hover(placeCard);
    expect(onCardHover).toBeCalledTimes(1);
  });
});
