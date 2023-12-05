import { ApartmentType, CityName } from '../../const';

export type TPlaceCard = {
  bedrooms: number;
  city: TCity;
  description: string;
  goods: string[];
  host: THost;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: TLocation;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: keyof typeof ApartmentType;
};

export type TCity = {
  location: TLocation;
  name: CityName;
};

type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type THost = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
};
