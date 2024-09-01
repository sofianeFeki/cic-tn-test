import axios from 'axios';

export const getCategories = async () =>
  await axios.get('https://cic-server-ygl9.onrender.com/api/categories');

export const getCategory = async (slug) =>
  await axios.get(`https://cic-server-ygl9.onrender.com/api/category/${slug}`);

export const removeCategory = async (slug) =>
  await axios.delete(`https://cic-server-ygl9.onrender.com/api/category/${slug}`, {});

export const updateCategory = async (slug, category) =>
  await axios.put(`https://cic-server-ygl9.onrender.com/api/category/${slug}`, category, {});

export const createCategory = async (category) =>
  await axios.post(`https://cic-server-ygl9.onrender.com/api/category`, { category });

export const getCategorySubs = async (_id) =>
  await axios.get(`https://cic-server-ygl9.onrender.com/api/category/subs/${_id}`);
