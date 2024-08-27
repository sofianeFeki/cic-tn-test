import React, { useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import BannerBottom from '../../components/Banner/BannerBottom';
import BestSellers from '../../components/home/BestSellers/BestSellers';
import NewArrivals from '../../components/home/NewArrivals/NewArrivals';
import Sale from '../../components/home/Sale/Sale';
import YearProduct from '../../components/home/YearProduct/YearProduct';
import { useDispatch } from 'react-redux';
import { setFilter, setViewMode } from '../../redux/orebiSlice';
import { homeBg } from '../../assets/images';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setViewMode('grid'));
    dispatch(setFilter());
  }, [dispatch]);

  return (
    <div className="w-full mx-auto  relative">
      <div
        className="fixed w-full h-full top-0 left-0 z-[-50] "
        style={{
          backgroundImage: `url(${homeBg})`, // Correct way to set the background image
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.7, // Adjust the opacity value
        }}
      ></div>
      <div className="relative min-h-screen">
        <Banner />
        <BannerBottom />
        <div className="max-w-container mt-6 mx-auto px-4">
          <NewArrivals />
          <Sale />
          <BestSellers />
          <YearProduct />
        </div>
      </div>
    </div>
  );
};

export default Home;
