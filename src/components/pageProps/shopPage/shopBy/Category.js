import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter } from '../../../../redux/orebiSlice';
import NavTitle from './NavTitle';
import { Categories } from '../../../forms/productForm/formOptions';
import SideNavModal from './SideNavModal';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../../functions/Categories';
import { toast } from 'react-toastify';
import { TrashIcon } from '@heroicons/react/24/outline';

const Category = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const checkedCategories = useSelector(
    (state) => state.orebi.filters.category
  );
  const user = useSelector((state) => state.orebi.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };
  const handleToggleCategory = (category) => {
    dispatch(toggleFilter({ filterType: 'category', filterValue: category }));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log(category);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(category);
    createCategory(category)
      .then((res) => {
        toast.success(`"${category}" is created`);
        loadCategories(); // Reload categories after deletion
        setCategory('');
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm('delete ?')) {
      removeCategory(slug)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadCategories(); // Reload categories after deletion
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  return (
    <div className="w-full p-4 bg-[#F5F5F3] rounded-lg drop-shadow-xl">
      <NavTitle title="Catégories" icons={true} setIsOpen={setIsOpen} />
      <ul className="flex flex-col gap-3 text-gray-700">
        {categories.map((item) => (
          <li
            key={item._id}
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
                checked={checkedCategories.includes(item.name)}
                onChange={() => handleToggleCategory(item.name)}
              />
              {item.name} {/* Ensure you are rendering a string */}
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
      <SideNavModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        title="categorie"
        message={
          <input
            id="category"
            name="category"
            className=" border p-2 border-gray-400 bg-white rounded-lg focus:outline-none z-10 w-full h-[36px] "
            placeholder="ajouter un categorie"
            onChange={handleCategoryChange}
            value={category}
          />
        }
      />
    </div>
  );
};

export default Category;
