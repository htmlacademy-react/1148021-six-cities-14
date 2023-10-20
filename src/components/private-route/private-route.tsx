import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';

export const PrivateRoute: React.FC<
  PropsWithChildren<{ authStatus: AuthStatus }>
> = ({ authStatus, children }) =>
  authStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login} />;
