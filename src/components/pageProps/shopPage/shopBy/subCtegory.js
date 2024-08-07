import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavTitle from './NavTitle';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter } from '../../../../redux/orebiSlice';
import { subCategory } from '../../../forms/productForm/formOptions';

const SubCategory = () => {
  const [showSubCategory, setShowSubCategory] = useState(true);
  const checkedSubCategories = useSelector(
    (state) => state.orebi.filters.subCategory
  );
  const dispatch = useDispatch();

  const handleToggleSubCategory = (subCategory) => {
    dispatch(
      toggleFilter({
        filterType: 'subCategory',
        filterValue: subCategory,
      })
    );
  };

  return (
    <div className="w-full p-4 bg-[#F5F5F3] rounded-lg drop-shadow-xl">
      <div
        onClick={() => setShowSubCategory(!showSubCategory)}
        className="cursor-pointer"
      >
        <NavTitle title="Consommable" icons={true} />
      </div>
      {showSubCategory && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-3 text-gray-700">
            {subCategory.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between border-b border-gray-200 py-2 hover:text-primeColor transition-colors duration-300"
              >
                <label
                  htmlFor={item}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    className="mr-2 accent-primeColor cursor-pointer"
                    type="checkbox"
                    id={item}
                    checked={checkedSubCategories.includes(item)}
                    onChange={() => handleToggleSubCategory(item)}
                  />
                  {item}
                </label>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default SubCategory;

