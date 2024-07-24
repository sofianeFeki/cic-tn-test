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
} from '../../../assets/images/index';
import { getBestSellers } from '../../../functions/product';



const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(4);

  const handleBestSellers = async (e) => {
    setLoading(true);
    try {
      getBestSellers(limit).then((res) => {
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
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
