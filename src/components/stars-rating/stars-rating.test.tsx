import { render, screen } from '@testing-library/react';
import StarsRating from './stars-rating';

describe('Component: StarsRating', () => {
  it('Should render correct', () => {
    const rating = 4.3;

    render(<StarsRating rating={rating} cssPrefix="offer" showValue />);

    expect(screen.getByTestId('starsRatingEl')).toBeInTheDocument();
    expect(screen.getByText(Math.round(rating))).toBeInTheDocument();
  });
});
