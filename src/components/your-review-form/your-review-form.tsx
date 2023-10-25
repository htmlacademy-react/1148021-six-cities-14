import { Fragment, useEffect, useState } from 'react';

export default function YourReviewForm(): React.ReactNode {
  const stars = [
    { count: 5, title: 'perfect' },
    { count: 4, title: 'good' },
    { count: 3, title: 'not bad' },
    { count: 2, title: '' },
    { count: 1, title: '' },
  ] as const;
  const reviewMinLength = 50;

  const [formData, setFormData] = useState<{
    rating: number;
    review: string;
  }>({ rating: 0, review: '' });

  const [isFormValid, setIsFormValid] = useState(false);

  const onFormFieldChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitForm: React.FormEventHandler<HTMLFormElement> | undefined = (
    event
  ) => {
    event.preventDefault();
    //todo: send formData
  };

  useEffect(() => {
    setIsFormValid(
      Object.values(formData).reduce((prev, curr) => prev && !!curr, true) &&
        formData.review.length >= reviewMinLength
    );
  }, [formData]);

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onSubmitForm}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {stars.map(({ count, title }) => (
          <Fragment key={count}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              id={`${count}-stars`}
              type="radio"
              value={count}
              onChange={onFormFieldChange}
            />
            <label
              htmlFor={`${count}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
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
        onChange={onFormFieldChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">{reviewMinLength} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
