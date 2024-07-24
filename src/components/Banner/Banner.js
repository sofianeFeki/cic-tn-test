import React, { useState } from 'react';
import Slider from 'react-slick';
import { bannerImg1, bannerImg2, bannerImg3 } from '../../assets/images';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'tailwindcss/tailwind.css';
import { CameraIcon } from '@heroicons/react/24/outline';

const CustomSlide = ({ imgSrc, openModal }) => (
  <div className="relative">
    <img src={imgSrc} alt="Slide" className="w-full h-76 object-cover" />
    <button
      className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white py-1 px-3"
      onClick={openModal}
    >
      Change Photo
    </button>
  </div>
);

const Modal = ({
  isOpen,
  onClose,
  images,
  onImageChange,
  onImageDelete,
  onImageAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg relative w-11/12 max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Manage Photos</h2>
        <div className="space-y-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.imgSrc}
                alt={`Slide ${index}`}
                className="w-full h-auto object-cover border-2 border-black"
              />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded"
                onClick={() => onImageDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="flex bg-green-500 text-white w-1/2  p-2 rounded cursor-pointer shadow-md hover:bg-green-600 transition duration-300">
            <CameraIcon className="block h-6 w-6 mr-1" aria-hidden="true" />
            <span className="font-bold">Ajouter une photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={onImageAdd}
              className="hidden"
            />
          </label>
        </div>
        <div className="flex justify-end mt-4 space-x-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const Banner = () => {
  const [images, setImages] = useState([
    { imgSrc: bannerImg1 },
    { imgSrc: bannerImg2 },
    { imgSrc: bannerImg3 },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImages = [...images];
        updatedImages[index].imgSrc = reader.result;
        setImages(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleImageAdd = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImage = { imgSrc: reader.result };
        setImages([...images, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    fade: true,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          adaptiveHeight: true,
        },
      },
    ],
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-screen-2xl mx-6 shadow-testShadow rounded-lg">
        <Slider {...settings}>
          {images.map((slide, index) => (
            <CustomSlide
              key={index}
              imgSrc={slide.imgSrc}
              openModal={openModal}
            />
          ))}
        </Slider>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        images={images}
        onImageChange={handleImageChange}
        onImageDelete={handleImageDelete}
        onImageAdd={handleImageAdd}
      />
    </div>
  );
};

export default Banner;
