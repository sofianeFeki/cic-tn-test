import React, { useState, useEffect } from 'react';
import { imageNotFound } from '../../../assets/images';
import ShopNow from '../../designLayouts/buttons/ShopNow';
import Image from '../../designLayouts/Image';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import {
  getProductTitlesByCategories,
  getProductByTitle,
  saveProductOfTheYear,
  getProductOfTheYear,
} from '../../../functions/product';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const YearProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const user = useSelector((state) => state.orebi.userInfo);

  useEffect(() => {
    const fetchProductTitles = async () => {
      try {
        const response = await getProductTitlesByCategories();
        setProducts(response.data);
        const productOfTheYear = await getProductOfTheYear();
        if (productOfTheYear.data) {
          setSelectedProduct(productOfTheYear.data.Title);
        } else {
          setSelectedProduct(response.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch product titles', error);
      }
    };

    fetchProductTitles();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      if (selectedProduct) {
        try {
          const response = await getProductByTitle(selectedProduct);
          const product = response.data;
          const baseURL = 'https://cic-server-ygl9.onrender.com';

          const formatUrl = (path) => `${baseURL}${path.replace(/\\/g, '/')}`;

          if (product.Image) {
            product.Image = formatUrl(product.Image);
          }
          setProductData(product);
        } catch (error) {
          console.error('Failed to fetch product data', error);
        }
      }
    };

    fetchProductData();
  }, [selectedProduct]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleProductChange = async (product) => {
    setSelectedProduct(product);
    try {
      await saveProductOfTheYear(product);
    } catch (error) {
      console.error('Failed to save product of the year', error);
    }
  };

  function calculateTimeLeft() {
    const now = Date.now();
    const endTime = new Date('2024-09-30T00:00:00').getTime();
    const difference = endTime - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <div className="w-full h-auto mb-20 bg-gray-100 z-10 relative font-titleFont shadow-lg overflow-visible group cursor-pointer rounded-lg flex flex-col md:flex-row">
      <div className="flex absolute top-4 right-4 bg-black text-white p-1.5 md:p-2 rounded-lg z-20">
        <span className="block font-bold text-sm md:text-base mr-1">
          Offre se termine dans :
        </span>
        <span className="font-bold mr-6 gap-1 md:gap-2 text-sm md:text-base">
          {`${timeLeft.days}j ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
        </span>
        <div
          className="absolute  right-[-30px] md:right-[-40px] top-1/2 transform -translate-y-1/2 flex items-center justify-center h-14 w-14 md:h-16 md:w-16 bg-white text-red-500 font-bold text-xl border-[3px] border-yellow-500 drop-shadow-xl rounded-full transition-transform duration-500 "
          style={{
            boxShadow: '0 0 20px rgba(255, 223, 0, 0.8)',
          }}
        >
          {productData && productData.Price}{' '}
          <span className="absolute top-2 right-1 mb-1 text-xs">TND</span>
        </div>
      </div>

      <div className="relative w-full  md:w-1/2 flex items-center justify-center">
        <Image
          className=" w-auto h-auto  object-cover"
          imgSrc={productData ? productData.Image : imageNotFound}
        />
      </div>
      <div className="relative w-full md:w-1/2 h-auto p-6 md:p-10 flex flex-col items-start gap-6 justify-center z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Offre Spéciale
        </h1>
        <p className="text-base md:text-lg font-normal text-gray-700 max-w-[600px]">
          {productData
            ? productData.Description
            : 'Select a product to view its details.'}
        </p>
        <Link to={`product/${productData && productData.slug}`}>
          <button className="bg-primeColor text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold">
            Acheter
          </button>{' '}
        </Link>
        {user && (
          <div className="mt-4 w-full md:w-2/3 relative">
            <Listbox value={selectedProduct} onChange={handleProductChange}>
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">
                    {selectedProduct || 'Select a product'}
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {products.map((product) => (
                  <Listbox.Option
                    key={product}
                    value={product}
                    className={({ active }) =>
                      `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {product}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        )}
      </div>
    </div>
  );
};

export default YearProduct;
