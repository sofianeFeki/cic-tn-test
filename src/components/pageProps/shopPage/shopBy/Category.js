import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter } from '../../../../redux/orebiSlice';
import NavTitle from './NavTitle';
import { Categories } from '../../../forms/productForm/formOptions';

const Category = () => {
  const checkedCategories = useSelector(
    (state) => state.orebi.filters.category
  );
  const dispatch = useDispatch();

  const handleToggleCategory = (category) => {
    dispatch(toggleFilter({ filterType: 'category', filterValue: category }));
  };

  return (
    <div className="w-full p-4 bg-[#F5F5F3] rounded-lg drop-shadow-xl">
      <NavTitle title="Catégories" icons={true} />
      <ul className="flex flex-col gap-3 text-gray-700">
        {Categories.map((item) => (
          <li
            key={item}
            className="flex items-center justify-between border-b border-gray-200 py-2 hover:text-primeColor transition-colors duration-300"
          >
            <label htmlFor={item} className="flex items-center cursor-pointer">
              <input
                className="mr-2 accent-primeColor cursor-pointer"
                type="checkbox"
                id={item}
                checked={checkedCategories.includes(item)}
                onChange={() => handleToggleCategory(item)}
              />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
