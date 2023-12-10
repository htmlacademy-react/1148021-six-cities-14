import { render, screen } from '@testing-library/react';
import { AppRoute, AuthStatus, NameSpace } from '../../const';
import { MemoryHistory, createMemoryHistory } from 'history';
import { withMockHistory, withMockStore } from '../../utils/mock-components';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../private-route/private-route';
import { makeMockState } from '../../utils/mocks';
import { AppState } from '../../store/store.types';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    mockHistory.push(AppRoute.Favorites);
  });

  it('Should render "Login page" when user is trying to acces Favorites', () => {
    const expectedText = 'Login page';
    const notExpectedText = 'Favorites page';
    const initialMockStore: Partial<AppState> = makeMockState({
      [NameSpace.User]: {
        authStatus: AuthStatus.NoAuth,
        userData: null,
      },
    });
    const preparedComponent = withMockHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <span>{notExpectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withMockStore(preparedComponent, initialMockStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('Should render "Favorites page" when user is logged in and is trying to acces Favorites', () => {
    const expectedText = 'Favorites page';
    const notExpectedChildren = 'Not expected text';
    const initialMockStore: Partial<AppState> = makeMockState({
      [NameSpace.User]: {
        authStatus: AuthStatus.Auth,
        userData: null,
      },
    });
    const preparedComponent = withMockHistory(
      <Routes>
        <Route path={AppRoute.Login} element={<span>{notExpectedChildren}</span>} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <span>{expectedText}</span>
            </PrivateRoute>
          }
        />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withMockStore(preparedComponent, initialMockStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedChildren)).not.toBeInTheDocument();
  });
});
