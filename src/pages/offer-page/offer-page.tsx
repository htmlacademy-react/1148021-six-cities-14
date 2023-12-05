import { Header } from '../../components/header/header';
import PlaceCard from '../../components/place-card/place-card';
import Review from '../../components/review/review';
import { Helmet } from 'react-helmet-async';
import { AppRoute, APP_TITLE, APIRoute } from '../../const';
import YourReviewForm from '../../components/your-review-form/your-review-form';
import StarsRating from '../../components/stars-rating/stars-rating';
import { Navigate, useParams } from 'react-router-dom';
import Map from '../../components/map/map';
import { ReactNode, useEffect, useState } from 'react';
import { api } from '../../store/store';
import Preloader from '../../components/preloader/preloader';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { redirectToRouteAction } from '../../store/actions';
import { getIsAuthorized } from '../../store/user/user.selectors';
import BookmarkBtn from '../../components/bookmark-btn/bookmark-btn';
import { TPlaceCard } from '../../components/place-card/place-card.types';
import { TReview } from '../../components/review/review.types';
import { TPoint } from '../../components/map/map.types';
import { processReviewsForOfferPage } from '../../utils/utils';

function OfferImages({ images }: { images: TPlaceCard['images'] }): ReactNode {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.slice(0, 6).map((image) => (
          <div className="offer__image-wrapper" key={image}>
            <img className="offer__image" src={image} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}

function OfferFeatures({ offer }: { offer: TPlaceCard }): ReactNode {
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">{offer.type}</li>
      <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
      <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
    </ul>
  );
}

function OfferPrice({ price }: { price: TPlaceCard['price'] }): ReactNode {
  return (
    <div className="offer__price">
      <b className="offer__price-value">€{price}</b>
      <span className="offer__price-text">&nbsp;night</span>
    </div>
  );
}

function OfferInside({ goods }: { goods: TPlaceCard['goods'] }): ReactNode {
  return (
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
  );
}

function OfferHost({
  host,
  description,
}: {
  host: TPlaceCard['host'];
  description: TPlaceCard['description'];
}): ReactNode {
  return (
    <div className="offer__host">
      <h2 className="offer__host-title">Meet the host</h2>
      <div className="offer__host-user user">
        <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
          <img className="offer__avatar user__avatar" src={host.avatarUrl} width={74} height={74} alt="Host avatar" />
        </div>
        <span className="offer__user-name">{host.name}</span>
        {host.isPro && <span className="offer__user-status">Pro</span>}
      </div>
      <div className="offer__description">
        <p className="offer__text">{description}</p>
      </div>
    </div>
  );
}

function OfferReviews({ offerId }: { offerId: TPlaceCard['id'] }): ReactNode {
  const isAuthorized = useAppSelector(getIsAuthorized);
  const [allReviews, setAllReviews] = useState<Array<TReview>>();

  const handleReviewSubmitSuccess = (reviews: Array<TReview>) => {
    setAllReviews(reviews);
  };

  useEffect(() => {
    api
      .get<Array<TReview>>(`${APIRoute.Comments}/${offerId}`)
      .then(({ data }) => setAllReviews(data))
      .catch(() => setAllReviews([]));
  }, [offerId]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · {allReviews?.length ? <span className="reviews__amount">{allReviews.length}</span> : 'No reviews yet'}
      </h2>
      {allReviews?.length ? (
        <ul className="reviews__list">
          {processReviewsForOfferPage(allReviews).map((review) => (
            <Review review={review} key={review.id} />
          ))}
        </ul>
      ) : null}
      {isAuthorized && <YourReviewForm offerId={offerId} onSubmitSuccess={handleReviewSubmitSuccess} />}
    </section>
  );
}

function OfferNearby({ offersNearby }: { offersNearby?: Array<TPlaceCard> }): ReactNode {
  if (!offersNearby) {
    return null;
  }

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offersNearby.map((card) => (
            <PlaceCard key={card.id} card={card} section="cities" />
          ))}
        </div>
      </section>
    </div>
  );
}

export default function OfferPage(): ReactNode {
  const [offer, setOffer] = useState<TPlaceCard>();

  const [offersNearby, setOffersNearby] = useState<Array<TPlaceCard>>();

  const { id } = useParams();

  const dispatch = useAppDispatch();

  const getCurPointForMap = (curOffer: TPlaceCard): TPoint => [curOffer.location.latitude, curOffer.location.longitude];

  const getPointsForMap = (offers: Array<TPlaceCard> | undefined, curOffer: TPlaceCard): Array<TPoint> => {
    if (!offers?.length) {
      return [getCurPointForMap(curOffer)];
    }

    return [
      ...offers.map((_offer) => [_offer.location.latitude, _offer.location.longitude] as TPoint),
      getCurPointForMap(curOffer),
    ];
  };

  useEffect(() => {
    api
      .get<TPlaceCard>(`${APIRoute.Offers}/${id}`)
      .then(({ data }) => setOffer(data))
      .catch(() => dispatch(redirectToRouteAction(AppRoute.NotFound)));
  }, [dispatch, id]);

  useEffect(() => {
    if (offer) {
      api
        .get<Array<TPlaceCard>>(`${APIRoute.Offers}/${id}/nearby`)
        .then(({ data }) => setOffersNearby(data))
        .catch(() => setOffersNearby([]));
    }
  }, [dispatch, offer, id]);

  if (!id) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>{APP_TITLE} - PlaceCard</title>
      </Helmet>

      <Header />

      {!offer ? (
        <div className="cix-cities-empty-page">
          <Preloader />
        </div>
      ) : (
        <main className="page__main page__main--offer">
          <section className="offer">
            <OfferImages images={offer.images} />

            <div className="offer__container container">
              <div className="offer__wrapper">
                {offer.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{offer.title}</h1>
                  <BookmarkBtn offerId={offer.id} isFavorite={offer.isFavorite} section="offer" size="big" />
                </div>
                <StarsRating rating={offer.rating} cssPrefix="offer" showValue />
                <OfferFeatures offer={offer} />
                <OfferPrice price={offer.price} />
                <OfferInside goods={offer.goods} />
                <OfferHost host={offer.host} description={offer.description} />
                <OfferReviews offerId={offer.id} />
              </div>
            </div>
            <Map
              section="offer"
              city={offer.city}
              points={getPointsForMap(offersNearby, offer)}
              selectedPoint={getCurPointForMap(offer)}
            />
          </section>
          <OfferNearby offersNearby={offersNearby} />
        </main>
      )}
    </div>
  );
}
