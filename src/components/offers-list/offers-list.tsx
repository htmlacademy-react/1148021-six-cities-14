import React, { useState } from 'react';
import PlaceCard from '../place-card/place-card';
import Map from '../map/map';
import OffersSorting from '../offers-sorting/offers-sorting';
import { useAppDispatch } from '../../hooks';
import { updateCityOffers } from '../../store/cities/cities.slice';
import { SortOptions } from '../offers-sorting/offers-sorting.types';
import { CityName } from '../../const';
import { TPlaceCard } from '../place-card/place-card.types';

type TOffersListProps = {
  offers: Array<TPlaceCard>;
  city: string;
};

export default function OffersList({ offers, city: cityName }: TOffersListProps): React.ReactNode {
  const city = offers[0].city;
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleCardHover = (id: TPlaceCard['id'] | null) => {
    setActiveCardId(id);
  };

  const handleSortClick = (option: string) => {
    dispatch(updateCityOffers({ offers, cityName: cityName as CityName, option: option as SortOptions }));
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {cityName}
        </b>
        <OffersSorting onSortChange={handleSortClick} />
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
