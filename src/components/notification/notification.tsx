import React from 'react';
import './notification.css';

export function Notification({ error }: { error: string }): React.ReactNode {
  return (
    <div className="cities-notification" data-testid="notificationEl">
      {error}
    </div>
  );
}
