import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const productCreate = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return await axios.post(
    'http://localhost:8000/api/product/create',
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
  await axios.post(`${API_BASE_URL}/products`, {
    page,
    itemsPerPage,
    sort,
    filters,
  });

export const removeProduct = async (slug) =>
  await axios.delete(
    `https://cic-server-ygl9.onrender.com/api/product/${slug}`,
    {}
  );

export const searchProducts = async (
  query,
  page,
  sort,
  itemsPerPage,
  filters = {}
) =>
  await axios.post(`http://localhost:8000/api/products/search/${query}`, {
    page,
    itemsPerPage,
    sort,
    filters,
  });

export const getProductsByCategory = async (
  category,
  page,
  sort,
  itemsPerPage,
  filters = {}
) => {
  return await axios.post(
    `http://localhost:8000/api/products/category/${category}`,
    {
      page,
      itemsPerPage,
      sort,
      filters,
    }
  );
};

export const getNewArrivals = async (limit) =>
  await axios.get(
    `https://cic-server-ygl9.onrender.com/api/products/newArrivals/${limit}`
  );
export const getBestSellers = async (limit) =>
  await axios.get(
    `https://cic-server-ygl9.onrender.com/api/products/bestSellers/${limit}`
  );
export const getProductTitlesByCategories = async () => {
  return await axios.get(
    'https://cic-server-ygl9.onrender.com/api/products/titles'
  );
};

export const getProductByTitle = async (title) => {
  return await axios.get(
    `https://cic-server-ygl9.onrender.com/api/products/title/${title}`
  );
};

export const saveProductOfTheYear = (productTitle) => {
  return axios.post('http://localhost:8000/api/products/saveProductOfTheYear', {
    title: productTitle,
  });
};

export const getProductOfTheYear = async () => {
  return await axios.get(`${API_BASE_URL}/products/productOfTheYear`);
};
