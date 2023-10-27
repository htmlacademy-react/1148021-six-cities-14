import { TReview } from '../components/review/review';

export const reviews: Array<TReview> = [
  {
    id: 1,
    user: {
      id: 14,
      isPro: true,
      name: 'Corey',
      avatarUrl: 'https://14.react.pages.academy/static/avatar/5.jpg',
    },
    rating: 4,
    comment:
      'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
    date: '2023-09-09T09:23:20.316Z',
  },
  {
    id: 2,
    user: {
      id: 13,
      isPro: false,
      name: 'Zak',
      avatarUrl: 'https://14.react.pages.academy/static/avatar/4.jpg',
    },
    rating: 3,
    comment:
      'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!',
    date: '2023-09-09T09:23:20.316Z',
  },
];
