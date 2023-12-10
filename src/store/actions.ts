import { createAction } from '@reduxjs/toolkit';
import { APIAction, AppRoute } from '../const';

export const redirectToRouteAction = createAction<AppRoute>(APIAction.RedirectToRoute);
