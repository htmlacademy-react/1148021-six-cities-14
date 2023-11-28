import React from 'react';
import { useAppSelector } from '../../hooks';
import './notification.css';

export default function Notification(): React.ReactNode {
  const error = useAppSelector((state) => state.error);
  return error && <div className="cities-notification">{error}</div>;
}
