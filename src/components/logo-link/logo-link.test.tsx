import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import LogoLink from './logo-link';

describe('Component: LogoLink', () => {
  it('Should render correct', () => {
    const component = withHistory(<LogoLink />);

    render(component);

    expect(screen.getByTestId('logoLinkEl')).toBeInTheDocument();
    expect(screen.getByTestId('logoLinkImgEl')).toBeInTheDocument();
  });
});
