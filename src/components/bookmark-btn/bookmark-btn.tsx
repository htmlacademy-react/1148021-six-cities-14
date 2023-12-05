import classNames from 'classnames';
import { api } from '../../store/store';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { incrementFavoritesCount } from '../../store/data/data.slice';
import { getCityOffers } from '../../store/cities/cities.selectors';
import { updateCityOffers } from '../../store/cities/cities.slice';
import { redirectToRouteAction } from '../../store/actions';
import { APIRoute, AppRoute } from '../../const';
import { TPlaceCard } from '../place-card/place-card.types';
import { getIsAuthorized } from '../../store/user/user.selectors';

type BookmarkBtnProps = {
  offerId: TPlaceCard['id'];
  isFavorite: TPlaceCard['isFavorite'];
  section?: 'offer' | 'place-card';
  size?: 'small' | 'big';
  onBookmarkDelete?: () => void;
};

export default function BookmarkBtn({
  offerId,
  isFavorite,
  section = 'place-card',
  size = 'small',
  onBookmarkDelete,
}: BookmarkBtnProps): React.ReactNode {
  const [isFav, setIsFav] = useState<boolean>(isFavorite);
  const cityOffers = useAppSelector(getCityOffers);
  const isAuthorized = useAppSelector(getIsAuthorized);
  const dispatch = useAppDispatch();

  const sizes: { [key in typeof size]: { width: number; height: number } } = {
    small: { width: 18, height: 31 },
    big: { width: 31, height: 33 },
  };

  useEffect(() => {
    if (isFav !== isFavorite) {
      setIsFav(isFavorite);
    }
  }, [isFavorite, isAuthorized]);

  useEffect(() => {
    if (!isAuthorized) {
      setIsFav(false);

      if (onBookmarkDelete) {
        onBookmarkDelete();
      }
    }
  }, [isAuthorized]);

  function handleClick() {
    if (!isAuthorized) {
      dispatch(redirectToRouteAction(AppRoute.Login));
    }

    const newStatus = !isFav;
    api
      .post<TPlaceCard>(`${APIRoute.Favorite}/${offerId}/${Number(newStatus)}`)
      .then(({ data }) => {
        setIsFav(data.isFavorite);

        if (!data.isFavorite && onBookmarkDelete) {
          onBookmarkDelete();
        }

        dispatch(incrementFavoritesCount(data.isFavorite ? 1 : -1));
        const newCityOffers = cityOffers.map((offer) =>
          offer.id === offerId ? { ...offer, isFavorite: data.isFavorite } : offer
        );
        dispatch(updateCityOffers({ offers: newCityOffers }));
      })
      .catch(() => dispatch(redirectToRouteAction(AppRoute.Login)));
  }

  return (
    <button
      className={classNames(
        `${section}__bookmark-button`,
        { [`${section}__bookmark-button--active`]: isFav },
        'button'
      )}
      type="button"
      onClick={handleClick}
    >
      <svg className={`${section}__bookmark-icon`} {...sizes[size]}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{isFav ? 'In' : 'To'} bookmarks</span>
    </button>
  );
}
