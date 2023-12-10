import { Notification } from './notification';
import { TIMEOUT_SHOW_ERROR } from '../../const';
import { createRoot } from 'react-dom/client';

export const showNotification = (error: string) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(<Notification error={error} />);

  setTimeout(() => {
    document.body.removeChild(container);
  }, TIMEOUT_SHOW_ERROR);
};
