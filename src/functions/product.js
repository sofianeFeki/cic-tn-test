import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const productCreate = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.post(
    "https://cic-server-ygl9.onrender.com/api/product/create",
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

export const getProducts = async () =>
  await axios.get("https://cic-server-ygl9.onrender.com/api/products", {});
