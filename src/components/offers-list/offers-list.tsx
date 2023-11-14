import React, { useState } from 'react';
import PlaceCard, { TPlaceCard } from '../place-card/place-card';
import Map from '../map/map';

type TOffersListProps = {
  offers: Array<TPlaceCard>;
  city: string;
};

export default function OffersList({ offers, city: cityName }: TOffersListProps): React.ReactNode {
  const city = offers[0].city;
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleCardHover = (id: TPlaceCard['id'] | null) => {
    setActiveCardId(id);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        activeCardId = {activeCardId}
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {cityName}
        </b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width={7} height={4}>
              <use xlinkHref="#icon-arrow-select" />
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>
              Popular
            </li>
            <li className="places__option" tabIndex={0}>
              Price: low to high
            </li>
            <li className="places__option" tabIndex={0}>
              Price: high to low
            </li>
            <li className="places__option" tabIndex={0}>
              Top rated first
            </li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offers.map((offer) => (
            <PlaceCard key={offer.id} card={offer} section={'cities'} onCardHover={handleCardHover} />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map
          style={{ height: '100%' }}
          city={city}
          points={offers.map(({ location }) => [location.latitude, location.longitude])}
          selectedPoint={(() => {
            const activeOffer = offers.find((offer) => offer.id === activeCardId);
            if (!activeOffer) {
              return undefined;
            }
            return [activeOffer.location.latitude, activeOffer.location.longitude];
          })()}
        />
      </div>
    </div>
  );
}
