import classNames from 'classnames';

type TLogoLinkProps = {
  isActive?: boolean;
};

export default function LogoLink({
  isActive = false,
}: TLogoLinkProps): React.ReactNode {
  return (
    <a
      className={classNames('header__logo-link', {
        'header__logo-link--active': isActive,
      })}
      href={!isActive ? '/' : undefined}
    >
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={81}
        height={41}
      />
    </a>
  );
}
