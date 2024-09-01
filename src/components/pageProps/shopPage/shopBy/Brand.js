import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NavTitle from './NavTitle';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter } from '../../../../redux/orebiSlice';
import { Brands } from '../../../forms/productForm/formOptions';
import SideNavModal from './SideNavModal';
import {
  createbrand,
  getbrands,
  removebrand,
} from '../../../../functions/brand';
import { toast } from 'react-toastify';
import { TrashIcon } from '@heroicons/react/24/outline';

const Brand = () => {
  const [showBrands, setShowBrands] = useState(true);
  let [isOpen, setIsOpen] = useState(false);
  const [brand, setBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const checkedBrands = useSelector((state) => state.orebi.filters.brand);
  const dispatch = useDispatch();

  const handleToggleBrand = (brand) => {
    dispatch(toggleFilter({ filterType: 'brand', filterValue: brand }));
  };
  const user = useSelector((state) => state.orebi.userInfo);

  const loadBrands = () => {
    getbrands()
      .then((res) => {
        console.log(res.data); // Check if the data is correctly fetched
        setBrands(res.data);
      })
      .catch((err) => {
        console.error('Error fetching brands:', err);
        setBrands([]); // Fallback to empty array in case of error
      });
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(brand);
    createbrand(brand)
      .then(() => {
        toast.success(`"${brand}" is created`);
        loadBrands(); // Reload brands after creation
        setBrand(''); // Reset the input field
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm('delete ?')) {
      removebrand(slug)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadBrands(); // Reload categories after deletion
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };
  return (
    <div className="w-full p-4 bg-[#F5F5F3] rounded-lg drop-shadow-xl">
      <div
        onClick={() => setShowBrands(!showBrands)}
        className="cursor-pointer"
      >
        <NavTitle title="Marques" icons={true} setIsOpen={setIsOpen} />
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
                key={item._id} // Ensure you're using a unique key
                className="flex items-center justify-between border-b border-gray-200 py-2 hover:text-primeColor transition-colors duration-300"
              >
                <label
                  htmlFor={item.slug}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    className="mr-2 accent-primeColor cursor-pointer"
                    type="checkbox"
                    id={item.slug}
                    checked={checkedBrands.includes(item.name)}
                    onChange={() => handleToggleBrand(item.name)}
                  />
                  {item.name}
                </label>
                {user && (
                  <TrashIcon
                    onClick={() => handleRemove(item.slug)}
                    className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-300"
                  />
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
      <SideNavModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        title="brand"
        message={
          <input
            id="brand"
            name="brand"
            className=" border p-2 border-gray-400 bg-white rounded-lg focus:outline-none z-10 w-full h-[36px] "
            placeholder="ajouter une marque"
            onChange={handleBrandChange}
            value={brand}
          />
        }
      />
    </div>
  );
};

export default Brand;
