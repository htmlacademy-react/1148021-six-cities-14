import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';

export const PrivateRoute: React.FC<PropsWithChildren<object>> = ({ children }) => {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  return authStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login} />;
};
