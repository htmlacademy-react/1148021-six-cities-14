import React from 'react';

type StarsRatingProps = {
  rating: number;
  cssPrefix: 'reviews' | 'offer' | 'place-card';
  showValue?: boolean;
};

export default function StarsRating({ rating, cssPrefix, showValue = false }: StarsRatingProps): React.ReactNode {
  const rounedRating = Math.round(rating);
  return (
    <div className={`${cssPrefix}__rating rating`}>
      <div className={`${cssPrefix}__stars rating__stars`}>
        <span style={{ width: `${(rounedRating * 100) / 5}%` }} />
        <span className="visually-hidden">Rating</span>
      </div>
      {showValue && <span className="offer__rating-value rating__value">{rounedRating}</span>}
    </div>
  );
}
