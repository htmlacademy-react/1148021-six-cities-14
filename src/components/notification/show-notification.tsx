import ReactDOM from 'react-dom';
import { Notification } from './notification';
import { TIMEOUT_SHOW_ERROR } from '../../const';

export const showNotification = (error: string) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  ReactDOM.render(<Notification error={error} />, container);

  setTimeout(() => {
    document.body.removeChild(container);
  }, TIMEOUT_SHOW_ERROR);
};
