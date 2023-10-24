import { useEffect, useState } from 'react';

export default function YourReviewForm(): React.ReactNode {
  const stars = [5, 4, 3, 2, 1] as const;

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

  const onSubmitForm: React.FormEventHandler<HTMLButtonElement> | undefined = (
    event
  ) => {
    event.preventDefault();
    //todo: send formData
  };

  useEffect(() => {
    setIsFormValid(
      Object.values(formData).reduce((prev, curr) => prev && !!curr, true)
    );
  }, [formData]);

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {stars.map((star) => (
          <input
            className="form__rating-input visually-hidden"
            key={`${star}star-input`}
            name="rating"
            id={`${star}-stars`}
            type="radio"
            value={star}
            onChange={onFormFieldChange}
          />
        ))}
        {stars.map((star) => (
          <label
            key={`${star}star-label`}
            htmlFor={`${star}-stars`}
            className="reviews__rating-label form__rating-label"
            title="perfect"
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
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
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid}
          onClick={onSubmitForm}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
