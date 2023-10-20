import { Link } from 'react-router-dom';
import './not-found-page.css';
import { AppRoute } from '../../const';

export default function NotFoundPage(): React.ReactNode {
  return (
    <main className="page-404">
      <div className="fof">
        <h1>Error 404</h1>
        <p>
          <Link to={AppRoute.Main}>go home</Link>
        </p>
      </div>
    </main>
  );
}
