import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthStatus, DEFAULT_CITY, NameSpace } from '../../const';
import App from './app';
import { makeMockOffer, makeMockUserData } from '../../utils/mocks';
import { withMockHistory, withMockStore } from '../../utils/mock-components';
import { AppState } from '../../store/store.types';
import React from 'react';

describe('Component: App (Application Routing)', () => {
  let mockHistory: MemoryHistory;
  let preparedComponent: React.ReactElement;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    preparedComponent = withMockHistory(<App />, mockHistory);
  });

  it('Should render "Preloader" when auth status not chcked yet', () => {
    const { withStoreComponent } = withMockStore(preparedComponent);
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId('preloaderEl')).toBeInTheDocument();
  });

  it('should render "MainPage" when user navigate to "/"', () => {
    const initialMockState: Partial<AppState> = {
      [NameSpace.User]: { authStatus: AuthStatus.Auth, userData: makeMockUserData() },
    };
    const { withStoreComponent } = withMockStore(preparedComponent, initialMockState);
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId('preloaderEl')).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_CITY)).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/login"', () => {
    const initialMockState: Partial<AppState> = {
      [NameSpace.User]: { authStatus: AuthStatus.NoAuth, userData: null },
    };
    const { withStoreComponent } = withMockStore(preparedComponent, initialMockState);
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByTestId('loginFieldEl')).toBeInTheDocument();
    expect(screen.getByTestId('passwordFieldEl')).toBeInTheDocument();
    expect(screen.getByTestId('loginBtnEl')).toBeInTheDocument();
  });

  it('should render "LoginPage" when user navigate to "/favorites" if not authorized', () => {
    const initialMockState: Partial<AppState> = {
      [NameSpace.User]: { authStatus: AuthStatus.NoAuth, userData: null },
    };
    const { withStoreComponent } = withMockStore(preparedComponent, initialMockState);
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByTestId('loginFieldEl')).toBeInTheDocument();
    expect(screen.getByTestId('passwordFieldEl')).toBeInTheDocument();
    expect(screen.getByTestId('loginBtnEl')).toBeInTheDocument();
  });

  it('should render "MainPage" when user navigate to "/login" but is logged in', () => {
    const initialMockState: Partial<AppState> = {
      [NameSpace.User]: { authStatus: AuthStatus.Auth, userData: makeMockUserData() },
    };
    const { withStoreComponent } = withMockStore(preparedComponent, initialMockState);
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.queryByTestId('loginFieldEl')).toBeNull();
    expect(screen.queryByTestId('passwordFieldEl')).toBeNull();
    expect(screen.queryByTestId('loginBtnEl')).toBeNull();

    expect(screen.getByTestId('mainEl')).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigate to "/offer/:id" ', () => {
    const mockOffer = makeMockOffer(12);
    const initialMockState: Partial<AppState> = {
      [NameSpace.User]: { authStatus: AuthStatus.NoAuth, userData: null },
    };
    const { withStoreComponent } = withMockStore(preparedComponent, initialMockState);

    vi.mock('react-router', () => ({
      useParams: jest.fn().mockReturnValue({ id: mockOffer.id }),
    }));

    mockHistory.push(`${AppRoute.Offer}/${mockOffer.id}`);

    render(withStoreComponent);

    expect(screen.getByTestId('preloaderEl')).toBeInTheDocument();
  });

  it('should render "FavoritesPage" when user navigate to "/favorites" and id authorized', () => {
    const initialMockState: Partial<AppState> = {
      [NameSpace.User]: { authStatus: AuthStatus.Auth, userData: makeMockUserData() },
      [NameSpace.Data]: { favoritesIds: [1, 25], offersList: [makeMockOffer(1), makeMockOffer(2), makeMockOffer(25)] },
    };
    const { withStoreComponent } = withMockStore(preparedComponent, initialMockState);

    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByTestId('favoritesPageEl')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const initialMockState: Partial<AppState> = {
      [NameSpace.User]: { authStatus: AuthStatus.NoAuth, userData: null },
    };
    const { withStoreComponent } = withMockStore(preparedComponent, initialMockState);
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('Error 404')).toBeInTheDocument();
  });
});
