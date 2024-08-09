import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Heading from '../Products/Heading';
import Product from '../Products/Product';
import SampleNextArrow from './SampleNextArrow';
import SamplePrevArrow from './SamplePrevArrow';
import { getNewArrivals } from '../../../functions/product';
import { imageNotFound } from '../../../assets/images';

const NewArrivals = () => {
  const [products, setProducts] = useState([{}, {}, {}, {}, {}, {}]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);

  const preloadImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ url, success: true });
      img.onerror = () => resolve({ url, success: false });
    });
  };

  const handleNewArrivals = async () => {
    setLoading(true);
    try {
      const res = await getNewArrivals(limit);
      const productData = res.data.products;
      const baseUrl = 'http://localhost:8000';

      const formatUrl = (path) => `${baseUrl}${path.replace(/\\/g, '/')}`;

      const formattedProducts = await Promise.all(
        productData.map(async (product) => {
          const formattedProduct = { ...product };
          const imageUrl = formatUrl(product.Image || '');
          const videoUrl = formatUrl(product.video || '');
          const pdfUrl = formatUrl(product.pdf || '');

          // Preload image and update the URL based on its loading status
          const { success } = await preloadImage(imageUrl);
          formattedProduct.Image = success ? imageUrl : imageNotFound;
          formattedProduct.video = product.video ? videoUrl : null;
          formattedProduct.pdf = product.pdf ? pdfUrl : null;

          return formattedProduct;
        })
      );

      setProducts(formattedProducts);
    } catch (err) {
      console.error('Failed to fetch new arrivals:', err);
      // Optionally, you can set an error state to display a message to the user
    } finally {
      setLoading(false);
    }
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
    <div className="w-full">
      <Heading heading="Dernières Nouveautés" />
      <Slider {...settings}>
        {products.map((item) => (
          <div className="px-4 py-4" key={item._id}>
            <div className="w-full drop-shadow-xl gap-10 ">
              <Product
                _id={item._id}
                img={item.Image}
                productName={item.Title}
                price={item.price}
                color={item.color}
                badge={item.badge}
                des={item.Description}
                pdf={item.pdf}
                ficheTech={item.ficheTech}
                video={item.video}
                slug={item.slug}
                loading={loading}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
