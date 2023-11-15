import React, { useEffect } from 'react';
import { Header } from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import CitiesTabs from '../../components/cities-tabs/cities-tabs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCity, updateOffersList } from '../../store/action';
import { Navigate, useParams } from 'react-router-dom';
import { TPlaceCard } from '../../components/place-card/place-card';
import { AppCities, CityName, DefaultCity } from '../../const';

type MainPageProps = {
  offers: Array<TPlaceCard>;
};

export default function MainPage({ offers }: MainPageProps): React.ReactNode {
  const { city } = useParams();

  const activeCity = useAppSelector((state) => state.city);
  const cityOffers = useAppSelector((state) => state.offersList);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateCity(city as CityName));
    dispatch(updateOffersList({ cityName: city as CityName, offers }));
  }, [dispatch, offers, city]);

  if (!AppCities.includes(city as CityName)) {
    return <Navigate to={`/${DefaultCity}`} />;
  }

  // React.useEffect(() => {
  //   fetch('https://14.react.pages.academy/six-cities/offers', {
  //     method: 'GET',
  //   })
  //     .then((response) => response.json())
  //     .then((result: Array<TPlaceCard>) => {
  //       //setAllOffers(result);
  //       //setOffers(result);
  //     });
  // }, []);

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
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">
                    We could not find any property available at the moment in {activeCity}
                  </p>
                </div>
              </section>
              <div className="cities__right-section" />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
