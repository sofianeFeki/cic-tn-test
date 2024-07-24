import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Field, Label, Select } from '@headlessui/react';
import {
  AdjustmentsVerticalIcon,
  CameraIcon,
  DocumentCheckIcon,
  DocumentPlusIcon,
  NoSymbolIcon,
  PlusIcon,
  TrashIcon,
  VideoCameraIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Breadcrumbs from '../../pageProps/Breadcrumbs';
import { noImage } from '../../../assets/images';
import { removeProduct } from '../../../functions/product';
import { toast } from 'react-toastify';

const Colors = ['Black', 'Blanc', 'Yellow', 'Cyan', 'Magenta', 'Multicouleur'];
const Brands = [
  'Pantum',
  'HP',
  'Epson',
  'Ricoh',
  'Canon',
  'Kyocera',
  'Oki',
  'Tally',
  'Epson',
  'Samsung',
  'Lexmark',
  'xerox',
];
const Categories = ['Imprimante', 'Photocopieur', 'Consommable'];
const subCategory = [
  'Toner',
  'Bac de dechet',
  'Cartouche',
  'Ruban',
  'Bouteille D’encre',
  'Tête d’impression',
  'Tambour',
];

const ProductForm = ({
  product,
  setProduct,
  handleSubmit,
  startEdit,
  setStartEdit,
  loading,
  videoPreview,
  setVideoPreview,
  pdfPreview,
  setPdfPreview,
}) => {
  const [prevLocation, setPrevLocation] = useState('');
  const [productInfo, setProductInfo] = useState([]);

  const user = useSelector((state) => state.orebi.userInfo);
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/admin/product-update/${product.slug}`, { state: { product } });
  };
  const handleCancelEdit = () => {
    navigate(-1);
  };

  const handleChangeProduct = (e, index, field) => {
    const { name, value } = e.target;

    // Check if the change is for the ficheTech array
    if (name.startsWith('ficheTech')) {
      setProduct((prevState) => {
        const newFicheTech = [...prevState.ficheTech];
        newFicheTech[index][field] = value;
        return {
          ...prevState,
          ficheTech: newFicheTech,
        };
      });
    } else {
      setProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddFicheTech = () => {
    setProduct((prevState) => ({
      ...prevState,
      ficheTech: [...prevState.ficheTech, { label: '', value: '' }],
    }));
  };

  const handleDeleteFicheTech = (index) => {
    setProduct((prevState) => {
      const newFicheTech = prevState.ficheTech.filter((_, i) => i !== index);
      return {
        ...prevState,
        ficheTech: newFicheTech,
      };
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProduct((prevState) => ({
        ...prevState,
        Image: imageUrl, // URL for displaying the image
        imageFile: file, // Temporarily store the file for form submission
      }));
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'video/mp4') {
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
      setProduct((prevState) => ({
        ...prevState,
        video: file,
      }));
    } else {
      alert('Please upload a valid Video file.');
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const pdfUrl = URL.createObjectURL(file);
      setPdfPreview(pdfUrl);
      setProduct((prevState) => ({
        ...prevState,
        pdf: file,
      }));
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleReset = (field) => {
    // Reset the preview URL if needed
    if (field === 'Image') {
      // Clean up the object URL
      URL.revokeObjectURL(product.Image);
      // Reset the file object
      setProduct((prevState) => ({
        ...prevState,
        Image: '',
        imageFile: null,
      }));
    }
    if (field === 'video') setVideoPreview('');
    if (field === 'pdf') setPdfPreview('');
    console.log(product);
  };

  const handleRemove = () => {
    // let answer = window.confirm('Delete');
    if (window.confirm('Delete')) {
      // console.log('send delete request', slug);
      removeProduct(product.slug)
        .then((res) => {
          toast.error(`${res.data.Title} is deleted`);
          navigate('/shop');
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  const tabs = [
    {
      id: 'Fiche Technique',
      label: 'Fiche Technique',
      content: (
        <div>
          {startEdit && (
            <div className="flex justify-end ">
              <button
                onClick={handleAddFicheTech}
                className="flex justify-end p-1 mb-1 bg-green-500 text-white rounded"
              >
                <PlusIcon className="block h-6 w-6 mr-1" />
                <span> Add New Item</span>
              </button>
            </div>
          )}

          <table className="table-auto w-full">
            <table className="min-w-full leading-normal">
              <tbody>
                {product.ficheTech &&
                  product.ficheTech.map((row, index) => (
                    <tr key={index} className="bg-gray-100">
                      <td className="border px-4 py-2 font-semibold">
                        {startEdit ? (
                          <input
                            type="text"
                            name={`ficheTech-label-${index}`} // Name to identify ficheTech changes
                            value={row.label} // Updated value reference
                            onChange={(e) =>
                              handleChangeProduct(e, index, 'label')
                            }
                            className="font-semibold block w-full rounded-lg border-none bg-white py-1.5 px-3 text-sm/4 text-black focus:outline-none focus:ring focus:border-blue-300 transition duration-150 shadow-md"
                          />
                        ) : (
                          <>{row.label}</>
                        )}
                      </td>
                      <td className="border px-4 py-2">
                        {startEdit ? (
                          <input
                            type="text"
                            name={`ficheTech-value-${index}`} // Name to identify ficheTech changes
                            value={row.value} // Updated value reference
                            onChange={(e) =>
                              handleChangeProduct(e, index, 'value')
                            }
                            className="block w-full rounded-lg border-none bg-white py-1.5 px-3 text-sm/4 text-black focus:outline-none focus:ring focus:border-blue-300 transition duration-150 shadow-md"
                          />
                        ) : (
                          <>{row.value}</>
                        )}
                      </td>
                      {startEdit && (
                        <td className="border align-middle text-center">
                          <button
                            onClick={() => handleDeleteFicheTech(index)}
                            className="bg-red-500 text-white rounded p-1 inline-block"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </table>
        </div>
      ),
    },

    {
      id: 'Video',
      label: 'Video',
      content: (
        <div className="flex justify-start mt-3">
          {startEdit ? (
            <label className=" flex px-3 py-1 mb-1 bg-green-500 text-white rounded">
              <VideoCameraIcon
                className="block h-6 w-6 mr-1"
                aria-hidden="true"
              />
              <span className="font-bold ">Ajouter un video</span>
              <input
                type="file"
                accept="video/mp4"
                onChange={handleVideoChange}
                className="hidden"
              />
            </label>
          ) : (
            <div>
              {product.video && (
                <video width="560" height="315" controls>
                  <source src={product.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
          {startEdit && product.video && (
            <div className="flex justify-start items-center ml-2 text-sm text-gray-700">
              <span className="flex justify-start items-center ml-2 text-sm text-gray-700">
                {product.video.name}
              </span>
              <span name="video" onClick={() => handleReset('video')}>
                <XCircleIcon
                  className="block h-6 w-6 ml-1"
                  aria-hidden="true"
                  color="red"
                  cursor={'pointer'}
                />
              </span>
            </div>
          )}
        </div>
      ),
    },

    {
      id: 'pdf',
      label: 'Pdf produit',
      content: (
        <div className="flex justify-start mt-3">
          {startEdit ? (
            <label className="flex px-3 py-1 mb-1 bg-green-500 text-white rounded cursor-pointer">
              <DocumentPlusIcon
                className="block h-6 w-6 mr-1"
                aria-hidden="true"
              />
              <span className="font-bold">Ajouter un PDF</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
                className="hidden"
              />
            </label>
          ) : (
            <>
              {product.pdf && (
                <a
                  href={product.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-blue font-medium"
                >
                  Brochure（Click to download）
                </a>
              )}
            </>
          )}

          {startEdit && product.pdf && (
            <div className="flex justify-start items-center ml-2 text-sm text-gray-700">
              <span className="flex justify-start items-center ml-2 text-sm text-gray-700">
                {product.pdf.name}
              </span>
              <span name="pdf" onClick={() => handleReset('pdf')}>
                <XCircleIcon
                  className="block h-6 w-6 ml-1"
                  aria-hidden="true"
                  color="red"
                  cursor={'pointer'}
                />
              </span>
            </div>
          )}
        </div>
      ),
    },
    // Add more tabs as needed
  ];

  const availableTabs = tabs.filter((tab) => tab.content !== null);

  if (availableTabs.length > 0 && activeTab === '') {
    setActiveTab(availableTabs[0].id);
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  //   useEffect(() => {
  //     setProductInfo(location.state.item);
  //     setPrevLocation(location.pathname);
  //     console.log(productInfo, "im info");
  //   }, [location, productInfo.ficheTech]);

  const highlightStyle = {
    color: '#d0121a', // Change this to the desired color
    fontWeight: 'bold', // Change this to the desired font weight
  };

  const renderDescription = () => {
    if (!product.Description) {
      return null; // or handle accordingly if product.des is not defined
    }

    const description = product.Description.split(/:(.*?)-/).map(
      (part, index) => {
        return (
          <span key={index} style={index % 2 === 1 ? highlightStyle : {}}>
            {part}
          </span>
        );
      }
    );

    return <>{description}</>;
  };

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4 ">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          {/* Image Column */}
          <div className="h-full xl:col-span-4 relative cursor-pointer shadow-md max-h-[400px] w-full">
            {startEdit && product.Image && (
              <span
                className="absolute font-titleFont top-3 -right-0 mr-4 w-4 h-4 "
                name="Image"
                onClick={() => handleReset('Image')}
              >
                <XCircleIcon
                  className="block h-6 w-6 ml-1"
                  aria-hidden="true"
                  color="red"
                  cursor={'pointer'}
                />
              </span>
            )}
            <img
              src={product.Image || noImage}
              alt="Product"
              className="w-full h-full object-cover"
            />
            {startEdit && (
              <label className="flex bg-white text-black p-2 rounded cursor-pointer shadow-md absolute bottom-2 right-2 hover:bg-gray-300 transition duration-300">
                <CameraIcon className="block h-6 w-6 mr-1" aria-hidden="true" />
                <span className="font-bold">Ajouter une photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Form Column */}
          <div className="h-full w-full xl:col-span-8 xl:px-4 flex flex-col gap-2 justify-start mt-3">
            <div className="flex flex-col gap-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {startEdit ? (
                    <div className="mt-2">
                      <Field>
                        <Label className="text-sm/6 font-medium">Title</Label>

                        <input
                          type="text"
                          name="Title"
                          id="Title"
                          className="block w-[70%] rounded-lg border-none bg-white py-1.5 px-3 text-sm/4 text-black focus:outline-none focus:ring focus:border-blue-300 transition duration-150 shadow-md"
                          value={product.Title}
                          onChange={handleChangeProduct}
                        />
                      </Field>
                    </div>
                  ) : (
                    <div className="flex-1 pr-4">
                      <h2 className="text-4xl font-semibold break-words">
                        {product.Title}
                      </h2>
                      {/* <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                        <div class="animate-pulse flex space-x-4">
                          <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                          <div class="flex-1 space-y-6 py-1">
                            <div class="h-2 bg-slate-200 rounded"></div>
                            <div class="space-y-3">
                              <div class="grid grid-cols-3 gap-4">
                                <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                                <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                              </div>
                              <div class="h-2 bg-slate-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  )}
                </div>
                {user && (
                  <div className="flex space-x-2">
                    {startEdit ? (
                      <>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center p-2 bg-white text-black rounded cursor-pointer shadow-md hover:bg-gray-300 transition duration-300"
                        >
                          <NoSymbolIcon
                            className="block h-6 w-6 mr-1"
                            aria-hidden="true"
                          />
                          <span className="font-bold">Annuler</span>
                        </button>
                        <button
                          className="flex items-center p-2 bg-blue-500 text-white rounded cursor-pointer shadow-md hover:bg-blue-600 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                          onClick={handleSubmit}
                          disabled={loading} // Change to true to see the disabled state or use a dynamic condition
                        >
                          {loading ? (
                            <svg
                              aria-hidden="true"
                              role="status"
                              className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="#1C64F2"
                              ></path>
                            </svg>
                          ) : (
                            <DocumentCheckIcon
                              className="block h-6 w-6 mr-1"
                              aria-hidden="true"
                            />
                          )}
                          <span className="font-bold">Sauvegarder</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleEditClick}
                          className="flex items-center p-2 bg-white text-black rounded cursor-pointer shadow-md hover:bg-gray-300 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                          disabled={!product.slug}
                        >
                          <AdjustmentsVerticalIcon
                            className="block h-6 w-6 mr-1"
                            aria-hidden="true"
                          />
                          <span className="font-bold">Edit product</span>
                        </button>
                        <button
                          className="flex items-center p-2 bg-blue-500 text-white rounded cursor-pointer shadow-md hover:bg-blue-600 transition duration-300"
                          onClick={handleRemove} // Assuming you have a delete handler function
                        >
                          <TrashIcon
                            className="block h-6 w-6 mr-1"
                            aria-hidden="true"
                          />
                          <span className="font-bold">Delete product</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <>
                {startEdit ? (
                  <Field>
                    <Label className="text-sm/6 font-medium">Description</Label>
                    <textarea
                      id="Description"
                      name="Description"
                      rows={3}
                      className="block w-[70%] px-3 rounded-md border-0 py-1.5   focus:outline-none focus:ring focus:border-blue-300 transition duration-150 shadow-md"
                      value={product.Description}
                      onChange={handleChangeProduct}
                    />
                  </Field>
                ) : (
                  <>
                    {' '}
                    <hr />
                    <p className="text-base text-gray-600">
                      {renderDescription()}{' '}
                    </p>
                  </>
                )}

                {startEdit ? (
                  <>
                    {' '}
                    <Field>
                      <Label className="text-sm/6 font-medium">Quantity</Label>
                      <input
                        id="Quantity"
                        name="Quantity"
                        type="number"
                        className="block w-[50%] rounded-lg  bg-white py-1.5 px-3 text-sm/4 text-black focus:outline-none focus:ring focus:border-blue-300 transition duration-150 shadow-md"
                        value={product.Quantity}
                        onChange={handleChangeProduct}
                      />
                    </Field>
                    <Field>
                      <Label className="text-sm/6 font-medium">Sold</Label>
                      <input
                        id="sold"
                        name="sold"
                        type="number"
                        className="block w-[50%] rounded-lg  bg-white py-1.5 px-3 text-sm/4 text-black focus:outline-none focus:ring focus:border-blue-300 transition duration-150 shadow-md"
                        value={product.sold}
                        onChange={handleChangeProduct}
                      />
                    </Field>
                    <Field>
                      <Label className="text-sm/6 font-medium">Color</Label>
                      <select
                        id="color"
                        name="color"
                        value={product.color}
                        onChange={handleChangeProduct}
                        className="block w-[50%] rounded-md  py-1.5 px-2  focus:outline-none focus:ring focus:border-blue-300 transition duration-150 shadow-md"
                      >
                        <option value="" disabled selected hidden>
                          Choose a color
                        </option>

                        {Colors.map((color) => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field>
                      <Label className="text-sm/6 font-medium">Brand</Label>
                      <Select
                        id="Brand"
                        name="Brand"
                        value={product.Brand}
                        onChange={handleChangeProduct}
                        className="block w-[50%] rounded-md border-0 py-1.5 px-2 focus:outline-none focus:ring focus:border-blue-300 transition duration-150 shadow-md"
                      >
                        <option value="" disabled selected hidden>
                          Choose a Brand
                        </option>
                        {Brands.map((brand) => (
                          <option key={brand} value={brand}>
                            {brand}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field>
                      <Label className="text-sm/6 font-medium">Category</Label>
                      <select
                        id="Category"
                        name="Category"
                        value={product.Category}
                        onChange={handleChangeProduct}
                        autoComplete="Category"
                        className="block w-[50%] rounded-md border-0 py-1.5 px-2  focus:outline-none focus:ring focus:border-blue-300 transition duration-150 shadow-md"
                      >
                        <option value="" disabled selected hidden>
                          Choose a Category
                        </option>
                        {Categories.map((Category) => (
                          <option key={Category} value={Category}>
                            {Category}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field>
                      <Label className="text-sm/6 font-medium">
                        Sub Category
                      </Label>
                      <select
                        id="subCategory"
                        name="subCategory"
                        value={product.subCategory}
                        onChange={handleChangeProduct}
                        autoComplete="subCategory"
                        className="block w-[50%] rounded-md border-0 py-1.5 px-2 focus:outline-none focus:ring focus:border-blue-300 transition duration-150 shadow-md"
                      >
                        <option value="" disabled selected hidden>
                          Choose a subCategory
                        </option>
                        {subCategory.map((subCategory) => (
                          <option key={subCategory} value={subCategory}>
                            {subCategory}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </>
                ) : (
                  <>
                    {' '}
                    <div className="flex items-center">
                      <p className="text-sm mr-2"> leave a review </p>

                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                    <p className="text-base text-green-600 font-medium">
                      En Stock
                    </p>
                    <p className="font-medium text-lg">
                      <span className="font-normal">
                        Colors: {product.color}
                      </span>{' '}
                      {productInfo.color}
                    </p>
                    <button
                      // onClick={() =>
                      //   dispatch(
                      //     addToCart({
                      //       _id: productInfo.id,
                      //       name: productInfo.productName,
                      //       quantity: 1,
                      //       image: productInfo.img,
                      //       badge: productInfo.badge,
                      //       price: productInfo.price,
                      //       colors: productInfo.color,
                      //     })
                      //   )
                      // }
                      className="w-full py-4 bg-blue-500 hover:bg-blue-600 duration-300 text-white text-lg font-titleFont"
                    >
                      Add to Cart
                    </button>
                  </>
                )}
              </>
            </div>
          </div>

          {/* Button Column */}
          {/* <div className='h-full w-full md:col-span-1 xl:col-span-1 flex items-start justify-end'>
            {user && (
              <div className='flex space-x-2'>
                {startEdit ? (
                  <>
                    <button
                      onClick={handleCancelEdit}
                      className='flex items-center p-2 bg-white text-black rounded cursor-pointer shadow-md hover:bg-gray-300 transition duration-300'
                    >
                      <NoSymbolIcon
                        className='block h-6 w-6 mr-1'
                        aria-hidden='true'
                      />
                      <span className='font-bold'>Annuler</span>
                    </button>
                    <button
                      className='flex items-center p-2 bg-blue-500 text-white rounded cursor-pointer shadow-md hover:bg-blue-600 transition duration-300'
                      onClick={handleSubmit}
                    >
                      <DocumentCheckIcon
                        className='block h-6 w-6 mr-1'
                        aria-hidden='true'
                      />
                      <span className='font-bold'>Sauvegarder</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleEditClick}
                      className='flex items-center p-2 bg-white text-black rounded cursor-pointer shadow-md hover:bg-gray-300 transition duration-300'
                    >
                      <AdjustmentsVerticalIcon
                        className='block h-6 w-6 mr-1'
                        aria-hidden='true'
                      />
                      <span className='font-bold'>Edit product</span>
                    </button>
                    <button
                      className='flex items-center p-2 bg-blue-500 text-white rounded cursor-pointer shadow-md hover:bg-blue-600 transition duration-300'
                      //onClick={handleDelete} // Assuming you have a delete handler function
                    >
                      <TrashIcon
                        className='block h-6 w-6 mr-1'
                        aria-hidden='true'
                      />
                      <span className='font-bold'>Delete product</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div> */}
        </div>

        <div>
          {availableTabs.length > 0 && (
            <div>
              <div className=" space-x-4  pt-4">
                {availableTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    } py-2 px-4  focus:outline-none`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="my-2">
                {availableTabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={activeTab === tab.id ? '' : 'hidden'}
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
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
