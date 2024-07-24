import React, { useEffect, useState } from 'react';
import ProductForm from '../../components/forms/productForm';
import { useLocation, useParams } from 'react-router-dom';
import { getProduct } from '../../functions/product';

const initialState = {
  Title: '',
  Description: '',
  Price: 0,
  Image: '',
  Quantity: 0,
  sold:0,
  color: '',
  Brand: '',
  Category: '',
  subCategory: '',
  ficheTech: [{ label: '', value: '' }],
  pdf: '',
  video: '',
};

const ProductUpdate = () => {
  const { slug } = useParams();
  const location = useLocation();
  const productFromState = location.state?.product || initialState;
  const [product, setProduct] = useState(productFromState);
  const [startEdit, setStartEdit] = useState(false);

  const gettheProduct = () => {
    getProduct(slug).then((res) => {
      const productData = res.data;
      const baseUrl = 'http://localhost:8000';

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

      setProduct(productData);
      console.log(productData, 'Product data loaded');
    });
  };
  useEffect(() => {
    gettheProduct();
  }, [slug]);

  return (
    <>
      <ProductForm
        product={product}
        setProduct={setProduct}
        startEdit={startEdit}
        setStartEd={setStartEdit}
      />
    </>
  );
};

export default ProductUpdate;
