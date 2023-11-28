import React, { useEffect } from 'react';
import { Header } from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCity, updateCityOffers } from '../../store/actions';
import { Navigate, useParams } from 'react-router-dom';
import { AppCities, AppRoute, CityName } from '../../const';
import { fetchOffers } from '../../store/api-actions';
import Preloader from '../../components/preloader/preloader';

export default function MainPage(): React.ReactNode {
  const { city } = useParams();

  const activeCity = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offersList);
  const cityOffers = useAppSelector((state) => state.cityOffers);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, []);

  useEffect(() => {
    dispatch(updateCity(city as CityName));
    dispatch(updateCityOffers({ cityName: city as CityName, offers: allOffers || [] }));
  }, [dispatch, city, allOffers]);

  if (!AppCities.includes(city as CityName)) {
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
              {!allOffers ? (
                <Preloader />
              ) : (
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
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
