import axios from 'axios';

export const getCategories = async () =>
  await axios.get('http://localhost:8000/api/categories');

export const getCategory = async (slug) =>
  await axios.get(`http://localhost:8000/api/category/${slug}`);

export const removeCategory = async (slug) =>
  await axios.delete(`http://localhost:8000/api/category/${slug}`, {});

export const updateCategory = async (slug, category) =>
  await axios.put(`http://localhost:8000/api/category/${slug}`, category, {});

export const createCategory = async (category) =>
  await axios.post(`http://localhost:8000/api/category`, { category });

export const getCategorySubs = async (_id) =>
  await axios.get(`http://localhost:8000/api/category/subs/${_id}`);
