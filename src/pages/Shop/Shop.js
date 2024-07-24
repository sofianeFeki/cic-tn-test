import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import Pagination from '../../components/pageProps/shopPage/Pagination';
import ProductBanner from '../../components/pageProps/shopPage/ProductBanner';
import ShopSideNav from '../../components/pageProps/shopPage/ShopSideNav';
import { getProducts } from '../../functions/product';

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

  const gettheProducts = (page, sort, itemsPerPage, filters) => {
    setLoading(true);
    getProducts(page, sort, itemsPerPage, filters)
      .then((res) => {
        const productData = res.data.products;
        const baseUrl = 'https://cic-server-ygl9.onrender.com';

        const formatUrl = (path) => `${baseUrl}${path.replace(/\\/g, '/')}`;

        productData.forEach((product) => {
          if (product.Image) {
            product.Image = formatUrl(product.Image);
          }
          if (product.video) {
            product.video = formatUrl(product.video);
          }
          if (product.pdf) {
            product.pdf = formatUrl(product.pdf);
          }
        });

        setProducts(productData);
        setTotalPages(res.data.totalPages);
        setTotalProducts(res.data.totalProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch products', error);
        setLoading(false); // setLoading should be false in case of error
      });
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
    <div className="max-w-container mx-auto px-4">
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
  );
};

export default Shop;
