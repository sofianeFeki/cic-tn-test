import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const productCreate = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return await axios.post(
    'https://cic-server-ygl9.onrender.com/api/product/create',
    formData,
    config
  );
};

export const getProduct = async (slug) =>
  await axios.get(`https://cic-server-ygl9.onrender.com/api/product/${slug}`);

export const updateProduct = async (slug, formData) =>
  await axios.put(
    `https://cic-server-ygl9.onrender.com/api/admin/product-update/${slug}`,
    formData
  );

export const getProducts = async (page, sort, itemsPerPage, filters = {}) =>
  await axios.post(`https://cic-server-ygl9.onrender.com/products`, {
    page,
    itemsPerPage,
    sort,
    filters,
  });

export const removeProduct = async (slug) =>
  await axios.delete(`https://cic-server-ygl9.onrender.com/api/product/${slug}`, {});

export const searchProducts = async (query) =>
  await axios.get(`https://cic-server-ygl9.onrender.com/api/products/search/${query}`);

export const getProductsByCategory = async (category) => {
  return await axios.get(
    `https://cic-server-ygl9.onrender.com/api/products/category/${category}`
  );
};

export const getNewArrivals = async (limit) =>
  await axios.get(`https://cic-server-ygl9.onrender.com/api/products/newArrivals/${limit}`);
export const getBestSellers = async (limit) =>
  await axios.get(`https://cic-server-ygl9.onrender.com/api/products/bestSellers/${limit}`);
