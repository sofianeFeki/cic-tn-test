// src/pages/SearchResults/SearchResults.js

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import ShopSideNav from '../../components/pageProps/shopPage/ShopSideNav';
import ProductBanner from '../../components/pageProps/shopPage/ProductBanner';
import Pagination from '../../components/pageProps/shopPage/Pagination';
import { searchProducts } from '../../functions/product';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/orebiSlice';
import { imageNotFound } from '../../assets/images';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sort, setSort] = useState('');
  const [itemOffset, setItemOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);

  const dispatch = useDispatch();

  const preloadImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ url, success: true });
      img.onerror = () => resolve({ url, success: false });
    });
  };

  useEffect(() => {
    dispatch(setFilter());
  }, [dispatch]);

  const filters = useSelector((state) => state.orebi.filters);

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const sortFromBanner = (sort) => {
    setSort(sort);
  };

  const fetchProducts = async (query, page, sort, itemsPerPage, filters) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const res = await searchProducts(
        query,
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
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = Math.floor(itemOffset / itemsPerPage) + 1;
    fetchProducts(query, page, sort, itemsPerPage, filters);
  }, [query, itemOffset, sort, itemsPerPage, filters]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };
  return (
    // <div className="container mx-auto mt-5">
    //   <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
    //   {/* Add your search results logic here */}
    // </div>
    <div className=" bg-gray-100 ">
      <div className="max-w-container  mx-auto px-4">
        <Breadcrumbs title={`Search Results for "${query}"`} />
        <div className="w-full h-full flex pb-20 gap-10">
          <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
            <ShopSideNav />
          </div>
          <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
            <ProductBanner
              itemsPerPageFromBanner={itemsPerPageFromBanner}
              sortFromBanner={sortFromBanner}
            />
            <Pagination
              itemsPerPage={itemsPerPage}
              products={products}
              totalPages={totalPages}
              totalProducts={totalProducts}
              handlePageClick={handlePageClick}
              itemOffset={itemOffset}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
