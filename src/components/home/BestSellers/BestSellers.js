import React, { useEffect, useState } from 'react';
import Heading from '../Products/Heading';
import Product from '../Products/Product';
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
  IMPRIMANTE_PANTUM_M6609N,
  IMPRIMANTE_PANTUM_BP5100DN,
  IMPRIMANTE_PANTUM_BM5100FDW,
  IMPRIMANTE_PANTUM_CP2200DW,
  CP2200DW,
  BM5100,
  BP5100DN,
  M6609N,
  PUNTUM,
  imageNotFound,
} from '../../../assets/images/index';
import { getBestSellers } from '../../../functions/product';

const BestSellers = () => {
  const [products, setProducts] = useState([{}, {}, {}, {}]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(4);

  const preloadImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ url, success: true });
      img.onerror = () => resolve({ url, success: false });
    });
  };

  const handleBestSellers = async () => {
    setLoading(true);
    try {
      const res = await getBestSellers(limit);
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
      console.error('Failed to fetch best sellers:', err);
      // Optionally, you can set an error state to display a message to the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleBestSellers();
  }, []);
  return (
    <div className="w-full pb-20">
      <Heading heading="Meilleures ventes" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10 drop-shadow-xl ">
        {products.map((item) => (
          <Product
            key={item._id} // Add unique key prop here
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
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
