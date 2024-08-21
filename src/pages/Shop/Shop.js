import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import Pagination from '../../components/pageProps/shopPage/Pagination';
import ProductBanner from '../../components/pageProps/shopPage/ProductBanner';
import ShopSideNav from '../../components/pageProps/shopPage/ShopSideNav';
import { getProducts } from '../../functions/product';
import { imageNotFound } from '../../assets/images';

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sort, setSort] = useState('');
  const [itemOffset, setItemOffset] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const [products, setProducts] = useState([{}, {}, {}, {}, {}, {}]);
  const [loading, setLoading] = useState(false);

  const filters = useSelector((state) => state.orebi.filters);

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const sortFromBanner = (sort) => {
    setSort(sort);
  };
  const preloadImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve({ url, success: true });
      img.onerror = () => resolve({ url, success: false });
    });
  };

  const gettheProducts = async (page, sort, itemsPerPage, filters) => {
    setLoading(true);
    try {
      const res = await getProducts(page, sort, itemsPerPage, filters);
      const productData = res.data.products;
      const baseUrl = 'https://cic-server-ygl9.onrender.com';

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
    } catch (error) {
      console.error('Failed to fetch products', error);
      // Optionally, you can set an error state to display a message to the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = Math.floor(itemOffset / itemsPerPage) + 1;
    gettheProducts(page, sort, itemsPerPage, filters);
  }, [itemOffset, sort, itemsPerPage, filters]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <div className=" bg-gray-100 ">
      <div className="max-w-container  mx-auto px-4">
        <Breadcrumbs title="Produits" />
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

export default Shop;
