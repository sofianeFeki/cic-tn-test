import React, { useState } from 'react';
import ProductForm from '../../components/forms/productForm';
import { productCreate } from '../../functions/product';
import { toast } from 'react-toastify';

const initialState = {
  Title: '',
  Description: '',
  Price: 0,
  Image: '',
  Quantity: 0,
  sold:0,
  color: '',
  Brand: '',
  Category: '',
  subCategory: '',
  ficheTech: [{ label: '', value: '' }],
  pdf: '',
  video: '',
};

const ProductCreate = () => {
  const [product, setProduct] = useState(initialState);
  const [startEdit, setStartEdit] = useState(true);
  const [imagePreview, setImagePreview] = useState(''); // State for image preview
  const [videoPreview, setVideoPreview] = useState(''); // State for video preview
  const [pdfPreview, setPdfPreview] = useState(''); // State for PDF preview
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Append all fields except 'ficheTech', 'pdf', 'video', and 'Image'
    for (const key in product) {
      if (
        key !== 'ficheTech' &&
        key !== 'pdf' &&
        key !== 'video' &&
        key !== 'Image'
      ) {
        formData.append(key, product[key]);
      }
    }

    formData.append('ficheTech', JSON.stringify(product.ficheTech));

    // Append the image file if it exists and 'Image' field isn't already appended
    if (product.imageFile && !formData.has('imageFile')) {
      formData.append('imageFile', product.imageFile);
    }

    // Append 'pdf' and 'video' if they exist
    if (product.pdf) formData.append('pdf', product.pdf);
    if (product.video) formData.append('video', product.video);

    try {
      const res = await productCreate(formData);
      console.log('Response:', res);
      toast.success(`"${res.data.Title}" is created`);
      //window.location.reload();
    } catch (err) {
      toast.error(err.response.data.err);
    }
    setLoading(false);
  };

  return (
    <>
      <ProductForm
        product={product}
        setProduct={setProduct}
        handleSubmit={handleSubmit}
        startEdit={startEdit}
        imagePreview={imagePreview} // Pass imagePreview to the form
        setImagePreview={setImagePreview} // Pass setImagePreview to the form
        videoPreview={videoPreview} // Pass videoPreview to the form
        setVideoPreview={setVideoPreview} // Pass setVideoPreview to the form
        pdfPreview={pdfPreview} // Pass pdfPreview to the form
        setPdfPreview={setPdfPreview} // Pass setPdfPreview to the form
        loading={loading}
      />
    </>
  );
};

export default ProductCreate;
