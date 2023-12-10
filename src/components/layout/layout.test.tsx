import { render, screen } from '@testing-library/react';
import { AuthStatus, NameSpace } from '../../const';
import { makeMockUserData } from '../../utils/mocks';
import { withMockHistoryStore as withMockHistoryStore } from '../../utils/mock-components';
import Layout from './layout';

describe('Component: Layout', () => {
  it('Should render correct if not authorized', () => {
    const { withStoreComponent } = withMockHistoryStore(<Layout />);
    render(withStoreComponent);

    expect(screen.getByTestId('preloaderEl')).toBeInTheDocument();
  });

  it('Should render correct if is authorized', () => {
    const { withStoreComponent } = withMockHistoryStore(<Layout />, {
      [NameSpace.User]: { authStatus: AuthStatus.Auth, userData: makeMockUserData() },
    });
    render(withStoreComponent);

    expect(screen.queryByTestId('preloaderEl')).toBeNull();
  });
});
