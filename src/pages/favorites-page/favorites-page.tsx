import Footer from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import PlaceCard, { TPlaceCard } from '../../components/place-card/place-card';

export default function FavoritesPage(): React.ReactNode {
  const cities = ['Paris', 'Cologne'];

  const offers: Array<TPlaceCard> = [
    {
      city: {
        name: 'Dusseldorf',
        location: {
          latitude: 51.225402,
          longitude: 6.776314,
          zoom: 13,
        },
      },
      previewImage: 'https://14.react.pages.academy/static/offer/3.jpg',
      images: [
        'https://14.react.pages.academy/static/offer/16.jpg',
        'https://14.react.pages.academy/static/offer/13.jpg',
        'https://14.react.pages.academy/static/offer/6.jpg',
        'https://14.react.pages.academy/static/offer/11.jpg',
        'https://14.react.pages.academy/static/offer/14.jpg',
        'https://14.react.pages.academy/static/offer/9.jpg',
        'https://14.react.pages.academy/static/offer/2.jpg',
        'https://14.react.pages.academy/static/offer/15.jpg',
        'https://14.react.pages.academy/static/offer/7.jpg',
        'https://14.react.pages.academy/static/offer/17.jpg',
        'https://14.react.pages.academy/static/offer/4.jpg',
        'https://14.react.pages.academy/static/offer/8.jpg',
        'https://14.react.pages.academy/static/offer/10.jpg',
        'https://14.react.pages.academy/static/offer/5.jpg',
      ],
      title: 'Waterfront with extraordinary view',
      isFavorite: false,
      isPremium: false,
      rating: 4.8,
      type: 'room',
      bedrooms: 1,
      maxAdults: 2,
      price: 142,
      goods: ['Laptop friendly workspace', 'Breakfast'],
      host: {
        id: 25,
        name: 'Angelina',
        isPro: true,
        avatarUrl: 'img/avatar-angelina.jpg',
      },
      description:
        'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
      location: {
        latitude: 51.237402,
        longitude: 6.779314,
        zoom: 16,
      },
      id: 1,
    },
  ];

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {cities.map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  {/* prettier-ignore */}
                  <div className="favorites__places">
                    {!offers
                      ? null
                      : offers.map((offer) => (<PlaceCard key={offer.id} card={offer} section={'favorites'} />))}
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
