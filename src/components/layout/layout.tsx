import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthCheckedStatus, getIsAuthorized } from '../../store/user/user.selectors';
import Preloader from '../preloader/preloader';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';

function Layout() {
  const isCheckedAuth = useAppSelector(getAuthCheckedStatus);
  const isAuthorized = useAppSelector(getIsAuthorized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, isAuthorized]);

  return isCheckedAuth ? <Outlet /> : <Preloader />;
}

export default Layout;
