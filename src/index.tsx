import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { store } from './store/store';
import { checkAuthAction } from './store/api-actions';
import { Provider } from 'react-redux';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
