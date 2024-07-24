import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import {
  FaSearch,
  FaUser,
  FaCaretDown,
  FaShoppingCart,
  FaRegTimesCircle,
} from 'react-icons/fa';
import Flex from '../../designLayouts/Flex';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { paginationItems } from '../../../constants';
import { BsSuitHeartFill } from 'react-icons/bs';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import {
  ShoppingBagIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  ViewColumnsIcon,
  UserIcon,
  Square2StackIcon,
  Squares2X2Icon,
  BeakerIcon,
  PrinterIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import { signOut } from 'firebase/auth';
import { auth } from '../../../service/firebase/firebase';
import { clearUser, setError } from '../../../redux/orebiSlice';
import { searchProducts } from '../../../functions/product';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const HeaderBottom = () => {
  const user = useSelector((state) => state.orebi.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchProducts = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const res = await searchProducts(searchQuery);
      const productData = res.data;

      const baseUrl = 'https://cic-server-ygl9.onrender.com';
      const formatUrl = (path) => `${baseUrl}${path.replace(/\\/g, '/')}`;

      productData.forEach((product) => {
        if (product.Image) product.Image = formatUrl(product.Image);
        if (product.video) product.video = formatUrl(product.video);
        if (product.pdf) product.pdf = formatUrl(product.pdf);
      });

      setProducts(productData);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), []);

  useEffect(() => {
    debouncedFetchProducts(query);
  }, [query, debouncedFetchProducts]);

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate('/signin');
    } catch (error) {
      dispatch(setError(error.message)); // Dispatch the error to Redux
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className="w-full bg-[#F5F5F3] relative drop-shadow-xl">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <div>
            <Link to="/shop">
              <button className="flex items-center p-2  text-black ">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open category menu</span>
                <Squares2X2Icon
                  className="block h-6 w-6 mr-1"
                  aria-hidden="true"
                />
                <span>Browse all collection</span>
              </button>
            </Link>
          </div>
          <div className="relative w-full lg:w-[600px] h-[50px] text-base text-primeColor bg-white flex items-center gap-2 justify-between  rounded-xl shadow-md">
            <Menu as="div" className="relative">
              <div>
                <MenuButton className="flex items-center p-2 bg-yellow-500 text-white rounded-xl shadow-md h-[50px]">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open category menu</span>
                  <ViewColumnsIcon
                    className="block h-6 w-6 mr-1"
                    aria-hidden="true"
                  />
                  <span>Nos categories</span>
                </MenuButton>
              </div>
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    <Link to={'category/Imprimante'}>
                      <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 hover:bg-gray-100">
                        <PrinterIcon className="block h-6 w-6" />
                        Imprimante
                      </button>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'category/Consommable'}>
                      <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 hover:bg-gray-100">
                        <BeakerIcon className="block h-6 w-6" />
                        Consommable
                      </button>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'category/Photocopieur'}>
                      <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 hover:bg-gray-100">
                        <DocumentDuplicateIcon className="block h-6 w-6" />
                        Photocopieur
                      </button>
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
            <Menu>
              <MagnifyingGlassIcon
                className="block h-6 w-6 pl-2 text-gray-600"
                aria-hidden="true"
              />
            </Menu>

            <div>
              <input
                id="search"
                name="search"
                className="p-2 border-l border-gray-300 bg-white focus:outline-none w-96"
                placeholder="Recherche un produit"
                type="search"
                style={{ borderLeft: 'none' }}
                onChange={handleQueryChange}
                value={query}
              />
              {showSearchBar && query && (
                <div className="w-full mx-auto h-auto max-h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll rounded-xl shadow-md scrollbar-hide cursor-pointer">
                  {loading ? (
                    <div className="text-center">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 my-1"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {query && products.length === 0 && (
                        <p className="text-gray-400 px-4 py-1">
                          No product found
                        </p>
                      )}
                      {query &&
                        products.map((item) => (
                          <div
                            onClick={() => {
                              navigate(
                                `/product/${item.slug
                                  .toLowerCase()
                                  .split(' ')
                                  .join('')}`
                              );
                            }}
                            key={item._id}
                            className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3"
                          >
                            <img
                              className="w-24 ml-2"
                              src={item.Image}
                              alt="productImg"
                            />
                            <div className="flex flex-col gap-1">
                              <p className="font-semibold text-lg">
                                {item.Title}
                              </p>
                              <p className="text-xs">
                                {item.Description.length > 100
                                  ? `${item.Description.slice(0, 100)}...`
                                  : item.Description}
                              </p>
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6 cursor-pointer relative">
            <div>
              {user ? ( // If user is logged in, show the full menu
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(
                              focus ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(
                              focus ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem onClick={handleSignOut}>
                        {({ focus }) => (
                          <p
                            href="#"
                            className={classNames(
                              focus ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Sign out
                          </p>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              ) : (
                // If user is not logged in, show simplified version
                // <div>
                //
                // </div>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex focus:outline-none">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <UserIcon className="block h-6 w-6" aria-hidden="true" />
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                            to="/signin"
                            className={classNames(
                              focus ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Sign In
                          </Link>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              )}
            </div>

            <Link to="/cart">
              <div className="relative">
                <ShoppingBagIcon className="block h-6 w-6" aria-hidden="true" />{' '}
                <span className="absolute font-titleFont top-3 -right-2 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-primeColor text-white">
                  {products.length > 0 ? products.length : 0}
                </span>
              </div>
            </Link>
            <HeartIcon className="block h-6 w-6" aria-hidden="true" />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
