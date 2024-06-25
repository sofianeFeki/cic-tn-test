import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const productCreate = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.post(
    "http://localhost:8000/api/product/create",
    formData,
    config
  );
};

export const getProduct = async (slug) =>
  await axios.get(`http://localhost:8000/api/product/${slug}`);

export const updateProduct = async (slug, formData) =>
  await axios.put(
    `http://localhost:8000/api/admin/product-update/${slug}`,
    formData
  );
