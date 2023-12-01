import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { rootReducer } from '../root-reducer';
import { NameSpace } from '../../const';

type Reducer = ReturnType<typeof rootReducer>;

export const RedirectToRouteActionType = `${NameSpace.User}/redirectToRoute`;

export const redirect: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (action.type === RedirectToRouteActionType) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
