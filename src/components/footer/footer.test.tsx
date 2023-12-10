import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { withMockHistory } from '../../utils/mock-components';

describe('Component: Footer', () => {
  it('Should render correct', () => {
    const component = withMockHistory(<Footer />);

    render(component);

    expect(screen.getByTestId('footerElem')).toBeInTheDocument();
    expect(screen.getByTestId('footerImgElem')).toBeInTheDocument();
  });
});
