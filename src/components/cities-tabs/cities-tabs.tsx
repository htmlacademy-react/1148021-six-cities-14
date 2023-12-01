import React from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { Link, useSearchParams } from 'react-router-dom';
import { AppCities, sortBySearchParamName } from '../../const';
import { getCity } from '../../store/cities/cities.selectors';

export default function CitiesTabs(): React.ReactNode {
  const activeCity = useAppSelector(getCity);
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get(sortBySearchParamName);

  const getLinkClasses = (city: typeof activeCity) =>
    classNames('locations__item-link', 'tabs__item', {
      'tabs__item--active': activeCity === city,
    });

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {AppCities.map((city) => (
            <li className="locations__item" key={city}>
              {activeCity === city ? (
                <a className={getLinkClasses(city)}>
                  <span>{city}</span>
                </a>
              ) : (
                <Link className={getLinkClasses(city)} to={`/${city}?${sortBySearchParamName}=${sortBy}`}>
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
