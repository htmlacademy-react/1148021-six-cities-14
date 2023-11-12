import React from 'react';
import { CityName } from '../place-card/place-card';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';

type CitiesTabsProps = {
  cities: Array<CityName>;
  onCityTabClick: (city: CityName) => void;
};

export default function CitiesTabs({ cities, onCityTabClick }: CitiesTabsProps): React.ReactNode {
  const activeCity = useAppSelector((state) => state.city);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li className="locations__item" key={city}>
              <a
                className={classNames('locations__item-link', 'tabs__item', {
                  'tabs__item--active': activeCity === city,
                })}
                href="#"
                onClick={() => onCityTabClick(city)}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
