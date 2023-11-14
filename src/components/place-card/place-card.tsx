import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import StarsRating from '../stars-rating/stars-rating';

export type TPlaceCard = {
  bedrooms: number;
  city: TCity;
  description: string;
  goods: string[];
  host: THost;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: TLocation;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export type TCity = {
  location: TLocation;
  name: CityName;
};

export type CityName = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';

type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type THost = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

type TPlaceCardProps = {
  card: TPlaceCard;
  section: 'cities' | 'favorites';
  onCardHover?: (id: TPlaceCard['id'] | null) => void;
};

export default function PlaceCard({ card, section, onCardHover }: TPlaceCardProps): React.ReactNode {
  const handleMouseEnter = () => {
    onCardHover?.(card.id);
  };

  const handleMouseLeave = () => {
    onCardHover?.(null);
  };

  return (
    <article
      className={classNames(`${section}__card`, 'place-card')}
      data-card-id={card.id}
      onMouseEnter={onCardHover && handleMouseEnter}
      onMouseLeave={onCardHover && handleMouseLeave}
    >
      {card.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      {card.previewImage && (
        <div className={classNames(`${section}__image-wrapper`, 'place-card__image-wrapper')}>
          <Link to={`${AppRoute.Offer}/${card.id}`}>
            <img className="place-card__image" src={card.previewImage} width={260} height={200} alt="Place image" />
          </Link>
        </div>
      )}
      <div className={classNames(`${section}__card-info`, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{card.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={classNames(
              'place-card__bookmark-button',
              { 'place-card__bookmark-button--active': card.isFavorite },
              'button'
            )}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">{card.isFavorite ? 'In' : 'To'} bookmarks</span>
          </button>
        </div>
        <StarsRating rating={card.rating} cssPrefix="place-card" />
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${card.id}`}>{card.title}</Link>
        </h2>
        <p className="place-card__type">{card.type}</p>
      </div>
    </article>
  );
}
