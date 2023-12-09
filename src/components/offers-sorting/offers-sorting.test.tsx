import { render, screen } from '@testing-library/react';
import OffersSorting from './offers-sorting';
import { withHistory } from '../../utils/mock-component';
import { SortOptions } from './offers-sorting.types';

describe('Component: OffersSorting', () => {
  it('Should render correct', () => {
    const component = withHistory(<OffersSorting />);
    render(component);

    expect(screen.getByTestId('offersSortingEl')).toBeInTheDocument();
    Object.entries(SortOptions).forEach(([, option]) =>
      expect(screen.getAllByText(option).length).toBe(option === SortOptions.Popular ? 2 : 1)
    );
  });
});
