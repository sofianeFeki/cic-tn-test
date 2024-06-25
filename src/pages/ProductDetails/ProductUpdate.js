import React, { useEffect, useState } from "react";
import ProductForm from "../../components/forms/productForm";
import { useParams, useLocation } from "react-router-dom";
import { getProduct, updateProduct } from "../../functions/product";
import { toast } from "react-toastify";

const initialState = {
  Title: "",
  Description: "",
  Price: 0,
  Image: "",
  Quantity: 0,
  color: "",
  Brand: "",
  Category: "",
  subCategory: "",
  ficheTech: [{ label: "", value: "" }],
  pdf: "",
  video: "",
};

const ProductUpdate = () => {
  const { slug } = useParams();
  const location = useLocation();
  const productFromState = location.state?.product || initialState;
  const [product, setProduct] = useState(productFromState);
  const [startEdit, setStartEdit] = useState(true);

  useEffect(() => {
    if (product) {
      getProduct(slug).then((res) => {
        setProduct(res.data);
        if (res.data.Image) {
          const imageUrl = `http://localhost:8000${res.data.Image.replace(
            /\\/g,
            "/"
          )}`;
          setProduct((prevProduct) => ({
            ...prevProduct,
            Image: imageUrl,
          }));
        } else {
          // Handle the case when there is no image
          setProduct(null); // or set to a default image
        }
      });
    }
  }, [slug, location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append all fields except 'ficheTech', 'pdf', 'video', and 'Image'
    for (const key in product) {
      if (
        key !== "ficheTech" &&
        key !== "pdf" &&
        key !== "video" &&
        key !== "Image"
      ) {
        formData.append(key, product[key]);
      }
    }

    formData.append("ficheTech", JSON.stringify(product.ficheTech));

    // Append the image file if it exists and 'Image' field isn't already appended
    if (product.imageFile && !formData.has("imageFile")) {
      formData.append("imageFile", product.imageFile);
    }

    // Append 'pdf' and 'video' if they exist
    if (product.pdf) formData.append("pdf", product.pdf);
    if (product.video) formData.append("video", product.video);

    // Append the image file to formData
    if (product.imageFile === null) {
      formData.append("imageFile", null);
    } else if (product.newImageFile) {
      formData.append("imageFile", product.newImageFile);
    }
    try {
      // Update the product
      const res = await updateProduct(slug, formData);
      toast.success(`"${res.data.Title}" is updated`);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.err);
    }
  };

  return (
    <>
      <ProductForm
        product={product}
        setProduct={setProduct}
        handleSubmit={handleSubmit}
        startEdit={startEdit}
      />
    </>
  );
};

export default ProductUpdate;
