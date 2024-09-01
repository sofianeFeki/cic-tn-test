import React, { useEffect, useState } from 'react';
import { BsGridFill } from 'react-icons/bs';
import { ImList } from 'react-icons/im';
import { GoTriangleDown } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { DocumentPlusIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { toggleViewMode } from '../../../redux/orebiSlice';

const ProductBanner = ({ itemsPerPageFromBanner, sortFromBanner }) => {
  const viewMode = useSelector((state) => state.orebi.viewMode);
  const user = useSelector((state) => state.orebi.userInfo);

  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
      {/* =========================================================
                            Left Part Start here
        ======================================================== */}

      <div className="flex items-center gap-4">
        <span
          className={`${
            viewMode === 'grid'
              ? 'bg-primeColor text-white'
              : 'border-[1px] border-gray-300 bg-white'
          } w-8 h-8 text-lg flex items-center justify-center cursor-pointer drop-shadow-xl`}
          onClick={() => dispatch(toggleViewMode())}
        >
          <BsGridFill />
        </span>
        <span
          className={`${
            viewMode === 'list'
              ? 'bg-primeColor text-white'
              : 'border-[1px] border-gray-300 bg-white '
          } w-8 h-8 text-base flex items-center justify-center cursor-pointer drop-shadow-xl`}
          onClick={() => dispatch(toggleViewMode())}
        >
          <ImList />
        </span>
      </div>
      {/* =========================================================
                            Left Part End here
        ======================================================== */}
      {/* =========================================================
                            Right Part STart here
        ======================================================== */}
      <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0">
        {user && (
          <Link to={'/admin/product/create'}>
            <button className="flex items-center px-2 py-1 bg-green-500 text-white rounded cursor-pointer drop-shadow-xl hover:bg-green-300 transition duration-300">
              <DocumentPlusIcon
                className="block h-6 w-6 mr-1"
                aria-hidden="true"
              />
              <span className="font-bold">Create product</span>
            </button>
          </Link>
        )}

        <div className="flex items-center gap-2 text-base text-[#767676] relative">
          <label className="block">Trier par:</label>
          <select
            onChange={(e) => sortFromBanner(e.target.value)}
            id="countries"
            className="w-32 md:w-52 drop-shadow-xl border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="Dernières Nouveautés">Dernières Nouveautés</option>
            <option value="Meilleures ventes">Meilleures ventes</option>
          </select>
          <span className="absolute text-sm right-2 md:right-4 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#767676] relative">
          <label className="block">Affichage:</label>
          <select
            onChange={(e) => itemsPerPageFromBanner(+e.target.value)}
            id="countries"
            className="w-16 drop-shadow-xl md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor"
          >
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="36">36</option>
            <option value="48">48</option>
          </select>
          <span className="absolute text-sm right-3 top-2.5">
            <GoTriangleDown />
          </span>
        </div>
      </div>
      {/* =========================================================
                            Right Part End here
        ======================================================== */}
    </div>
  );
};

export default ProductBanner;
