import React, { useState, useEffect, useCallback, useRef } from 'react';
import Flex from '../../designLayouts/Flex';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import {
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  ViewColumnsIcon,
  UserIcon,
  Square2StackIcon,
  Squares2X2Icon,
  BeakerIcon,
  PrinterIcon,
  DocumentDuplicateIcon,
  ChevronDownIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import { signOut } from 'firebase/auth';
import { auth } from '../../../service/firebase/firebase';
import { clearUser, setError } from '../../../redux/orebiSlice';
import { searchProducts } from '../../../functions/product';
import { GoTriangleDown } from 'react-icons/go';

const transitionStyles = {
  enter: 'transition ease-out duration-100',
  enterFrom: 'transform opacity-0 scale-95',
  enterTo: 'transform opacity-100 scale-100',
  leave: 'transition ease-in duration-75',
  leaveFrom: 'transform opacity-100 scale-100',
  leaveTo: 'transform opacity-0 scale-95',
};

// Define reusable button styles
const buttonBaseStyles =
  'flex items-center p-2  h-[36px] rounded-l-md shadow-md hover:shadow-xl transform transition duration-300  lg:h-[50px] lg:mt-0';
const userMenuButtonStyles = `
  relative 
  bg-white 
  border border-gray-300 
  hover:bg-gray-50 
  hover:color-black
  hover:shadow-xl
  transform 
  transition duration-300 
  focus:ring-4 focus:outline-none focus:ring-gray-300 
  rounded-full 
  shadow-md 
  p-1.5
`;
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
    setShowSearchBar(true); // Ensure the search bar is shown when typing
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Click outside to close the dropdown
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
    }

    // Close dropdown on "Escape" key press
    function handleEscapeKey(event) {
      if (event.key === 'Escape') {
        setShowSearchBar(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setShowSearchBar]);

  const fetchProducts = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const res = await searchProducts(searchQuery);
      const productData = res.data.products;

      const baseUrl = 'http://localhost:8000';
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?query=${query}`);
      setShowSearchBar(false);
    }
  };

  const handleSeeMore = () => {
    navigate(`/search?query=${query}`);
    setShowSearchBar(false);
  };

  return (
    <div className="w-full px-2 bg-[#F5F5F3] z-10 drop-shadow-xl sticky top-0 transition-all duration-300 ease-in-out  hover:shadow-2xl">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full  pb-4 lg:pb-0 h-full lg:h-24">
          {/* Mobile & Desktop: Browse all collection button */}
          <div className="flex justify-between">
            <div className="flex items-center justify-space-between lg:justify-start ">
              <Link to="/" className={`${userMenuButtonStyles} mr-3`}>
                <HomeIcon
                  className="block h-6 w-6 text-yellow-500"
                  aria-hidden="true"
                />
              </Link>
              <Link to="/shop">
                <button className="flex items-center p-2  h-[36px] rounded-md shadow-md hover:shadow-xl transform transition duration-300 bg-white  lg:h-[50px] lg:mt-0">
                  <Squares2X2Icon
                    className="block h-6 w-6 mr-1 text-yellow-500"
                    aria-hidden="true"
                  />
                  <span className="font-bold whitespace-nowrap p-0.5 text-sm md:text-base">
                    Nos produits{' '}
                  </span>
                </button>
              </Link>
            </div>

            {/* Mobile: Heart, Shopping Cart, User Profile Buttons */}
            <div className="flex lg:hidden gap-1 mt-2  pl-2">
              <Link to="/favorites" className={userMenuButtonStyles}>
                <HeartIcon
                  className="block h-6 w-6 text-red-400"
                  aria-hidden="true"
                />
              </Link>
              <Link to="/cart" className={userMenuButtonStyles}>
                <ShoppingBagIcon
                  className="block h-6 w-6 text-gray-600"
                  aria-hidden="true"
                />
              </Link>
              {user ? (
                <Menu as="div" className="relative">
                  <MenuButton className={userMenuButtonStyles}>
                    <UserIcon className="block h-6 w-6 text-green-600" />
                  </MenuButton>

                  <Transition {...transitionStyles}>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        <Link
                          to="/account"
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Your Profile
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          onClick={handleSignOut}
                          className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                        >
                          Sign out
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              ) : (
                <Link
                  to="/signin"
                  className="flex items-center border border-gray-200   focus:ring-4 focus:outline-none focus:ring-gray-300 bg-white text-black p-1 shadow-md rounded-xl hover:shadow-xl transform transition duration-300"
                >
                  <UserIcon className="block h-6 w-6 text-yellow-500" />{' '}
                  <span className="font-bold p-0.5 text-sm md:text-base">
                    Connexion
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* Desktop: Search Input */}
          <div className="relative mt-2 md:mt-0 w-full lg:w-[600px] h-[36px] lg:h-[50px] text-base text-primeColor border-t border-r border-b border-gray-300 bg-white flex items-center rounded-xl drop-shadow-xl gap-1">
            <Menu as="div" className="relative">
              <MenuButton
                className={`${buttonBaseStyles} bg-yellow-500 text-white `}
              >
                <ViewColumnsIcon
                  className="block h-6 w-6 mr-1"
                  aria-hidden="true"
                />
                <span className="font-bold whitespace-nowrap  text-sm md:text-base">
                  Nos categories
                </span>
                <ChevronDownIcon className=" mt-1 ml-1 block h-4 w-4 " />
              </MenuButton>
              <Transition {...transitionStyles}>
                <MenuItems className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {['Imprimante', 'Consommable', 'Photocopieur'].map(
                    (category, index) => (
                      <MenuItem key={index}>
                        <Link to={`category/${category}`}>
                          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-gray-100">
                            {category === 'Imprimante' && (
                              <PrinterIcon className="block h-6 w-6" />
                            )}
                            {category === 'Consommable' && (
                              <BeakerIcon className="block h-6 w-6" />
                            )}
                            {category === 'Photocopieur' && (
                              <DocumentDuplicateIcon className="block h-6 w-6" />
                            )}
                            {category}
                          </button>
                        </Link>
                      </MenuItem>
                    )
                  )}
                </MenuItems>
              </Transition>
            </Menu>

            <div className="flex items-center flex-grow">
              <MagnifyingGlassIcon
                className="block h-6 w-6 px-1 text-gray-600"
                aria-hidden="true"
              />
              <input
                id="search"
                name="search"
                className=" border-l border-gray-400 bg-white rounded-lg focus:outline-none z-10 w-full h-[36px] "
                placeholder="Recherche un produit"
                type="search"
                style={{ borderLeft: 'none' }}
                onChange={handleQueryChange}
                value={query}
                onKeyDown={handleKeyDown} // Add this line to handle Enter key
              />
              {showSearchBar && query && (
                <div
                  ref={dropdownRef}
                  className="w-full mx-auto h-auto max-h-96 bg-white top-16 absolute left-0 z-10 overflow-y-scroll rounded-xl shadow-md cursor-pointer"
                >
                  {loading ? (
                    <div className="text-center">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-6 h-6 text-gray-200 animate-spin fill-blue-600 my-1"
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
                              navigate(`/product/${item.slug}`);
                              setQuery('');
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
                      {products && products.length > 0 && (
                        <p
                          onClick={handleSeeMore}
                          className="text-blue-400 font-bold text-center"
                        >
                          Voir plus
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                navigate(`/search?query=${query}`);
              }}
              className={`bg-yellow-500 shadow-md hover:shadow-xl text-white flex items-center justify-center px-4 lg:px-6 h-[36px] lg:h-[50px] rounded-r-md`}
            >
              <MagnifyingGlassIcon
                className="block h-6 w-6 "
                aria-hidden="true"
              />
            </button>
          </div>

          {/* Desktop: Heart, Shopping Cart, User Profile Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/favorites" className={userMenuButtonStyles}>
              <HeartIcon
                className="block h-6 w-6 text-red-400"
                aria-hidden="true"
              />
            </Link>
            <Link to="/cart" className={userMenuButtonStyles}>
              <ShoppingBagIcon
                className="block h-6 w-6 text-gray-600"
                aria-hidden="true"
              />
            </Link>
            {user ? (
              <Menu as="div" className="relative">
                <div className="relative inline-flex items-center">
                  <MenuButton
                    className="relative 
            bg-white 
            border border-gray-300 
            hover:bg-gray-50 
            hover:text-black
            hover:shadow-xl
            transform 
            transition duration-300 
            focus:ring-4 focus:outline-none focus:ring-gray-300 
            rounded-full 
            shadow-md 
            p-1.5"
                  >
                    <span className="sr-only">Open user menu</span>
                    <UserIcon className="block h-6 w-6 text-gray-600" />
                  </MenuButton>
                  {/* Online status indicator */}
                  <span className="absolute top-8 right-1 block h-4 w-4 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <span className="text-gray-800 font-bold text-sm  m-2 ">
                  {user.email}
                </span>
                <Transition {...transitionStyles}>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        Your Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                      >
                        Sign out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              <Link
                to="/signin"
                className="flex bg-white text-black p-1 rounded-lg hover:shadow-xl transform transition duration-300"
              >
                <UserIcon className="block h-6 w-6 text-yellow-500" />{' '}
                <span className="font-bold p-0.5">Connexion</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
