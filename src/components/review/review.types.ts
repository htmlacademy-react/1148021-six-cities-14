export type TReview = {
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
