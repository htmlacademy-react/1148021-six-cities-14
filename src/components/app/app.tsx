import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { AppRoute, DefaultCity } from '../../const';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { PrivateRoute } from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { TPlaceCard } from '../place-card/place-card';
import { Provider } from 'react-redux';
import { store } from '../../store';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import Notification from '../notification/notification';

type AppProps = {
  favorites: Array<TPlaceCard>;
};

export default function App({ favorites }: AppProps): React.ReactNode {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Notification />
        <HistoryRouter history={browserHistory}>
          <Routes>
            <Route path={AppRoute.Main} element={<Navigate to={`/${DefaultCity}`} />} />
            <Route path={`${AppRoute.Main}/:city?`} element={<MainPage />} />
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <FavoritesPage favorites={favorites} />
                </PrivateRoute>
              }
            />
            <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HistoryRouter>
      </HelmetProvider>
    </Provider>
  );
}
