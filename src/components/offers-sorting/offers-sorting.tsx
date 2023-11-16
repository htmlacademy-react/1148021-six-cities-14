import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortOptions } from './offers-sorting.types';

const offersSortOptions = Object.entries(SortOptions).map(([, option]) => ({ name: option, title: option }));
const offersSortDefaultOption = offersSortOptions[0].name;

type OffersSortingProps = {
  onSortChange: (name: string) => void;
};
export default function OffersSorting({ onSortChange }: OffersSortingProps): React.ReactNode {
  const sortParamName = 'sortBy';
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpened, setIsOpened] = useState(false);

  function handleClick() {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  }

  function handleChangeOption(option: typeof offersSortDefaultOption) {
    setSearchParams({ [sortParamName]: option });
  }

  useEffect(() => {
    const sortBy = searchParams.get(sortParamName) as SortOptions;
    if (!sortBy || !offersSortOptions.map((opt) => opt.name).includes(sortBy)) {
      setSearchParams({ [sortParamName]: offersSortDefaultOption });
    }
    if (sortBy) {
      onSortChange(sortBy);
    }
  }, [searchParams, setSearchParams]);

  return (
    <form className="places__sorting" action="#" method="get" onClick={() => handleClick()}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {offersSortOptions.find((opt) => opt.name === searchParams.get(sortParamName))?.title}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={classNames('places__options', 'places__options--custom', { 'places__options--opened': isOpened })}>
        {offersSortOptions.map((option) => (
          <li
            key={option.name}
            className={classNames('places__option', {
              'places__option--active': option.name === searchParams.get(sortParamName),
            })}
            tabIndex={0}
            onClick={() => handleChangeOption(option.name)}
          >
            {option.title}
          </li>
        ))}
      </ul>
    </form>
  );
}
