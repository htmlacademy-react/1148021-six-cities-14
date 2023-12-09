import { Fragment, useEffect, useState } from 'react';
import { api } from '../../store/store';
import { TReview } from '../review/review.types';
import { TPlaceCard } from '../place-card/place-card.types';
import Preloader from '../preloader/preloader';
import { APIRoute, ReviewTextLength, STARS } from '../../const';

type YourReviewFormProps = {
  offerId: TPlaceCard['id'];
  onSubmitSuccess: (reviews: Array<TReview>) => void;
};

export default function YourReviewForm({ offerId, onSubmitSuccess }: YourReviewFormProps): React.ReactNode {
  const initialFormData = { rating: 0, review: '' };
  const [formData, setFormData] = useState<typeof initialFormData>(initialFormData);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormPending, setIsFormPending] = useState(false);

  const handleCommentFieldChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingFieldChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: +value });
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (event) => {
    event.preventDefault();
    const requestData = { comment: formData.review, rating: formData.rating };
    setIsFormPending(true);
    api
      .post<Array<TReview>>(`${APIRoute.Comments}/${offerId}`, requestData)
      .then(({ data }) => {
        setFormData(initialFormData);
        onSubmitSuccess(data);
      })
      .finally(() => setIsFormPending(false));
  };

  useEffect(() => {
    const reviewLength = formData.review.length as ReviewTextLength;

    setIsFormValid(
      Object.values(formData).reduce((prev, curr) => prev && !!curr, true) &&
        reviewLength >= ReviewTextLength.Min &&
        reviewLength <= ReviewTextLength.Max
    );
  }, [formData]);

  if (isFormPending) {
    return <Preloader />;
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {STARS.map(({ count, title }) => (
          <Fragment key={count}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              id={`${count}-stars`}
              type="radio"
              value={count}
              checked={count === formData.rating}
              onChange={handleRatingFieldChange}
            />
            <label htmlFor={`${count}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleCommentFieldChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">{ReviewTextLength.Min} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </div>
    </form>
  );
}
