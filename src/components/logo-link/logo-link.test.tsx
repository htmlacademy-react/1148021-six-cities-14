import { render, screen } from '@testing-library/react';
import { withMockHistory } from '../../utils/mock-components';
import LogoLink from './logo-link';

describe('Component: LogoLink', () => {
  it('Should render correct', () => {
    const component = withMockHistory(<LogoLink />);

    render(component);

    expect(screen.getByTestId('logoLinkEl')).toBeInTheDocument();
    expect(screen.getByTestId('logoLinkImgEl')).toBeInTheDocument();
  });
});
