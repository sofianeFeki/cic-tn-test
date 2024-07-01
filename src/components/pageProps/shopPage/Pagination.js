import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import { paginationItems } from "../../../constants";
import { getProducts } from "../../../functions/product";
import { useLocation, useParams } from "react-router-dom";

const items = paginationItems;

const Pagination = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [endOffset, setEndOffset] = useState(itemsPerPage);
  const [loding, setLoading] = useState(false);
  const location = useLocation();

  const productFromState = location.state.product;
  const [product, setProduct] = useState(productFromState);

  const gettheProducts = () => {
    getProducts().then((res) => {
      const productData = res.data;
      const baseUrl = "http://localhost:8000";

      const formatUrl = (path) => `${baseUrl}${path.replace(/\\/g, "/")}`;

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

      setProduct(productData);
      console.log(productData, "Product data loaded");
    });
  };

  useEffect(() => {
    gettheProducts();
    // console.log(product, "-------------------------- img url");
  }, []);

  // const selectedBrands = useSelector((state) => state.orebi.checkedBrands);
  // const selectedCategories = useSelector(
  //   (state) => state.orebi.checkedCategorys
  // );
  // const selectedColors = useSelector((state) => state.orebi.checkedColors);

  // // Filter items based on selected filters
  // const filteredItems = product.filter((item) => {
  //   const isBrandSelected =
  //     selectedBrands.length === 0 ||
  //     selectedBrands.some((brand) => brand.title === item.brand);

  //   const isCategorySelected =
  //     selectedCategories.length === 0 ||
  //     selectedCategories.some((category) => category.title === item.cat);

  //   const isColorSelected =
  //     selectedColors.length === 0 ||
  //     selectedColors.some((color) => color.title === item.color);

  //   return isBrandSelected && isCategorySelected && isColorSelected;
  // });

  // const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  // useEffect(() => {
  //   // Initialize values when the component mounts
  //   const initialOffset = 0;
  //   const initialStart = initialOffset + 1;
  //   const initialEnd = initialOffset + itemsPerPage;

  //   setItemOffset(initialOffset);
  //   setItemStart(initialStart);
  //   setEndOffset(initialEnd);
  // }, [itemsPerPage]);

  // const handlePageClick = (selectedPage) => {
  //   setLoading(true);
  //   const newOffset = selectedPage * itemsPerPage;
  //   const newStart = newOffset + 1;
  //   const newEnd = newOffset + itemsPerPage;

  //   setItemOffset(newOffset);
  //   setItemStart(newStart);
  //   setEndOffset(newEnd);
  //   setLoading(false);
  // };

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10'>
        {product && product.length > 0 ? (
          product.map((product) => (
            <div key={product._id} className='w-full'>
              <Product
                _id={product._id}
                img={product.Image}
                productName={product.Title}
                price={product.Price}
                color={product.color}
                // badge={item.badge}
                des={product.Description}
                pdf={product.pdf}
                ficheTech={product.ficheTech}
                video={product.video}
              />
            </div>
          ))
        ) : (
          <p>No items match the selected filters.</p>
        )}
      </div>
      <div className='flex flex-col mdl:flex-row justify-center mdl:justify-between items-center'>
        <ReactPaginate
          nextLabel=''
          // onPageChange={(selectedPage) =>
          //   handlePageClick(selectedPage.selected)
          // }
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          // pageCount={pageCount}
          previousLabel=''
          pageLinkClassName='w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center'
          pageClassName='mr-6'
          containerClassName='flex text-base font-semibold font-titleFont py-10'
          activeClassName='bg-black text-white'
        />

        {/* <p className='text-base font-normal text-lightText'>
          Products from {itemStart} to{" "}
          {Math.min(endOffset, filteredItems.length)} of {filteredItems.length}
        </p> */}
      </div>
    </div>
  );
};

export default Pagination;
