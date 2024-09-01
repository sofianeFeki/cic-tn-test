import axios from 'axios';

export const getbrands = async () =>
  await axios.get('https://cic-server-ygl9.onrender.com/api/brands');

export const getbrand = async (slug) =>
  await axios.get(`https://cic-server-ygl9.onrender.com/api/brand/${slug}`);

export const removebrand = async (slug) =>
  await axios.delete(`https://cic-server-ygl9.onrender.com/api/brand/${slug}`, {});

export const updatebrand = async (slug, brand) =>
  await axios.put(`https://cic-server-ygl9.onrender.com/api/brand/${slug}`, { brand });

export const createbrand = async (brand) =>
  await axios.post(`https://cic-server-ygl9.onrender.com/api/brand`, { brand });
