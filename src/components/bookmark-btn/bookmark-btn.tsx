import classNames from 'classnames';
import { TPlaceCard } from '../place-card/place-card';
import { api } from '../../store';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { incrementFavoritesCount } from '../../store/data/data.slice';
import { getCityOffers } from '../../store/cities/cities.selectors';
import { updateCityOffers } from '../../store/cities/cities.slice';
import { redirectToRouteAction } from '../../store/actions';
import { AppRoute } from '../../const';

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
  const [isFav, setIsFav] = useState(isFavorite);
  const cityOffers = useAppSelector(getCityOffers);
  const dispatch = useAppDispatch();

  const sizes = {
    small: { width: 18, height: 31 },
    big: { width: 31, height: 33 },
  };

  function handleClick() {
    const newStatus = !isFav;
    api
      .post<TPlaceCard>(`/favorite/${offerId}/${Number(newStatus)}`)
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
