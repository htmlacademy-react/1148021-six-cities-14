import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function Footer(): React.ReactNode {
  return (
    <footer className="footer container" data-testid="footerElem">
      <Link className="footer__logo-link" to={AppRoute.Main}>
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={64}
          height={33}
          data-testid="footerImgElem"
        />
      </Link>
    </footer>
  );
}
