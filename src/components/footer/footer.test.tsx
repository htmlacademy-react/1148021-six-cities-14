import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withHistory } from '../../utils/mock-component';

describe('Component: Footer', () => {
  it('Should render correct', () => {
    const component = withHistory(<Footer />);

    render(component);

    expect(screen.getByTestId('footerElem')).toBeInTheDocument();
    expect(screen.getByTestId('footerImgElem')).toBeInTheDocument();
  });
});
