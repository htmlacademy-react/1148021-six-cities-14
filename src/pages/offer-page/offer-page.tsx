import { Header } from '../../components/header/header';
import PlaceCard, { TPlaceCard } from '../../components/place-card/place-card';
import Review from '../../components/review/review';
import classNames from 'classnames';
import { Helmet } from 'react-helmet-async';
import { AppTitle } from '../../const';
import YourReviewForm from '../../components/your-review-form/your-review-form';
import { offers } from '../../mocks/offers';
import { reviews } from '../../mocks/reviews';
import StarsRating from '../../components/stars-rating/stars-rating';

export default function OfferPage(): React.ReactNode {
  const images = [
    'img/room.jpg',
    'img/apartment-01.jpg',
    'img/apartment-02.jpg',
    'img/apartment-03.jpg',
    'img/studio-01.jpg',
    'img/apartment-01.jpg',
  ];

  const goods = [
    'Wi-Fi',
    'Washing machine',
    'Towels',
    'Heating',
    'Coffee machine',
    'Baby seat',
  ];

  const otherPlaceCards: Array<TPlaceCard> = offers.slice(0, 3);

  const {
    isPremium,
    rating,
    price,
    isFavorite,
    bedrooms,
    type,
    maxAdults,
    title,
    host,
    description,
  } = offers[0];

  //const { id } = useParams(); // todo

  return (
    <div className="page">
      <Helmet>
        <title>{AppTitle} - PlaceCard</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button
                  className={classNames(
                    'offer__bookmark-button',
                    { 'offer__bookmark-button--active': isFavorite },
                    'button'
                  )}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {isFavorite ? 'In' : 'To'} bookmarks
                  </span>
                </button>
              </div>
              <StarsRating rating={rating} cssPrefix="offer" showValue />
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews ·{' '}
                  <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ul className="reviews__list">
                  {reviews.map((review) => (
                    <Review review={review} key={review.id} />
                  ))}
                </ul>
                <YourReviewForm />
              </section>
            </div>
          </div>
          <section className="offer__map map" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {otherPlaceCards.map((card) => (
                <PlaceCard key={card.id} card={card} section="cities" />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
