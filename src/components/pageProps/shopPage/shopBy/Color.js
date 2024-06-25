import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useDispatch, useSelector } from "react-redux";
import { toggleColor } from "../../../../redux/orebiSlice";

const Color = () => {
  const [showColors, setShowColors] = useState(true);

  const checkedColors = useSelector((state) => state.orebi.checkedColors);

  const dispatch = useDispatch();

  const colors = [
    {
      _id: 9001,
      title: "Magenta",
      base: "#FF00FF",
    },
    {
      _id: 9002,
      title: "Cyan",
      base: "#00FFFF",
    },
    {
      _id: 9003,
      title: "Noir",
      base: "#000000",
    },
    {
      _id: 9004,
      title: "Yellow",
      base: "#f59e0b",
    },
  ];

  const handleToggleColor = (color) => {
    dispatch(toggleColor(color));
  };

  return (
    <div>
      <div
        onClick={() => setShowColors(!showColors)}
        className='cursor-pointer'
      >
        <NavTitle title='Couleur' icons={true} />
      </div>
      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className='flex flex-col gap-4 text-sm lg:text-base text-[#767676]'>
            {colors.map((item) => (
              <li
                key={item._id}
                style={{ color: item.base, fontWeight: 600 }}
                className='border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2'
              >
                <label htmlFor={item._id} className='cursor-pointer '>
                  <input
                    className='cursor-pointer mr-2 border-[#F0F0F0]'
                    type='checkbox'
                    id={item._id}
                    style={{
                      backgroundColor: item.base,
                      borderColor: `1px solid ${item.base}`,
                    }}
                    checked={checkedColors.some((b) => b._id === item._id)}
                    onChange={() => handleToggleColor(item)}
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

export default Color;
