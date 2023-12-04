import { TPlaceCard } from '../components/place-card/place-card.types';
import { CityName } from '../const';
import { AuthData, UserData } from '../store/store.types';

export const makeMockOffer = (): TPlaceCard => ({
  city: {
    name: CityName.Amsterdam,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  previewImage: 'https://14.react.pages.academy/static/offer/13.jpg',
  images: [
    'https://14.react.pages.academy/static/offer/11.jpg',
    'https://14.react.pages.academy/static/offer/2.jpg',
    'https://14.react.pages.academy/static/offer/15.jpg',
    'https://14.react.pages.academy/static/offer/9.jpg',
    'https://14.react.pages.academy/static/offer/14.jpg',
    'https://14.react.pages.academy/static/offer/1.jpg',
    'https://14.react.pages.academy/static/offer/4.jpg',
    'https://14.react.pages.academy/static/offer/3.jpg',
    'https://14.react.pages.academy/static/offer/5.jpg',
  ],
  title: 'Amazing and Extremely Central Flat',
  isFavorite: false,
  isPremium: true,
  rating: 3.7,
  type: 'hotel',
  bedrooms: 1,
  maxAdults: 10,
  price: 218,
  goods: ['Washer', 'Laptop friendly workspace', 'Breakfast'],
  host: {
    id: 25,
    name: 'Angelina',
    isPro: true,
    avatarUrl: 'img/avatar-angelina.jpg',
  },
  description:
    'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
  location: {
    latitude: 48.87861,
    longitude: 2.357499,
    zoom: 16,
  },
  id: 1,
});

export const makeMockOfferForCity = (cityName: CityName): TPlaceCard => {
  const offer = makeMockOffer();
  offer.city.name = cityName;
  return offer;
};

export const mockUserData = (): UserData => ({
  id: 1,
  email: 'test@yandex.ru',
  name: 'testName',
  avatarUrl: 'https://14.react.pages.academy/static/avatar/7.jpg',
  isPro: false,
  token: 'jhjyo7by7ybp97yp9ypb',
});

export const mockAuthData = (): AuthData => ({
  login: 'test',
  password: 'jhkv6ikhGgf',
});
