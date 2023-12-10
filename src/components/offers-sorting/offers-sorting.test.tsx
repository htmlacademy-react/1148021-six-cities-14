import { render, screen } from '@testing-library/react';
import OffersSorting from './offers-sorting';
import { withMockHistory } from '../../utils/mock-components';
import { SortOptions } from './offers-sorting.types';

describe('Component: OffersSorting', () => {
  it('Should render correct', () => {
    const component = withMockHistory(<OffersSorting />);
    render(component);

    expect(screen.getByTestId('offersSortingEl')).toBeInTheDocument();
    Object.entries(SortOptions).forEach(([, option]) =>
      expect(screen.getAllByText(option).length).toBe(option === SortOptions.Popular ? 2 : 1)
    );
  });
});
