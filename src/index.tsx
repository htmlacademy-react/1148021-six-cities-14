import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { favorites } from './mocks/favorites';
import { store } from './store';
import { checkAuthAction } from './store/api-actions';

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App favorites={favorites} />
  </React.StrictMode>
);
