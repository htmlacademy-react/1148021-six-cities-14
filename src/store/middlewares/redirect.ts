import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { reducer } from '../reducer';

type Reducer = ReturnType<typeof reducer>;

export const RedirectToRouteActionType = 'cities/redirectToRoute';

export const redirect: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (action.type === RedirectToRouteActionType) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
