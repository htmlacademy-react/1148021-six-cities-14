import { render, screen } from '@testing-library/react';
import Review from './review';
import { makeMockReview } from '../../utils/mocks';
import { formatDateForReview } from '../../utils/utils';

describe('Component: Review', () => {
  it('Should render correct', () => {
    const mockReview = makeMockReview();

    render(<Review review={mockReview} />);

    expect(screen.getByTestId('reviewEl')).toBeInTheDocument();
    expect(screen.getByText(formatDateForReview(mockReview.date))).toBeInTheDocument();
  });
});
