import React from 'react';
import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { APP_CITIES, SORT_BY_SEARCH_PARAM_NAME } from '../../const';
import { SortOptions } from '../offers-sorting/offers-sorting.types';

export default function CitiesTabs(): React.ReactNode {
  const { city: activeCity } = useParams();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get(SORT_BY_SEARCH_PARAM_NAME) || SortOptions.Popular;

  const getLinkClasses = (city: typeof activeCity) =>
    classNames('locations__item-link', 'tabs__item', {
      'tabs__item--active': activeCity === city,
    });

  return (
    <div className="tabs" data-testid="citiesTabsEl">
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
