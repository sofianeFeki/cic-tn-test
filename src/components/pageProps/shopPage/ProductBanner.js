import React, { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const ProductBanner = ({ itemsPerPageFromBanner }) => {
  //   const [selected, setSelected] = useState("");
  const [girdViewActive, setGridViewActive] = useState(true);
  const [listViewActive, setListViewActive] = useState(false);
  const user = useSelector((state) => state.orebi.userInfo);

  useEffect(() => {
    const gridView = document.querySelector(".gridView");
    const listView = document.querySelector(".listView");

    gridView.addEventListener("click", () => {
      setListViewActive(false);
      setGridViewActive(true);
    });
    listView.addEventListener("click", () => {
      setGridViewActive(false);
      setListViewActive(true);
    });
  }, [girdViewActive, listViewActive]);

  return (
    <div className='w-full flex flex-col md:flex-row md:items-center justify-between'>
      {/* =========================================================
                            Left Part Start here
        ======================================================== */}

      <div className='flex items-center gap-4'>
        <span
          className={`${
            girdViewActive
              ? "bg-primeColor text-white"
              : "border-[1px] border-gray-300 text-[#737373]"
          } w-8 h-8 text-lg flex items-center justify-center cursor-pointer gridView`}
        >
          <BsGridFill />
        </span>
        <span
          className={`${
            listViewActive
              ? "bg-primeColor text-white"
              : "border-[1px] border-gray-300 text-[#737373]"
          } w-8 h-8 text-base flex items-center justify-center cursor-pointer listView`}
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
      <div className='flex items-center gap-2 md:gap-6 mt-4 md:mt-0'>
        {user && (
          <Link to={"/admin/product/create"}>
            <button className='flex items-center px-2 py-1 bg-green-500 text-white rounded cursor-pointer shadow-md hover:bg-green-300 transition duration-300'>
              <DocumentPlusIcon
                className='block h-6 w-6 mr-1'
                aria-hidden='true'
              />
              <span className='font-bold'>Create product</span>
            </button>
          </Link>
        )}

        <div className='flex items-center gap-2 text-base text-[#767676] relative'>
          <label className='block'>Trier par:</label>
          <select
            // onChange={(e) => setSelected(e.target.value)}
            id='countries'
            className='w-32 md:w-52 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor'
          >
            <option value='Best Sellers'>Best Sellers</option>
            <option value='New Arrival'>New Arrival</option>
            <option value='Featured'>Featured</option>
            <option value='Final Offer'>Final Offer</option>
          </select>
          <span className='absolute text-sm right-2 md:right-4 top-2.5'>
            <GoTriangleDown />
          </span>
        </div>
        <div className='flex items-center gap-2 text-[#767676] relative'>
          <label className='block'>Affichage:</label>
          <select
            onChange={(e) => itemsPerPageFromBanner(+e.target.value)}
            id='countries'
            className='w-16 md:w-20 border-[1px] border-gray-200 py-1 px-4 cursor-pointer text-primeColor text-base block dark:placeholder-gray-400 appearance-none focus-within:outline-none focus-visible:border-primeColor'
          >
            <option value='12'>12</option>
            <option value='24'>24</option>
            <option value='36'>36</option>
            <option value='48'>48</option>
          </select>
          <span className='absolute text-sm right-3 top-2.5'>
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
