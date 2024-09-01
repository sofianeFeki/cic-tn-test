import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NavTitle from './NavTitle';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter } from '../../../../redux/orebiSlice';
import { subCategory } from '../../../forms/productForm/formOptions';
import SideNavModal from './SideNavModal';
import { getCategories } from '../../../../functions/Categories';
import { toast } from 'react-toastify';
import { createSub, getSubs, removeSub } from '../../../../functions/sub';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useParams } from 'react-router-dom';

const SubCategory = () => {
  const [showSubCategory, setShowSubCategory] = useState(true);
  let [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sub, setSub] = useState('');
  const [subs, setSubs] = useState([]);
  const [categorySelect, setCategorySelect] = useState('');
  const checkedSubCategories = useSelector(
    (state) => state.orebi.filters.subCategory
  );
  const { category } = useParams(); // This returns the actual params object
  const user = useSelector((state) => state.orebi.userInfo);

  // Log the params object
  useEffect(() => {
    console.log('Route params:', category); // This should log the actual route parameters
  }, [category]);

  const checkedCategories = useSelector(
    (state) => state.orebi.filters.category
  );
  const dispatch = useDispatch();

  const handleToggleSubCategory = (subCategory) => {
    dispatch(
      toggleFilter({
        filterType: 'subCategory',
        filterValue: subCategory,
      })
    );
  };
  const handleSubChange = (e) => {
    setSub(e.target.value);
  };
  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);
  const loadCategories = () => {
    getCategories().then((c) => setCategories(c.data));
  };
  const loadSubs = () => {
    getSubs().then((s) => setSubs(s.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSub({ sub, parent: categorySelect })
      .then((res) => {
        setSub('');
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // let answer = window.confirm('delete ?');
    //console.log(answer, slug);
    if (window.confirm('delete ?')) {
      removeSub(slug)
        .then((res) => {
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
        });
    }
  };

  const filteredSubs = category
    ? subs.filter((sub) => sub.parent.name === category)
    : subs.filter((sub) => checkedCategories.includes(sub.parent.name));

  return (
    <div className="w-full p-4 bg-[#F5F5F3] rounded-lg drop-shadow-xl">
      <div
        onClick={() => setShowSubCategory(!showSubCategory)}
        className="cursor-pointer"
      >
        <NavTitle title="Sous categorie" icons={true} setIsOpen={setIsOpen} />
      </div>
      {showSubCategory && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-3 text-gray-700">
            {filteredSubs.length > 0 ? (
              filteredSubs.map((item) => (
                <li
                  key={item.slug}
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
                      checked={checkedSubCategories.includes(item.name)}
                      onChange={() => handleToggleSubCategory(item.name)}
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
              ))
            ) : (
              <li className="text-gray-500 italic">
                Aucune sous-catégorie pour cette catégorie
              </li>
            )}
          </ul>
        </motion.div>
      )}
      <SideNavModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        title="Sous categorie"
        message={
          <>
            <select
              id="category"
              name="category"
              value={category} // Ensure the value is an empty string by default
              onChange={(e) => setCategorySelect(e.target.value)}
              className=" border mb-2 p-2 border-gray-400 bg-white rounded-lg focus:outline-none z-10 w-full h-[36px] "
              placeholder="ajouter une catagorie"
            >
              <option value="" disabled hidden>
                ajouter une catagorie
              </option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>

            <input
              id="sub"
              name="sub"
              className=" border p-2 border-gray-400 bg-white rounded-lg focus:outline-none z-10 w-full h-[36px] "
              placeholder="ajouter une sous catagorie"
              onChange={handleSubChange}
              value={sub}
            />
          </>
        }
      />
    </div>
  );
};

export default SubCategory;
