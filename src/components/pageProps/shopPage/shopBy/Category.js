import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCategory } from '../../../../redux/orebiSlice';
import { ImPlus } from 'react-icons/im';
import NavTitle from './NavTitle';

const Category = () => {
  const checkedCategorys = useSelector((state) => state.orebi.checkedCategorys);
  const dispatch = useDispatch();

  const category = [
    { _id: 9006, title: 'Imprimante' },
    { _id: 9007, title: 'Encre' },
    { _id: 9008, title: 'Ruban' },
    { _id: 9009, title: 'Bac' },
    { _id: 9010, title: 'Toner' },
    { _id: 9011, title: 'Cartouche' },
  ];

  const handleToggleCategory = (category) => {
    dispatch(toggleCategory(category));
  };

  return (
    <div className="w-full p-4 bg-[#F5F5F3] rounded-lg drop-shadow-xl">
      <NavTitle title="Catégories" icons={true} />
      <ul className="flex flex-col gap-3 text-gray-700">
        {category.map((item) => (
          <li
            key={item._id}
            className="flex items-center justify-between border-b border-gray-200 py-2 hover:text-primeColor transition-colors duration-300"
          >
            <label
              htmlFor={item._id}
              className="flex items-center cursor-pointer"
            >
              <input
                className="mr-2 accent-primeColor cursor-pointer"
                type="checkbox"
                id={item._id}
                checked={checkedCategorys.some((b) => b._id === item._id)}
                onChange={() => handleToggleCategory(item)}
              />
              {item.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
