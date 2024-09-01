import axios from 'axios';

export const getSubs = async () =>
  await axios.get('https://cic-server-ygl9.onrender.com/api/subs');

export const getSub = async (slug) =>
  await axios.get(`https://cic-server-ygl9.onrender.com/api/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`https://cic-server-ygl9.onrender.com/api/sub/${slug}`, {});

export const updateSub = async (slug, sub, authtoken) =>
  await axios.put(`https://cic-server-ygl9.onrender.com/api/sub/${slug}`, sub, {});

export const createSub = async (sub, authtoken) =>
  await axios.post(`https://cic-server-ygl9.onrender.com/api/sub`, { sub });
