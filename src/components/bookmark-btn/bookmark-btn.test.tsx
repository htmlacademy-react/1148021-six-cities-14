import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeMockOffer, makeMockUserData } from '../../utils/mocks';
import { withMockHistory, withMockStore } from '../../utils/mock-components';
import BookmarkBtn from './bookmark-btn';
import { AppState } from '../../store/store.types';
import { AppRoute, AuthStatus, NameSpace } from '../../const';
import { createMemoryHistory } from 'history';
import browserHistory from '../../browser-history';
import { api } from '../../store/store';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Component: BookmarkBtn', () => {
  let component: JSX.Element;
  const user = userEvent.setup();
  const handleBookmarkDelete = vi.fn();

  beforeAll(() => {
    const mockHistory = createMemoryHistory();

    const offerId = 34;
    component = withMockHistory(
      <BookmarkBtn offerId={offerId} section="offer" size="big" onBookmarkDelete={handleBookmarkDelete} />,
      mockHistory
    );
  });

  beforeEach(() => {
    browserHistory.push(AppRoute.Offer);
  });

  it('Should render correct if user is not authorized', async () => {
    const initialState: Partial<AppState> = {
      [NameSpace.User]: { authStatus: AuthStatus.NoAuth, userData: null },
    };

    const { withStoreComponent } = withMockStore(component, initialState);

    render(withStoreComponent);

    const bookmarkEl = screen.getByTestId('bookmarkEl');
    expect(bookmarkEl).toBeInTheDocument();

    await user.click(bookmarkEl);

    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
    expect(handleBookmarkDelete).toBeCalledTimes(0);
  });

  it('Should render correct if user is authorized', async () => {
    const offerId = 67;
    const initialState: Partial<AppState> = {
      [NameSpace.User]: { authStatus: AuthStatus.Auth, userData: makeMockUserData() },
      [NameSpace.Data]: { favoritesIds: [offerId], offersList: [makeMockOffer(offerId)] },
    };

    const { withStoreComponent } = withMockStore(component, initialState);

    browserHistory.push(AppRoute.Offer);

    render(withStoreComponent);

    const bookmarkEl = screen.getByTestId('bookmarkEl');
    expect(bookmarkEl).toBeInTheDocument();

    vi.spyOn(api, 'post').mockResolvedValue({ data: { isFavorite: false } });

    await user.click(bookmarkEl);

    expect(browserHistory.location.pathname).toBe(AppRoute.Offer);
    expect(handleBookmarkDelete).toBeCalledTimes(1);
  });
});
