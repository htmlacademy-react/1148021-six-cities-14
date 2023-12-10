import { render, screen } from '@testing-library/react';
import { withMockHistoryStore as withMockHistoryStore } from '../../utils/mock-components';
import YourReviewForm from './your-review-form';
import userEvent from '@testing-library/user-event';

describe('Component: YourReviewForm', () => {
  it('Should render correct', async () => {
    const user = userEvent.setup();
    const offerId = 56;
    const handleSubmitSuccess = vi.fn();
    const { withStoreComponent } = withMockHistoryStore(
      <YourReviewForm offerId={offerId} onSubmitSuccess={handleSubmitSuccess} />
    );
    render(withStoreComponent);

    const yourReviewTextEl = screen.getByTestId('yourReviewTextEl');
    const yourReviewBtnEl = screen.getByTestId('yourReviewBtnEl');
    const yourReviewRatingEls = screen.getAllByTestId('yourReviewRatingEl');

    expect(yourReviewRatingEls.length).toBe(5);
    expect(yourReviewTextEl).toBeInTheDocument();
    expect(yourReviewBtnEl).toBeInTheDocument();

    expect(yourReviewBtnEl).toBeDisabled();

    const text =
      'The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.';
    await user.type(yourReviewTextEl, text);
    await user.click(yourReviewRatingEls.at(3) as HTMLElement);

    expect(yourReviewBtnEl).not.toBeDisabled();
  });
});
