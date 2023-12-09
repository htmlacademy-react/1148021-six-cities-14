import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function LogoLink(): React.ReactNode {
  return (
    <>
      {/* prettier-ignore */}
      <NavLink
        className={({ isActive }) =>
          classNames('header__logo-link', {
            'header__logo-link--active': isActive,
          })}
        to={AppRoute.Main}
        data-testid="logoLinkEl"
      >
        <img
          className="header__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={81}
          height={41}
          data-testid="logoLinkImgEl"
        />
      </NavLink>
    </>
  );
}
