import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavTitle from './NavTitle';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter } from '../../../../redux/orebiSlice';

const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);
  const checkedBrands = useSelector((state) => state.orebi.filters.brand);
  const dispatch = useDispatch();

  const brands = [
    { _id: 900, title: 'Pantum' },
    { _id: 901, title: 'Hp' },
    { _id: 902, title: 'Epson' },
    { _id: 903, title: 'Ricoh' },
  ];

  const handleToggleBrand = (brand) => {
    dispatch(toggleFilter({ filterType: 'brand', filterValue: brand.title }));
  };

  return (
    <div className="w-full p-4 bg-[#F5F5F3] rounded-lg drop-shadow-xl">
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Marques" icons={true} />
      </div>
      {showBrands && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-3 text-gray-700">
            {brands.map((item) => (
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
                    checked={checkedBrands.includes(item.title)}
                    onChange={() => handleToggleBrand(item)}
                  />
                  {item.title}
                </label>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Brand;
