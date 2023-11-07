import React, { useEffect } from 'react';
import { TPlaceCard } from '../../components/place-card/place-card';
import { Header } from '../../components/header/header';
import classNames from 'classnames';
import OffersList from '../../components/offers-list/offers-list';

type MainPageProps = {
  offers: Array<TPlaceCard>;
};

export default function MainPage({ offers }: MainPageProps): React.ReactNode {
  const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

  const [cityOffers, setCityOffers] = React.useState<Array<TPlaceCard>>([]);
  const [activeCity, setActiveCity] = React.useState(cities[0]);

  useEffect(() => {
    setCityOffers(offers.filter((offer) => offer.city?.name === activeCity));
  }, [activeCity, offers]);

  // React.useEffect(() => {
  //   fetch('https://14.react.pages.academy/six-cities/offers', {
  //     method: 'GET',
  //   })
  //     .then((response) => response.json())
  //     .then((result: Array<TPlaceCard>) => {
  //       setAllOffers(result);
  //       setOffers(result);
  //     });
  // }, []);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index${cityOffers.length <= 0 ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {cities.map((city) => (
                <li className="locations__item" key={city}>
                  <a
                    className={classNames('locations__item-link', 'tabs__item', {
                      'tabs__item--active': activeCity === city,
                    })}
                    href="#"
                    onClick={() => setActiveCity(city)}
                  >
                    <span>{city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          {cityOffers.length > 0 ? (
            <OffersList offers={offers} city={activeCity} />
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
