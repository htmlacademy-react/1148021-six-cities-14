import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { getIsAuthorized } from '../../store/user/user.selectors';

export const PrivateRoute: React.FC<PropsWithChildren<object>> = ({ children }) =>
  useAppSelector(getIsAuthorized) ? children : <Navigate to={AppRoute.Login} />;
