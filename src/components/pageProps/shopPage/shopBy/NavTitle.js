import { PlusIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { BiCaretDown } from 'react-icons/bi';
import { useSelector } from 'react-redux';

const NavTitle = ({ title, icons, setIsOpen }) => {
  function openModal() {
    setIsOpen(true);
  }
  const user = useSelector((state) => state.orebi.userInfo);

  return (
    <div className="flex items-center justify-between pb-5">
      {icons ? (
        <>
          <div className="flex">
            {' '}
            <h3 className="font-bold lg:text-xl text-primeColor">{title}</h3>
            {user && (
              <button
                onClick={openModal}
                className="flex items-center ml-2 px-1 py-1 bg-green-500 text-white rounded cursor-pointer drop-shadow-xl hover:bg-green-300 transition duration-300"
              >
                <PlusIcon className="block h-4 w-4 " aria-hidden="true" />
              </button>
            )}
          </div>

          {icons && <BiCaretDown />}
        </>
      ) : (
        <>
          <h3 className="font-bold lg:text-xl text-primeColor">{title}</h3>
        </>
      )}
    </div>
  );
};

export default NavTitle;
