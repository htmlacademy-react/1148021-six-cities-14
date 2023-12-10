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

export const pluralize = (word: string, count: number) => (count > 1 ? `${word}s` : word);

export const getCountWithPluralizedWord = (word: string, count: number) => `${count} ${pluralize(word, count)}`;

export const formatDateForReview = (date: string) =>
  new Date(date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
  });

export const capitalizeFirst = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
