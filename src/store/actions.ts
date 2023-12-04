import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import { RedirectToRouteActionType } from './middlewares/redirect';

export const redirectToRouteAction = createAction<AppRoute>(RedirectToRouteActionType);