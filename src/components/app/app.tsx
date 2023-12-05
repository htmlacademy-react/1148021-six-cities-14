import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import { AppRoute, DEFAULT_CITY } from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { PrivateRoute } from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import browserHistory from '../../browser-history';
import HistoryRouter from '../history-route/history-route';
import Notification from '../notification/notification';
import Layout from '../layout/layout';
import LoginWithAuthCheckPage from '../../pages/login-page/login-page';
import './app.css';

export default function App(): React.ReactNode {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Notification />
        <HistoryRouter history={browserHistory}>
          <Routes>
            <Route path={AppRoute.Main} element={<Layout />}>
              <Route index element={<Navigate to={`/${DEFAULT_CITY}`} />} />
              <Route path={`${AppRoute.Main}/:city?`} element={<MainPage />} />
              <Route path={AppRoute.Login} element={<LoginWithAuthCheckPage />} />
              <Route path={`${AppRoute.Offer}/:id`} element={<OfferPage />} />
              <Route
                path={AppRoute.Favorites}
                element={
                  <PrivateRoute>
                    <FavoritesPage />
                  </PrivateRoute>
                }
              />
              <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </HistoryRouter>
      </HelmetProvider>
    </Provider>
  );
}
