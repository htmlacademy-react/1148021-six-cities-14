import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import LogoLink from '../logo-link/logo-link';
import { logoutAction } from '../../store/api-actions';
import { MouseEvent } from 'react';
import { getIsAuthorized, getUserData } from '../../store/user/user.selectors';
import { getFavoritesCount } from '../../store/data/data.selectors';

export function Header(): React.ReactNode {
  const isAuthorized = useAppSelector(getIsAuthorized);
  const favsCount = useAppSelector(getFavoritesCount);
  const userData = useAppSelector(getUserData);

  const dispatch = useAppDispatch();

  const handleLogoutClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header" data-testid="headerEl">
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
                  {isAuthorized ? (
                    <>
                      <span className="header__user-name user__name">{userData?.email}</span>
                      {favsCount ? (
                        <span className="header__favorite-count" data-testid="headerFavsCountEl">
                          {favsCount}
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <span className="header__login" data-testid="headerSignInEl">
                      Sign in
                    </span>
                  )}
                </NavLink>
              </li>

              {isAuthorized && (
                <li className="header__nav-item" data-testid="headerSignOutEl">
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
