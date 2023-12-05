import { Link } from 'react-router-dom';
import './not-found-page.css';
import { AppRoute } from '../../const';
import { Header } from '../../components/header/header';

export default function NotFoundPage(): React.ReactNode {
  return (
    <div className="page page--gray">
      <Header />
      <main className="cix-cities-empty-page page__404">
        <div className="fof">
          <h1>Error 404</h1>
          <p>
            <Link to={AppRoute.Main}>go home</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
