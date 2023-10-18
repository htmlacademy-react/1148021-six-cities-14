type TReview = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: TUser;
};

type TUser = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};

type TReviewProps = {
  review: TReview;
};

export default function Review({ review }: TReviewProps): React.ReactNode {
  return (
    <li className="reviews__item">
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
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${(review.rating * 100) / 5}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={review.date}>
          {new Date(review.date).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long',
          })}
        </time>
      </div>
    </li>
  );
}
