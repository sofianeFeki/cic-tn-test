import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'tailwindcss/tailwind.css';
import {
  CameraIcon,
  DocumentCheckIcon,
  NoSymbolIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import {
  createSliderImage,
  getSliderImages,
  removeSliderImage,
} from '../../functions/slider';
import { useSelector } from 'react-redux';

const CustomSlide = ({ image, openModal, user }) => (
  <div className="relative z-99">
    <img src={image} alt="Slide" className="w-full h-76 object-cover" />
    {user && (
      <button
        className="flex z-1 bg-white bg-opacity-90 text-black p-2 rounded cursor-pointer shadow-testShadow absolute bottom-2 right-2 hover:bg-opacity-100"
        onClick={openModal}
      >
        <CameraIcon className="block h-6 w-6 mr-1" aria-hidden="true" />
        <span className="font-bold">Ajouter une photo</span>
      </button>
    )}
  </div>
);

const Modal = ({
  isOpen,
  onClose,
  images,
  onImageChange,
  onImageDelete,
  onImageAdd,
  onSave,
  user,
}) => {
  useEffect(() => {
    // Block scrolling when the modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      // Ensure scrolling is reset when the component is unmounted
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    user && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg relative w-11/12 max-w-lg mx-auto overflow-y-auto max-h-full">
          <h2 className="text-xl font-semibold mb-4">Manage Photos</h2>
          <div className="space-y-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.image}
                  alt={`Slide ${index}`}
                  className="w-full h-auto object-cover border-2 border-black"
                />

                <button
                  className="flex items-center absolute top-2 right-2 p-1 bg-white  text-red-500 rounded cursor-pointer drop-shadow-xl hover:bg-gray-100 transition duration-300"
                  onClick={() => onImageDelete(image._id)}
                >
                  <TrashIcon className="block h-4 w-4 " aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <input
              type="file"
              onChange={onImageAdd}
              className="border border-gray-300 p-2 w-full"
            />
          </div>
          <div className="flex justify-end mt-4 space-x-4">
            <button
              onClick={onClose}
              className="flex items-center p-2 bg-white text-black rounded cursor-pointer shadow-md hover:bg-gray-300 transition duration-300"
            >
              <NoSymbolIcon className="block h-6 w-6 mr-1" aria-hidden="true" />
              <span className="font-bold">Annuler</span>
            </button>
            <button
              className="flex items-center p-2 bg-blue-500 text-white rounded cursor-pointer shadow-md hover:bg-blue-600 transition duration-300"
              onClick={onSave}
            >
              <DocumentCheckIcon
                className="block h-6 w-6 mr-1"
                aria-hidden="true"
              />
              <span className="font-bold">Sauvegarder</span>
            </button>
          </div>
        </div>
      </div>
    )
  );
};

const Banner = () => {
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingImages, setPendingImages] = useState([...images]);
  const user = useSelector((state) => state.orebi.userInfo);

  const openModal = () => {
    setPendingImages([...images]);
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
        const updatedImages = [...pendingImages];
        updatedImages[index].imgSrc = reader.result;
        setPendingImages(updatedImages);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await getSliderImages();
        const formattedImages = response.data.map((image) => {
          const imageUrl = `http://localhost:8000${image.image.replace(
            /\\/g,
            '/'
          )}`;
          console.log('Formatted Image URL:', imageUrl); // Log to verify URL
          return { ...image, image: imageUrl };
        });
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching slider images:', error);
      }
    };
    fetchSliderImages();
  }, []);

  const handleImageDelete = async (id) => {
    try {
      await removeSliderImage(id);
      setPendingImages(pendingImages.filter((image) => image._id !== id));
      setImages(images.filter((image) => image._id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleImageAdd = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('sliderImage', file);

      try {
        const response = await createSliderImage(formData);
        setPendingImages([...pendingImages, response.data]);
      } catch (error) {
        console.error('Error adding image:', error);
      }
    }
  };
  const handleSave = () => {
    setImages([...pendingImages]);
    closeModal();
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
    customHeight: '36rem', // Height for mobile screens

    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          adaptiveHeight: true,
          customHeight: '36rem', // Height for mobile screens
        },
      },
    ],
  };

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full h-76 max-w-screen-2xl z-1 mx-6 shadow-testShadow rounded-lg">
        <Slider {...settings}>
          {images.map((slide, index) => (
            <CustomSlide
              key={index}
              image={slide.image}
              openModal={openModal}
              user={user}
            />
          ))}
        </Slider>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        images={pendingImages}
        onImageChange={handleImageChange}
        onImageDelete={handleImageDelete}
        onImageAdd={handleImageAdd}
        onSave={handleSave}
        user={user}
      />
    </div>
  );
};

export default Banner;
