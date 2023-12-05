import React, { useEffect } from 'react';
import { Header } from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { APP_CITIES, AppRoute, CityName, SORT_BY_SEARCH_PARAM_NAME } from '../../const';
import { fetchOffersAction } from '../../store/api-actions';
import Preloader from '../../components/preloader/preloader';
import { getOffers } from '../../store/data/data.selectors';
import { updateCity, updateCityOffers } from '../../store/cities/cities.slice';
import { getCity, getCityOffers } from '../../store/cities/cities.selectors';
import { SortOptions } from '../../components/offers-sorting/offers-sorting.types';

function EmptyOffersBlock({ activeCity }: { activeCity: CityName | null }): React.ReactNode {
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
  const { city } = useParams();
  const [searchParams] = useSearchParams();
  const sortBy = (searchParams.get(SORT_BY_SEARCH_PARAM_NAME) as SortOptions) || SortOptions.Popular;

  const activeCity = useAppSelector(getCity);
  const allOffers = useAppSelector(getOffers);
  const cityOffers = useAppSelector(getCityOffers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateCity(city as CityName));
    dispatch(updateCityOffers({ cityName: city as CityName, offers: allOffers || [], option: sortBy }));
  }, [dispatch, city, allOffers, sortBy]);

  if (!APP_CITIES.includes(city as CityName)) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index${cityOffers.length <= 0 ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesTabs />

        <div className="cities">
          {cityOffers.length > 0 ? (
            <OffersList offers={cityOffers} city={activeCity as CityName} />
          ) : (
            <div className="cities__places-container cities__places-container--empty container">
              {!allOffers ? <Preloader /> : <EmptyOffersBlock activeCity={activeCity} />}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
