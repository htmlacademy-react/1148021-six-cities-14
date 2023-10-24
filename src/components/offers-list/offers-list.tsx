import React, { useState } from 'react';
import PlaceCard, { TPlaceCard } from '../place-card/place-card';

type TOffersListProps = {
  offers: Array<TPlaceCard>;
  city: string;
};

export default function OffersList({
  offers,
  city,
}: TOffersListProps): React.ReactNode {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const onCardHover = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const cardEl: HTMLElement | null = (event.target as HTMLElement).closest(
      '[data-card-id]'
    );

    if (!cardEl) {
      return;
    }

    if (cardEl.dataset.cardId && activeCardId !== +cardEl.dataset.cardId) {
      setActiveCardId(+cardEl.dataset.cardId);
    }
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
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
        {/* prettier-ignore */}
        <div className="cities__places-list places__list tabs__content" onMouseOver={(event) => onCardHover(event)}>
          {offers.map((offer) => <PlaceCard key={offer.id} card={offer} section={'cities'}/>)}
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map" />
      </div>
    </div>
  );
}
