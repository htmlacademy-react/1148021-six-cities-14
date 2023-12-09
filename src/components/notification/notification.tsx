import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import './notification.css';
import { getError } from '../../store/cities/cities.selectors';

export default function Notification(): React.ReactNode {
  const error = useAppSelector(getError);
  return (
    error && (
      <div className="cities-notification" data-testid="notificationEl">
        {error}
      </div>
    )
  );
}
