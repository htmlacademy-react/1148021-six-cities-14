import { render, screen } from '@testing-library/react';
import Preloader from './preloader';

describe('Component: Preloader', () => {
  it('Should render correct', () => {
    render(<Preloader />);

    expect(screen.getByTestId('preloaderEl')).toBeInTheDocument();
  });
});
