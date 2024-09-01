import axios from 'axios';

export const getbrands = async () =>
  await axios.get('http://localhost:8000/api/brands');

export const getbrand = async (slug) =>
  await axios.get(`http://localhost:8000/api/brand/${slug}`);

export const removebrand = async (slug) =>
  await axios.delete(`http://localhost:8000/api/brand/${slug}`, {});

export const updatebrand = async (slug, brand) =>
  await axios.put(`http://localhost:8000/api/brand/${slug}`, { brand });

export const createbrand = async (brand) =>
  await axios.post(`http://localhost:8000/api/brand`, { brand });
