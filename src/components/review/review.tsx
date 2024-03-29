import { formatDateForReview } from '../../utils/utils';
import StarsRating from '../stars-rating/stars-rating';
import { TReview } from './review.types';

type TReviewProps = {
  review: TReview;
};

export default function Review({ review }: TReviewProps): React.ReactNode {
  return (
    <li className="reviews__item" data-testid="reviewEl">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <StarsRating rating={review.rating} cssPrefix="reviews" />
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {formatDateForReview(review.date)}
        </time>
      </div>
    </li>
  );
}
