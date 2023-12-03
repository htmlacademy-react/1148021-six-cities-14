import { TReview } from '../components/review/review.types';
import { APP_CITIES } from '../const';

export const processReviewsForOfferPage = (reviews: Array<TReview> | null | undefined): Array<TReview> => {
  if (!reviews?.length) {
    return [];
  }

  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);
};

export const getRandomCity = () => {
  const min = 0;
  const max = APP_CITIES.length - 1;
  const randomCityIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  return APP_CITIES[randomCityIndex];
};
