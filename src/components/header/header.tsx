import { NavLink } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LogoLink from '../logo-link/logo-link';
import { logoutAction } from '../../store/api-actions';
import { MouseEvent } from 'react';

export function Header(): React.ReactNode {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const userData = useAppSelector((state) => state.userData);

  const dispatch = useAppDispatch();

  const handleLogoutClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <LogoLink />
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <NavLink className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                  <div
                    className="header__avatar-wrapper user__avatar-wrapper"
                    style={{ backgroundImage: `url(${userData?.avatarUrl})` }}
                  >
                    {/* prettier-ignore */}
                  </div>
                  {authStatus === AuthStatus.Auth ? (
                    <>
                      <span className="header__user-name user__name">{userData?.name}</span>
                      <span className="header__favorite-count">3</span>
                    </>
                  ) : (
                    <span className="header__login">Sign in</span>
                  )}
                </NavLink>
              </li>

              {authStatus === AuthStatus.Auth && (
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#" onClick={handleLogoutClick}>
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
