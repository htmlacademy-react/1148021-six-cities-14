import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import PlaceCard, { TPlaceCard } from '../../components/place-card/place-card';
import { AppTitle } from '../../const';

type FavoritesPageProps = {
  favorites: Array<TPlaceCard>;
};

export default function FavoritesPage({ favorites }: FavoritesPageProps): React.ReactNode {
  const offersByCity: { [key: string]: Array<TPlaceCard> } = {};

  for (const offer of favorites) {
    if (offersByCity[offer.city.name]) {
      offersByCity[offer.city.name].push(offer);
    } else {
      offersByCity[offer.city.name] = [offer];
    }
  }

  return (
    <div className="page">
      <Helmet>
        <title>{AppTitle} - Favorites</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(offersByCity).map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {offersByCity[city].map((offer) => (
                      <PlaceCard key={offer.id} card={offer} section={'favorites'} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
