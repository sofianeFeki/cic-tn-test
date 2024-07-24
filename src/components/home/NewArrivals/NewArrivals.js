import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Heading from '../Products/Heading';
import Product from '../Products/Product';
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
  ricoh1,
  espson1,
  ricoh2,
  ricoh3,
  ricoh4,
  ricoh5,
  IMPRIMANTE_RICOH_P501,
  IMPRIMANTE_RICOH_SP4520DN,
  IMPRIMANTE_RICOH_SP3710DN,
  IMPRIMANTE_COULEUR_LASER_SPC840,
  IMPRIMANTE_RICOH_SP4510DN,
} from '../../../assets/images/index';
import SampleNextArrow from './SampleNextArrow';
import SamplePrevArrow from './SamplePrevArrow';
import { getNewArrivals } from '../../../functions/product';



const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);

  const handleNewArrivals = async (e) => {
    setLoading(true);
    try {
      getNewArrivals(limit).then((res) => {
        const productData = res.data.products;
        const baseUrl = 'https://cic-server-ygl9.onrender.com';

        const formatUrl = (path) => `${baseUrl}${path.replace(/\\/g, '/')}`;

        if (productData.Image) {
          productData.Image = formatUrl(productData.Image);
        }
        if (productData.video) {
          productData.video = formatUrl(productData.video);
        }
        if (productData.pdf) {
          productData.pdf = formatUrl(productData.pdf);
        }

        setProducts(productData);
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    handleNewArrivals();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16">
      <Heading heading="Dernières Nouveautés" />
      <Slider {...settings}>
        {products.map((item) => (
          <div className="px-2" key={item._id}>
            <div className="w-full drop-shadow-xl gap-10 ">
              <Product
                _id={item._id}
                img={`https://cic-server-ygl9.onrender.com${item.Image}`}
                productName={item.Title}
                price={item.price}
                color={item.color}
                badge={item.badge}
                des={item.Description}
                pdf={item.pdf}
                ficheTech={item.ficheTech}
                video={item.video}
                slug={item.slug}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
