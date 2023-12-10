import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import StarsRating from '../stars-rating/stars-rating';
import BookmarkBtn from '../bookmark-btn/bookmark-btn';
import { TPlaceCard } from './place-card.types';
import { capitalizeFirst } from '../../utils/utils';

type TPlaceCardProps = {
  card: TPlaceCard;
  section: 'cities' | 'favorites';
  onCardHover?: (id: TPlaceCard['id'] | null) => void;
  onCardDelete?: (id: TPlaceCard['id']) => void;
};

export default function PlaceCard({ card, section, onCardHover, onCardDelete }: TPlaceCardProps): React.ReactNode {
  const sizes: { [key in typeof section]: { width: number; height: number } } = {
    favorites: { width: 150, height: 110 },
    cities: { width: 260, height: 200 },
  };

  const handleMouseEnter = () => {
    onCardHover?.(card.id);
  };

  const handleMouseLeave = () => {
    onCardHover?.(null);
  };

  const handleBookmarkDelete = () => {
    onCardDelete?.(card.id);
  };

  return (
    <article
      className={classNames(`${section}__card`, 'place-card')}
      data-card-id={card.id}
      onMouseEnter={onCardHover && handleMouseEnter}
      onMouseLeave={onCardHover && handleMouseLeave}
      data-testid="placeCardEl"
    >
      {card.isPremium && (
        <div className="place-card__mark" data-testid="placeCardPremiumEl">
          <span>Premium</span>
        </div>
      )}
      {card.previewImage && (
        <div
          className={classNames(`${section}__image-wrapper`, 'place-card__image-wrapper')}
          data-testid="placeCardImageEl"
        >
          <Link to={`${AppRoute.Offer}/${card.id}`}>
            <img className="place-card__image" src={card.previewImage} {...sizes[section]} alt="Place image" />
          </Link>
        </div>
      )}
      <div className={classNames(`${section}__card-info`, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{card.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkBtn offerId={card.id} onBookmarkDelete={onCardDelete && handleBookmarkDelete} />
        </div>
        <StarsRating rating={card.rating} cssPrefix="place-card" />
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${card.id}`}>{card.title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirst(card.type)}</p>
      </div>
    </article>
  );
}
