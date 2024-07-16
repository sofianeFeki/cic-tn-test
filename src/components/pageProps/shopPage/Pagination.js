import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Product from '../../home/Products/Product';
import { useSelector } from 'react-redux';
import { paginationItems } from '../../../constants';
import { getProducts } from '../../../functions/product';
import { useLocation, useParams } from 'react-router-dom';

const Pagination = ({
  itemsPerPage,
  itemOffset,
  products,
  totalPages,
  totalProducts,
  handlePageClick,
}) => {
  const viewMode = useSelector((state) => state.orebi.viewMode);

  return (
    <div>
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10 drop-shadow-xl'
            : 'flex flex-col gap-4'
        }
      >
        {products.map((product) => (
          <div key={product._id} className="w-full">
            <Product
              _id={product._id}
              img={product.Image}
              productName={product.Title}
              slug={product.slug}
              price={product.Price}
              color={product.color}
              des={product.Description}
              pdf={product.pdf}
              ficheTech={product.ficheTech}
              video={product.video}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={` flex justify-center mt-4`}
          pageClassName="mx-1 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
          activeClassName="bg-primeColor text-white"
          previousClassName="mx-1 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
          nextClassName="mx-1 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
          breakClassName="mx-1 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
        <p className="text-base font-normal text-lightText">
          Showing {itemOffset + 1} to{' '}
          {Math.min(itemOffset + itemsPerPage, totalProducts)} of{' '}
          {totalProducts} products
        </p>
      </div>
    </div>
  );
};

export default Pagination;
