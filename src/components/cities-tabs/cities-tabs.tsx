import React from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { Link, useSearchParams } from 'react-router-dom';
import { APP_CITIES, SORT_BY_SEARCH_PARAM_NAME } from '../../const';
import { getCity } from '../../store/cities/cities.selectors';

export default function CitiesTabs(): React.ReactNode {
  const activeCity = useAppSelector(getCity);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get(SORT_BY_SEARCH_PARAM_NAME);

  const getLinkClasses = (city: typeof activeCity) =>
    classNames('locations__item-link', 'tabs__item', {
      'tabs__item--active': activeCity === city,
    });

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {APP_CITIES.map((city) => (
            <li className="locations__item" key={city}>
              {activeCity === city ? (
                <a className={getLinkClasses(city)}>
                  <span>{city}</span>
                </a>
              ) : (
                <Link className={getLinkClasses(city)} to={`/${city}?${SORT_BY_SEARCH_PARAM_NAME}=${sortBy}`}>
                  <span>{city}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
