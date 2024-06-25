import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import {
  AdjustmentsVerticalIcon,
  DocumentCheckIcon,
  NoSymbolIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Field, Input, Label } from "@headlessui/react";
import { FaDownload } from "react-icons/fa";

const ProductInfo = ({ productInfo }) => {
  const user = useSelector((state) => state.orebi.userInfo);
  const [startEdit, setStartEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const tabs = [
    {
      id: "Fiche Technique",
      label: "Fiche Technique",
      content: productInfo.ficheTech ? (
        <div>
          <table className='table-auto w-full'>
            <tbody>
              {productInfo.ficheTech.map((row) => (
                <tr key={row.label} className='bg-gray-100'>
                  <td className='border px-4 py-2 font-semibold'>
                    {row.label}
                  </td>
                  <td className='border px-4 py-2'>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {productInfo.pdf ? (
            <div className='my-4 flex justify-end'>
              <a
                href={productInfo.pdf}
                target='_blank'
                rel='noopener noreferrer'
                className='text-white'
              >
                <button className='inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-500 hover:bg-blue-600 text-white font-bodyFont'>
                  <FaDownload className='h-5 w-5 mr-2 text-white' />
                  Download PDF
                </button>
              </a>{" "}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : null,
    },

    {
      id: "Video",
      label: "Video",
      content: productInfo.video ? (
        <div>
          <video width='560' height='315' controls>
            <source src={productInfo.video} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : null,
    },
    // Add more tabs as needed
  ];

  const availableTabs = tabs.filter((tab) => tab.content !== null);

  if (availableTabs.length > 0 && activeTab === "") {
    setActiveTab(availableTabs[0].id);
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const highlightStyle = {
    color: "#d0121a", // Change this to the desired color
    fontWeight: "bold", // Change this to the desired font weight
  };

  const renderDescription = () => {
    if (!productInfo.des) {
      return null; // or handle accordingly if product.des is not defined
    }

    const description = productInfo.des.split(/:(.*?)-/).map((part, index) => {
      return (
        <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
          {part}
        </span>
      );
    });

    return <>{description}</>;
  };
  const dispatch = useDispatch();
  return (
    <>
      {/* <div className='flex flex-col gap-5'>
        <div className='flex items-start justify-between'>
          <div className='flex-1 pr-4'>
            {startEdit ? (
              <div className='mt-2'>
                <Field>
                  <Label className='text-sm/6 font-medium '>Title</Label>

                  <Input
                    type='text'
                    name='productName'
                    id='productName'
                    autoComplete='productName'
                    className=' block w-full rounded-lg border-none bg-white py-1.5 px-3 text-sm/4 text-black
                  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                    value={productInfo.productName}
                  />
                </Field>
              </div>
            ) : (
              <h2 className='text-4xl font-semibold break-words'>
                {productInfo.productName}
              </h2>
            )}
          </div>
          {user && (
            <div className='flex space-x-1'>
              {startEdit ? (
                <>
                  {" "}
                  <button
                    className='flex items-center p-2 bg-yellow-500 text-white rounded-xl shadow-md'
                    onClick={() => {
                      setStartEdit(false);
                      console.log(productInfo);
                    }}
                  >
                    <NoSymbolIcon
                      className='block h-6 w-6 mr-1'
                      aria-hidden='true'
                    />
                    <span>Cancel edit</span>
                  </button>
                  <button className='flex items-center p-2 bg-yellow-500 text-white rounded-xl shadow-md'>
                    <DocumentCheckIcon
                      className='block h-6 w-6 mr-1'
                      aria-hidden='true'
                    />
                    <span>Save</span>
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <button
                    className='flex items-center p-2 bg-yellow-500 text-white rounded-xl shadow-md'
                    onClick={() => setStartEdit(true)}
                  >
                    <AdjustmentsVerticalIcon
                      className='block h-6 w-6 mr-1'
                      aria-hidden='true'
                    />
                    <span>Edit product</span>
                  </button>
                  <button className='flex items-center p-2 bg-yellow-500 text-white rounded-xl shadow-md'>
                    <TrashIcon
                      className='block h-6 w-6 mr-1'
                      aria-hidden='true'
                    />
                    <span>Delete product</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <hr />
        {startEdit ? (
          <Field>
            <Label className='text-sm/6 font-medium '>description</Label>

            <textarea
              id='about'
              name='description'
              rows={3}
              className='block w-full  px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              defaultValue={""}
              value={productInfo.des}
            />
          </Field>
        ) : (
          <p className='text-base text-gray-600'>{renderDescription()} </p>
        )}
        {!startEdit && (
          <div className='flex items-center'>
            <p className='text-sm mr-2'> leave a review </p>

            <svg
              className='w-4 h-4 text-yellow-300 ms-1'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>
            <svg
              className='w-4 h-4 text-yellow-300 ms-1'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>
            <svg
              className='w-4 h-4 text-yellow-300 ms-1'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>
            <svg
              className='w-4 h-4 text-yellow-300 ms-1'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>
            <svg
              className='w-4 h-4 ms-1 text-gray-300 dark:text-gray-500'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>
          </div>
        )}
        {startEdit ? (
          <Field>
            <Label>Quantity</Label>
            <Input
              name='full_name'
              className=' block width-50 rounded-lg border-none bg-white py-1.5 px-3 text-sm/4 text-black
                  focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
              type='number'
              value={15}
            />
          </Field>
        ) : (
          <p className='text-base text-green-600 font-medium'>En Stock</p>
        )}
        {startEdit ? (
          <Field>
            <Label>Color</Label>
            <select
              id='country'
              name='country'
              autoComplete='country-name'
              className='block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
            >
              <option>Black</option>
              <option>Yellow</option>
              <option>Cayn</option>
              <option>Magenta</option>
            </select>
          </Field>
        ) : (
          <p className='font-medium text-lg'>
            <span className='font-normal'>Colors:</span> {productInfo.color}
          </p>
        )}
        {startEdit && (
          <Field>
            <Label>Brand</Label>
            <select
              id='country'
              name='country'
              autoComplete='country-name'
              className='block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
            >
              <option>hp</option>
              <option>pantum</option>
              <option>ricoh</option>
              <option>epson</option>
            </select>
          </Field>
        )}{" "}
        {startEdit && (
          <Field>
            <Label>Ctegory</Label>
            <select
              id='country'
              name='country'
              autoComplete='country-name'
              className='block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
            >
              <option>Imprimante</option>
              <option>consomable</option>
            </select>
          </Field>
        )}{" "}
        {startEdit && (
          <Field>
            <Label>Sub category</Label>
            <select
              id='country'
              name='country'
              autoComplete='country-name'
              className='block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
            >
              <option>imprimante</option>
              <option>tonner</option>
              <option>bac de dechet</option>
              <option>cartouche</option>
            </select>
          </Field>
        )}
        {!startEdit && (
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  _id: productInfo.id,
                  name: productInfo.productName,
                  quantity: 1,
                  image: productInfo.img,
                  badge: productInfo.badge,
                  price: productInfo.price,
                  colors: productInfo.color,
                })
              )
            }
            className='w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont'
          >
            Add to Cart
          </button>
        )}
      </div> */}

      {/* <div>
        {availableTabs.length > 0 && (
          <div>
            <div className=' space-x-4  pt-4'>
              {availableTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${
                    activeTab === tab.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } py-2 px-4  focus:outline-none`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className='my-4'>
              {availableTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={activeTab === tab.id ? "" : "hidden"}
                >
                  {tab.content !== null ? (
                    <div>{tab.content}</div>
                  ) : (
                    <p>No content available</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};

export default ProductInfo;
