import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavTitle from './NavTitle';
import { useDispatch, useSelector } from 'react-redux';
import { toggleColor } from '../../../../redux/orebiSlice';

const Color = () => {
  const [showColors, setShowColors] = useState(true);

  const checkedColors = useSelector((state) => state.orebi.checkedColors);

  const dispatch = useDispatch();

  const colors = [
    { _id: 9001, title: 'Magenta', base: '#FF00FF' },
    { _id: 9002, title: 'Cyan', base: '#00FFFF' },
    { _id: 9003, title: 'Noir', base: '#000000' },
    { _id: 9004, title: 'Yellow', base: '#f59e0b' },
  ];

  const handleToggleColor = (color) => {
    dispatch(toggleColor(color));
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
            {colors.map((item) => (
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
                    style={{
                      backgroundColor: item.base,
                      border: `1px solid ${item.base}`,
                    }}
                    checked={checkedColors.some((b) => b._id === item._id)}
                    onChange={() => handleToggleColor(item)}
                  />
                  <span className="ml-2" style={{ color: item.base }}>
                    {item.title}
                  </span>
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
