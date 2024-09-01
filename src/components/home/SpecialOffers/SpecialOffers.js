import React, { useEffect, useState } from 'react';
import Heading from '../Products/Heading';
import Product from '../Products/Product';
import { paginationItems } from '../../../constants';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleBrand, toggleColor } from '../../../redux/orebiSlice';
import { getProductsByCategory } from '../../../functions/product';
import Pagination from '../../pageProps/shopPage/Pagination';
import ProductBanner from '../../pageProps/shopPage/ProductBanner';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { imageNotFound } from '../../../assets/images';

const preloadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve({ url, success: true });
    img.onerror = () => resolve({ url, success: false });
  });
};

const CategoryPage = () => {
  const { category } = useParams();
  const viewMode = useSelector((state) => state.orebi.viewMode);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sort, setSort] = useState('');
  const [itemOffset, setItemOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const filters = useSelector((state) => state.orebi.filters);

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const sortFromBanner = (sort) => {
    setSort(sort);
  };

  const fetchProductsByCategory = async (
    category,
    page,
    sort,
    itemsPerPage,
    filters
  ) => {
    setLoading(true);
    try {
      const res = await getProductsByCategory(
        category,
        page,
        sort,
        itemsPerPage,
        filters
      );
      const productData = res.data.products;

      const baseUrl = 'http://localhost:8000';
      const formatUrl = (path) => `${baseUrl}${path.replace(/\\/g, '/')}`;

      const formattedProducts = await Promise.all(
        productData.map(async (product) => {
          const formattedProduct = { ...product };
          const imageUrl = formatUrl(product.Image || '');
          const videoUrl = formatUrl(product.video || '');
          const pdfUrl = formatUrl(product.pdf || '');

          // Preload image and update the URL based on its loading status
          const { success } = await preloadImage(imageUrl);
          formattedProduct.Image = success ? imageUrl : imageNotFound;
          formattedProduct.video = product.video ? videoUrl : null;
          formattedProduct.pdf = product.pdf ? pdfUrl : null;

          return formattedProduct;
        })
      );

      setProducts(formattedProducts);
      setTotalPages(res.data.totalPages);
      setTotalProducts(res.data.totalProducts);
      console.log('Product data loaded:', productData);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(products, '=============>');
    const page = Math.floor(itemOffset / itemsPerPage) + 1;
    fetchProductsByCategory(category, page, sort, itemsPerPage, filters);
  }, [category, itemOffset, sort, itemsPerPage, filters]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <div className="w-full pb-20 ">
      <ProductBanner
        itemsPerPageFromBanner={itemsPerPageFromBanner}
        sortFromBanner={sortFromBanner}
      />

      <div className="mt-10">
        {products && products.length > 0 ? (
          <Pagination
            itemsPerPage={itemsPerPage}
            products={products}
            totalPages={totalPages}
            totalProducts={totalProducts}
            handlePageClick={handlePageClick}
            itemOffset={itemOffset}
            loading={loading}
          />
        ) : (
          <h2 className="flex text-xl pt-4 font-semibold text-gray-700">
            <ExclamationTriangleIcon className="h-6 w-6 mx-1 text-yellow-400" />
            Aucun produit trouvé dans la catégorie "{category}" avec les filtres
            appliqués
          </h2>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
