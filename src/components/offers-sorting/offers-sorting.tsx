import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortOptions } from './offers-sorting.types';
import { SORT_BY_SEARCH_PARAM_NAME } from '../../const';

const offersSortOptions = Object.entries(SortOptions).map(([, option]) => ({ name: option, title: option }));
const offersSortDefaultOption = SortOptions.Popular;

type OffersSortingProps = {
  onSortChange: (name: string) => void;
};

export default function OffersSorting({ onSortChange }: OffersSortingProps): React.ReactNode {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpened, setIsOpened] = useState(false);
  const sortBy = searchParams.get(SORT_BY_SEARCH_PARAM_NAME) as SortOptions;

  function handleClick() {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  }

  function handleChangeOption(option: SortOptions) {
    setSearchParams({ [SORT_BY_SEARCH_PARAM_NAME]: option });
  }

  useEffect(() => {
    if (!sortBy || !offersSortOptions.map((opt) => opt.name).includes(sortBy)) {
      setSearchParams({ [SORT_BY_SEARCH_PARAM_NAME]: offersSortDefaultOption });
    }
    if (sortBy) {
      onSortChange(sortBy);
    }
  }, [searchParams, setSearchParams]);

  return (
    <form className="places__sorting" action="#" method="get" onClick={handleClick}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {offersSortOptions.find((opt) => opt.name === sortBy)?.title}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={classNames('places__options', 'places__options--custom', { 'places__options--opened': isOpened })}>
        {offersSortOptions.map((option) => (
          <li
            key={option.name}
            className={classNames('places__option', {
              'places__option--active': option.name === sortBy,
            })}
            tabIndex={0}
            onClick={option.name !== sortBy ? () => handleChangeOption(option.name) : undefined}
          >
            {option.title}
          </li>
        ))}
      </ul>
    </form>
  );
}
