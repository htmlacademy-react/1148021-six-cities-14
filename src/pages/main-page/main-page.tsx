import React, { useEffect } from 'react';
import { Header } from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { APP_CITIES, AppRoute, CityName, DEFAULT_CITY, SORT_BY_SEARCH_PARAM_NAME } from '../../const';
import { fetchOffersAction } from '../../store/api-actions';
import Preloader from '../../components/preloader/preloader';
import { selectOffersByCityAndSort } from '../../store/cities/cities.selectors';
import { SortOptions } from '../../components/offers-sorting/offers-sorting.types';
import classNames from 'classnames';

function EmptyOffersBlock({ activeCity }: { activeCity: CityName }): React.ReactNode {
  return (
    <>
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">
            We could not find any property available at the moment in {activeCity}
          </p>
        </div>
      </section>
      <div className="cities__right-section" />
    </>
  );
}

export default function MainPage(): React.ReactNode {
  const navigate = useNavigate();

  const activeCity = useParams().city as CityName;

  const [searchParams] = useSearchParams();
  const sortBy = (searchParams.get(SORT_BY_SEARCH_PARAM_NAME) as SortOptions) || SortOptions.Popular;

  const cityOffers = useAppSelector((state) => selectOffersByCityAndSort(state, activeCity, sortBy));
  const hasOffersInCity = cityOffers && cityOffers?.length > 0;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!activeCity) {
      navigate(`/${DEFAULT_CITY}?${SORT_BY_SEARCH_PARAM_NAME}=${SortOptions.Popular}`);
    }
  }, [activeCity, navigate]);

  useEffect(() => {
    if (!cityOffers) {
      dispatch(fetchOffersAction());
    }
  }, [dispatch]);

  if (activeCity && !APP_CITIES.includes(activeCity)) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={classNames('page__main', 'page__main--index', { 'page__main--index-empty': !hasOffersInCity })}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs />

        <div className="cities">
          {hasOffersInCity ? (
            <OffersList offers={cityOffers} city={activeCity} />
          ) : (
            <div className="cities__places-container cities__places-container--empty container">
              {!cityOffers ? <Preloader /> : <EmptyOffersBlock activeCity={activeCity} />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
