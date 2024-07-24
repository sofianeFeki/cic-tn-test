import React, { useEffect, useState } from 'react';
import Heading from '../Products/Heading';
import Product from '../Products/Product';
import { paginationItems } from '../../../constants';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleBrand, toggleColor } from '../../../redux/orebiSlice';
import { getProductsByCategory } from '../../../functions/product';

const CategoryPage = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await getProductsByCategory(category);
        const productData = res.data;

        const baseUrl = 'https://cic-server-ygl9.onrender.com';
        const formatUrl = (path) => `${baseUrl}${path.replace(/\\/g, '/')}`;

        productData.forEach((product) => {
          if (product.Image) product.Image = formatUrl(product.Image);
          if (product.video) product.video = formatUrl(product.video);
          if (product.pdf) product.pdf = formatUrl(product.pdf);
        });

        setProducts(productData);
        console.log('Product data loaded:', productData);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <div className="w-full pb-20">
      <Heading heading="Special Offers" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
        {products.map((data) => (
          <Product
            key={data._id}
            _id={data._id}
            img={data.Image}
            productName={data.Title}
            price={data.price}
            color={data.color}
            // badge={true}
            des={data.Description}
            ficheTech={data.ficheTech}
            video={data.video}
            slug={data.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
