import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import PlaceCard from '../../components/place-card/place-card';
import { APP_TITLE } from '../../const';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Preloader from '../../components/preloader/preloader';
import { api } from '../../store';
import { Header } from '../../components/header/header';
import { TPlaceCard } from '../../components/place-card/place-card.types';
import { Link } from 'react-router-dom';

function FavoritesEmptyBlock(): React.ReactNode {
  return (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (empty)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Nothing yet saved.</b>
        <p className="favorites__status-description">
          Save properties to narrow down search or plan your future trips.
        </p>
      </div>
    </section>
  );
}

export default function FavoritesPage(): React.ReactNode {
  const [favs, setFavs] = useState<Array<TPlaceCard> | null>(null);
  const offersByCity: { [key: string]: Array<TPlaceCard> } = {};
  const isFavsEmpty = !favs?.length;

  if (favs) {
    for (const offer of favs) {
      if (offersByCity[offer.city.name]) {
        offersByCity[offer.city.name].push(offer);
      } else {
        offersByCity[offer.city.name] = [offer];
      }
    }
  }

  function handlePlaceCardDeleted(id: TPlaceCard['id']) {
    if (favs) {
      const newFavs = favs.filter((offer) => offer.id !== id);
      setFavs(newFavs);
    }
  }
  useEffect(() => {
    api
      .get<Array<TPlaceCard>>('/favorite')
      .then(({ data }) => setFavs(data))
      .catch(() => setFavs([]));
  }, []);

  return (
    <div className={classNames('page', { 'page--favorites-empty': isFavsEmpty })}>
      <Helmet>
        <title>{APP_TITLE} - Favorites</title>
      </Helmet>

      <Header />

      {favs === null ? (
        <Preloader />
      ) : (
        <main
          className={classNames('page__main', 'page__main--favorites', { 'page__main--favorites-empty': isFavsEmpty })}
        >
          <div className="page__favorites-container container">
            <section className={classNames('favorites', { 'favorites--empty': isFavsEmpty })}>
              {isFavsEmpty ? (
                <FavoritesEmptyBlock />
              ) : (
                <>
                  <h1 className="favorites__title">Saved listing</h1>
                  <ul className="favorites__list">
                    {Object.keys(offersByCity).map((city) => (
                      <li className="favorites__locations-items" key={city}>
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <Link className="locations__item-link" to={`/${city}`}>
                              <span>{city}</span>
                            </Link>
                          </div>
                        </div>
                        <div className="favorites__places">
                          {offersByCity[city].map((offer) => (
                            <PlaceCard
                              key={offer.id}
                              card={offer}
                              section={'favorites'}
                              onCardDelete={handlePlaceCardDeleted}
                            />
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
