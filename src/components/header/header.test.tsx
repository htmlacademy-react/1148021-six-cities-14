import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { AuthStatus, NameSpace } from '../../const';
import { makeMockOffer, makeMockUserData } from '../../utils/mocks';
import { withMockHistoryStore as withMockHistoryStore } from '../../utils/mock-components';

describe('Component: Header', () => {
  it('Should render correct', () => {
    const { withStoreComponent } = withMockHistoryStore(<Header />);
    render(withStoreComponent);

    expect(screen.getByTestId('headerEl')).toBeInTheDocument();
    expect(screen.getByTestId('headerSignInEl')).toBeInTheDocument();

    expect(screen.queryByTestId('headerFavsCountEl')).toBeNull();
    expect(screen.queryByTestId('headerSignOutEl')).toBeNull();
  });

  it('Should render correct if is authorized', () => {
    const mockUser = makeMockUserData();
    const { withStoreComponent } = withMockHistoryStore(<Header />, {
      [NameSpace.User]: { authStatus: AuthStatus.Auth, userData: mockUser },
      [NameSpace.Data]: { favoritesIds: [1], offersList: [makeMockOffer(1)] },
    });
    render(withStoreComponent);

    expect(screen.getByTestId('headerEl')).toBeInTheDocument();
    expect(screen.getByTestId('headerFavsCountEl')).toBeInTheDocument();
    expect(screen.getByTestId('headerSignOutEl')).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    expect(screen.queryByTestId('headerSignInEl')).toBeNull();
  });
});
