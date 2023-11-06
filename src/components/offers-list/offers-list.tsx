import React, { useState } from 'react';
import PlaceCard, { TPlaceCard } from '../place-card/place-card';
import Map from '../map/map';

type TOffersListProps = {
  offers: Array<TPlaceCard>;
  city: string;
};

export default function OffersList({ offers, city }: TOffersListProps): React.ReactNode {
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
          {offers.length} places to stay in {city}
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
        {/* todo: replace mock city & points */}
        <Map
          city={{
            name: 'Amsterdam',
            location: {
              latitude: 52.37454,
              longitude: 4.897976,
              zoom: 13,
            },
          }}
          points={[
            [52.3909553943508, 4.85309666406198],
            [52.3609553943508, 4.85309666406198],
            [52.3909553943508, 4.929309666406198],
            [52.3809553943508, 4.939309666406198],
          ]}
          selectedPoint={[52.3909553943508, 4.85309666406198]}
        />
      </div>
    </div>
  );
}
