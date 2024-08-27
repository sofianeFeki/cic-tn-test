import React from 'react';
import { Link } from 'react-router-dom';
import {
  saleImgOne,
  saleImgTwo,
  saleImgThree,
  consommable,
  ricoh1,
  ricoh2,
  ricoh3,
  pantum1,
  pantum2,
  pantum3,
} from '../../../assets/images/index';

const Sale = () => {
  return (
    <div className="py-20 flex flex-col lg:flex-row items-center justify-between gap-10">
      {/* Other Sections */}
      <div className="flex flex-col gap-10 w-full lg:w-2/3">
        {/* Imprimantes Section */}
        <div className="bg-white p-3 md:p-6 drop-shadow-lg">
          <p className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
            Découvrir nos imprimantes
          </p>
          <div className="flex gap-2 md:gap-4">
            <img
              src={pantum1}
              alt="Imprimante 1"
              className="w-24 md:w-1/3 max-h-[156px] h-full object-cover cursor-pointer shadow-md transform transition duration-300 hover:scale-105"
            />
            <img
              src={pantum2}
              alt="Imprimante 2"
              className="w-24 md:w-1/3 max-h-[170px] h-full object-cover cursor-pointer shadow-md transform transition duration-300 hover:scale-105"
            />
            <img
              src={pantum3}
              alt="Imprimante 3"
              className="w-24 md:w-1/3 max-h-[170px] h-full object-cover cursor-pointer shadow-md transform transition duration-300 hover:scale-105"
            />
          </div>
          <Link
            to="category/Imprimante"
            className="text-blue-500 hover:underline block  mt-2 md:mt-4"
          >
            Découvrir plus
          </Link>
        </div>

        {/* Photocopieur Section */}
        <div className="bg-white p-3 md:p-6 drop-shadow-lg">
          <p className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">
            Découvrir nos Photocopieur
          </p>
          <div className="flex gap-2 md:gap-4">
            <img
              src={ricoh1}
              alt="Photocopieur 1"
              className="w-24 md:w-1/3 max-h-[156px] h-full object-cover cursor-pointer shadow-md transform transition duration-300 hover:scale-105"
            />
            <img
              src={ricoh2}
              alt="Photocopieur 2"
              className="w-24 md:w-1/3 max-h-[156px] h-full object-cover cursor-pointer shadow-md transform transition duration-300 hover:scale-105"
            />
            <img
              src={ricoh3}
              alt="Photocopieur 3"
              className="w-24 md:w-1/3 max-h-[156px] h-full object-cover cursor-pointer shadow-md transform transition duration-300 hover:scale-105"
            />
          </div>
          <Link
            to="category/Photocopieur"
            className="text-blue-500 hover:underline block mt-2 md:mt-4"
          >
            Découvrir plus
          </Link>
        </div>
      </div>

      {/* Consommable Section */}
      <div className="bg-white w-full lg:w-1/3 gap-2 md:gap-4 flex flex-col px-3 md:px-8 text-left text-black drop-shadow-lg cursor-pointer">
        <p className="text-xl md:text-2xl font-semibold mt-3">
          Découvrir nos consommables
        </p>
        <div className="flex-grow flex items-center justify-center">
          <img
            src={consommable}
            alt="Consommable"
            className="object-cover max-h-[520px] w-[560px] shadow-md transform transition duration-300 hover:scale-105"
          />
        </div>
        <Link
          to="category/Consommable"
          className="text-blue-500 hover:underline block mb-2"
        >
          Découvrir plus
        </Link>
      </div>
    </div>
  );
};

export default Sale;
