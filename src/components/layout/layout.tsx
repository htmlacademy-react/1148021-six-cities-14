import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getAuthCheckedStatus, getIsAuthorized } from '../../store/user/user.selectors';
import Preloader from '../preloader/preloader';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';
import './layout.css';

function Layout() {
  const isCheckedAuth = useAppSelector(getAuthCheckedStatus);
  const isAuthorized = useAppSelector(getIsAuthorized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthorized) {
      dispatch(fetchFavoritesAction());
    }
  }, [dispatch, isAuthorized]);

  return <div className="six-cities-layout">{isCheckedAuth ? <Outlet /> : <Preloader />}</div>;
}

export default Layout;
