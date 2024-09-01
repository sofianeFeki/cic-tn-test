import React, { useState } from 'react';
import Brand from './shopBy/Brand';
import Category from './shopBy/Category';
import Color from './shopBy/Color';
import SubCategory from './shopBy/subCtegory';
import { useDispatch, useSelector } from 'react-redux';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { removeFilter, setFilter } from '../../../redux/orebiSlice';
import SideNavModal from './shopBy/SideNavModal';
import { useParams } from 'react-router-dom';
//import Price from "./shopBy/Price";
const getActiveFiltersCount = (filters) => {
  let count = 0;
  for (const filterType in filters) {
    if (filters.hasOwnProperty(filterType)) {
      count += filters[filterType].length;
    }
  }
  return count;
};

const ShopSideNav = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const filters = useSelector((state) => state.orebi.filters);
  let [isOpen, setIsOpen] = useState(false);
  const checkedCategories = useSelector(
    (state) => state.orebi.filters.category
  );
  const handleFilterResetClick = () => {
    dispatch(setFilter());
  };
  const activeFiltersCount = getActiveFiltersCount(filters);
  const handleRemoveFilter = (filterType, filterValue) => {
    dispatch(removeFilter({ filterType, filterValue }));
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {activeFiltersCount > 0 && (
        <div className="mb-[-10]">
          <span
            className={
              'bg-primeColor text-white p-1 w-8 h-8 text-lg flex items-center justify-center cursor-pointer drop-shadow-xl   '
            }
          >
            <FunnelIcon onClick={() => setIsOpen(true)} />
          </span>
          <p>
            {activeFiltersCount} filtres active{' '}
            <span
              onClick={handleFilterResetClick}
              className="mx-1 font-bold cursor-pointer text-red-400"
            >
              Reset
            </span>
          </p>
        </div>
      )}
      <SideNavModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Filtres actifs"
        message={
          <>
            {Object.keys(filters).map((filterType) =>
              filters[filterType].map((filterValue) => (
                <div
                  key={`${filterType}-${filterValue}`}
                  className="flex items-center justify-between mb-2"
                >
                  <span className="font-medium">
                    {filterType}: {filterValue}
                  </span>
                  <button
                    onClick={() => handleRemoveFilter(filterType, filterValue)}
                    className="text-red-400 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </>
        }
      />

      {!category ? (
        <>
          <Category icons={false} />
          {checkedCategories && checkedCategories.length > 0 && <SubCategory />}
        </>
      ) : (
        <SubCategory category={category} />
      )}
      <Brand />
      <Color />
      {/* <Price /> */}
    </div>
  );
};

export default ShopSideNav;
