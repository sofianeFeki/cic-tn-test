import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavTitle from './NavTitle';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter } from '../../../../redux/orebiSlice';
import { Colors } from '../../../forms/productForm/formOptions';

const Color = () => {
  const [showColors, setShowColors] = useState(true);

  const checkedColors = useSelector((state) => state.orebi.filters.color);

  const dispatch = useDispatch();

  const handleToggleColor = (color) => {
    dispatch(toggleFilter({ filterType: 'color', filterValue: color }));
  };

  return (
    <div className="w-full p-4 bg-[#F5F5F3] rounded-lg drop-shadow-xl">
      <div
        onClick={() => setShowColors(!showColors)}
        className="cursor-pointer"
      >
        <NavTitle title="Couleur" icons={true} />
      </div>
      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-3 text-gray-700">
            {Colors.map((item) => (
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
                    checked={checkedColors.includes(item)}
                    onChange={() => handleToggleColor(item)}
                  />
                  <span className="ml-2">{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Color;
